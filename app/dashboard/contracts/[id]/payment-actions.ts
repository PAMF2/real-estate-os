"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createPaymentLineCharge } from "@/lib/paymentline";

export async function generatePayment(contractId: string, formData: FormData) {
  const amountCents = Number(formData.get("amountCents"));
  const dueDate = new Date(String(formData.get("dueDate")));
  if (!Number.isFinite(amountCents) || amountCents <= 0) throw new Error("Invalid amount");
  if (Number.isNaN(dueDate.getTime())) throw new Error("Invalid due date");

  const contract = await db.contract.findUnique({
    where: { id: contractId },
    include: { client: true },
  });
  if (!contract) throw new Error("Contract not found");

  const pl = await createPaymentLineCharge({
    contractId,
    amountCents,
    dueDate,
    payerName: contract.client.name,
    payerEmail: contract.client.email,
  });

  await db.payment.create({
    data: {
      contractId,
      amountCents,
      dueDate,
      externalId: pl.externalId,
      externalUrl: pl.externalUrl,
      status: pl.status,
    },
  });

  revalidatePath(`/dashboard/contracts/${contractId}`);
  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
}

export async function markPaymentPaid(paymentId: string) {
  const payment = await db.payment.update({
    where: { id: paymentId },
    data: { paidAt: new Date(), status: "paid" },
  });
  revalidatePath(`/dashboard/contracts/${payment.contractId}`);
  revalidatePath("/dashboard/payments");
  revalidatePath("/dashboard");
}
