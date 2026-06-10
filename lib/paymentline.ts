interface CreatePaymentInput {
  contractId: string;
  amountCents: number;
  dueDate: Date;
  payerName: string;
  payerEmail: string;
  description?: string;
}

interface PaymentLineResponse {
  externalId: string;
  externalUrl: string;
  status: "pending";
}

export async function createPaymentLineCharge(input: CreatePaymentInput): Promise<PaymentLineResponse> {
  const baseUrl = process.env.PAYMENTLINE_API_URL ?? "https://api.paymentline.example/v1";
  const apiKey = process.env.PAYMENTLINE_API_KEY ?? "stub-key";

  if (apiKey === "stub-key") {
    const externalId = `pl_stub_${input.contractId.slice(0, 8)}_${Date.now()}`;
    return {
      externalId,
      externalUrl: `${baseUrl}/pay/${externalId}`,
      status: "pending",
    };
  }

  const res = await fetch(`${baseUrl}/charges`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      reference: input.contractId,
      amount_cents: input.amountCents,
      due_date: input.dueDate.toISOString().slice(0, 10),
      payer: { name: input.payerName, email: input.payerEmail },
      description: input.description ?? `Payment for contract ${input.contractId}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`PaymentLine API error ${res.status}: ${await res.text()}`);
  }

  const json = (await res.json()) as { id: string; pay_url: string };
  return { externalId: json.id, externalUrl: json.pay_url, status: "pending" };
}
