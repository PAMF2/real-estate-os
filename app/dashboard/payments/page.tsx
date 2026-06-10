import Link from "next/link";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const payments = await db.payment.findMany({
    orderBy: { dueDate: "asc" },
    include: { contract: { include: { property: true, client: true } } },
  });

  const totalPending = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amountCents, 0);
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amountCents, 0);

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <p className="eyebrow mb-space-2">Cash flow</p>
        <h1 className="text-display-lg">Payments</h1>
      </div>

      <div className="grid grid-cols-2 gap-space-4 max-w-md">
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-5">
          <p className="eyebrow mb-space-3">Pending</p>
          <p className="text-h2 font-mono font-tabular">{formatCurrency(totalPending / 100)}</p>
        </div>
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-5">
          <p className="eyebrow mb-space-3 text-success">Paid</p>
          <p className="text-h2 font-mono font-tabular text-success">{formatCurrency(totalPaid / 100)}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
          <p className="text-h3 mb-space-2">No payments yet</p>
          <p className="text-body-sm text-ink-secondary">
            Generate a payment from any contract detail page to start tracking.
          </p>
        </div>
      ) : (
        <div className="rounded-card border border-border-hair bg-bg-surface overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-elevated">
              <tr className="text-left">
                <th className="px-space-5 py-space-3 eyebrow">Due</th>
                <th className="px-space-5 py-space-3 eyebrow">Contract</th>
                <th className="px-space-5 py-space-3 eyebrow">Client</th>
                <th className="px-space-5 py-space-3 eyebrow">Status</th>
                <th className="px-space-5 py-space-3 eyebrow text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-t border-border-hair hover:bg-bg-elevated transition-colors duration-instant ease-out-soft">
                  <td className="px-space-5 py-space-3 text-body-sm font-mono font-tabular">{formatDate(p.dueDate)}</td>
                  <td className="px-space-5 py-space-3 text-body-sm">
                    <Link href={`/dashboard/contracts/${p.contract.id}`} className="hover:text-accent">
                      {p.contract.property.title}
                    </Link>
                  </td>
                  <td className="px-space-5 py-space-3 text-body-sm">{p.contract.client.name}</td>
                  <td className="px-space-5 py-space-3 text-body-sm capitalize">
                    <span className={p.status === "paid" ? "text-success" : "text-ink-primary"}>{p.status}</span>
                  </td>
                  <td className="px-space-5 py-space-3 text-body-sm text-right font-mono font-tabular">
                    {formatCurrency(p.amountCents / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
