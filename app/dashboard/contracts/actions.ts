"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { z } from "zod";

const contractSchema = z.object({
  kind: z.enum(["rental", "sale"]),
  propertyId: z.string().min(1),
  clientId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional().nullable(),
  monthlyCents: z.coerce.number().int().nonnegative().optional().nullable(),
  totalCents: z.coerce.number().int().nonnegative(),
  status: z.enum(["draft", "active", "signed", "completed", "cancelled"]).default("draft"),
  notes: z.string().optional().nullable(),
});

async function getSeedUserId() {
  const u = await db.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!u) throw new Error("No user found — run npm run db:seed first.");
  return u.id;
}

export async function createContract(formData: FormData) {
  const raw = {
    kind: formData.get("kind"),
    propertyId: formData.get("propertyId"),
    clientId: formData.get("clientId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || null,
    monthlyCents: formData.get("monthlyCents") || null,
    totalCents: formData.get("totalCents"),
    status: formData.get("status") || "draft",
    notes: formData.get("notes") || null,
  };
  const data = contractSchema.parse(raw);
  const ownerId = await getSeedUserId();
  const contract = await db.contract.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      ownerId,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contracts");
  redirect(`/dashboard/contracts/${contract.id}`);
}

export async function updateContract(id: string, formData: FormData) {
  const raw = {
    kind: formData.get("kind"),
    propertyId: formData.get("propertyId"),
    clientId: formData.get("clientId"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || null,
    monthlyCents: formData.get("monthlyCents") || null,
    totalCents: formData.get("totalCents"),
    status: formData.get("status"),
    notes: formData.get("notes") || null,
  };
  const data = contractSchema.parse(raw);
  await db.contract.update({
    where: { id },
    data: {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contracts");
  revalidatePath(`/dashboard/contracts/${id}`);
  redirect(`/dashboard/contracts/${id}`);
}

export async function deleteContract(id: string) {
  await db.payment.deleteMany({ where: { contractId: id } });
  await db.contract.delete({ where: { id } });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/contracts");
  redirect("/dashboard/contracts");
}
