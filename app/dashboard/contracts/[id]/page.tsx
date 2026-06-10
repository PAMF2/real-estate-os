import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { deleteContract } from "../actions";

export const dynamic = "force-dynamic";

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const contract = await db.contract.findUnique({
    where: { id: params.id },
    include: { property: true, client: true, owner: true, payments: { orderBy: { dueDate: "asc" } } },
  });
  if (!contract) notFound();

  const base = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const shareUrl = `${base}/share/contract/${contract.shareToken}`;
  const qrDataUrl = await QRCode.toDataURL(shareUrl, { margin: 1, width: 200, color: { dark: "#1d1d1f", light: "#ffffff" } });

  async function handleDelete() {
    "use server";
    await deleteContract(params.id);
  }

  const meta: Array<[string, string | React.ReactNode]> = [
    ["Type", <span key="type" className="capitalize">{contract.kind}</span>],
    ["Status", <span key="status" className="capitalize">{contract.status}</span>],
    ["Start", formatDate(contract.startDate)],
    ["End", contract.endDate ? formatDate(contract.endDate) : "—"],
    ["Monthly", contract.monthlyCents ? formatCurrency(contract.monthlyCents / 100) : "—"],
    ["Total", formatCurrency(contract.totalCents / 100)],
  ];

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <Link href="/dashboard/contracts" className="text-body-sm text-ink-secondary hover:text-ink-primary">
          ← Contracts
        </Link>
        <div className="flex items-end justify-between mt-space-4">
          <div>
            <p className="eyebrow mb-space-2">{contract.kind === "rental" ? "Locação" : "Venda"}</p>
            <h1 className="text-display-lg">{contract.property.title}</h1>
            <p className="text-body-sm text-ink-secondary mt-space-2">
              {contract.property.address} · {contract.property.city}/{contract.property.state}
            </p>
          </div>
          <div className="flex gap-space-3">
            <Link href={`/dashboard/contracts/${contract.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <form action={handleDelete}>
              <Button variant="danger" type="submit">Delete</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-5">
        <div className="lg:col-span-2 rounded-card border border-border-hair bg-bg-surface p-space-5">
          <p className="eyebrow mb-space-4">Details</p>
          <dl className="grid grid-cols-2 gap-y-space-4 gap-x-space-6">
            {meta.map(([label, value]) => (
              <div key={String(label)}>
                <dt className="text-caption uppercase tracking-[0.08em] text-ink-secondary mb-space-1">{label}</dt>
                <dd className="text-body font-mono font-tabular">{value}</dd>
              </div>
            ))}
            <div className="col-span-2">
              <dt className="text-caption uppercase tracking-[0.08em] text-ink-secondary mb-space-1">Client</dt>
              <dd className="text-body">{contract.client.name} <span className="text-ink-secondary">— {contract.client.email}</span></dd>
            </div>
            {contract.notes ? (
              <div className="col-span-2">
                <dt className="text-caption uppercase tracking-[0.08em] text-ink-secondary mb-space-1">Notes</dt>
                <dd className="text-body whitespace-pre-wrap">{contract.notes}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="rounded-card border border-border-hair bg-bg-surface p-space-5">
          <p className="eyebrow mb-space-4">Share</p>
          <img src={qrDataUrl} alt="QR code for contract share link" className="mx-auto block w-[180px] h-[180px] mb-space-4" />
          <p className="text-body-sm text-ink-secondary mb-space-2">Public read-only link:</p>
          <code className="block font-mono text-body-sm break-all bg-bg-elevated rounded p-space-2 border border-border-hair">
            {shareUrl}
          </code>
        </div>
      </div>

      <section>
        <div className="flex items-baseline justify-between mb-space-4">
          <h2 className="text-h1">Payments</h2>
        </div>
        {contract.payments.length === 0 ? (
          <p className="text-body-sm text-ink-secondary">No payments scheduled yet.</p>
        ) : (
          <div className="rounded-card border border-border-hair bg-bg-surface overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg-elevated">
                <tr className="text-left">
                  <th className="px-space-5 py-space-3 eyebrow">Due</th>
                  <th className="px-space-5 py-space-3 eyebrow">Status</th>
                  <th className="px-space-5 py-space-3 eyebrow text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {contract.payments.map((p) => (
                  <tr key={p.id} className="border-t border-border-hair">
                    <td className="px-space-5 py-space-3 text-body-sm font-mono font-tabular">{formatDate(p.dueDate)}</td>
                    <td className="px-space-5 py-space-3 text-body-sm capitalize">{p.status}</td>
                    <td className="px-space-5 py-space-3 text-body-sm text-right font-mono font-tabular">
                      {formatCurrency(p.amountCents / 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
