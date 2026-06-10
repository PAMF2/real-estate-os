import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const [contractCount, propertyCount, clientCount, paymentSumRaw, recentContracts] = await Promise.all([
    db.contract.count(),
    db.property.count(),
    db.client.count(),
    db.payment.aggregate({ _sum: { amountCents: true }, where: { status: "pending" } }),
    db.contract.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: true, client: true },
    }),
  ]);

  const pendingCents = paymentSumRaw._sum.amountCents ?? 0;

  const stats = [
    { label: "Contracts", value: contractCount.toString() },
    { label: "Properties", value: propertyCount.toString() },
    { label: "Clients", value: clientCount.toString() },
    { label: "Pending payments", value: formatCurrency(pendingCents / 100), mono: true },
  ];

  return (
    <div className="flex flex-col gap-space-7">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow mb-space-2">Dashboard</p>
          <h1 className="text-display-lg">Overview</h1>
        </div>
        <Link href="/dashboard/contracts/new">
          <Button>New contract</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-card border border-border-hair bg-bg-surface p-space-5">
            <p className="eyebrow mb-space-3">{s.label}</p>
            <p className={`text-h2 ${s.mono ? "font-mono font-tabular" : ""}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-baseline justify-between mb-space-4">
          <h2 className="text-h1">Recent contracts</h2>
          <Link href="/dashboard/contracts" className="text-body-sm text-accent hover:text-accent-hover">
            View all →
          </Link>
        </div>

        {recentContracts.length === 0 ? (
          <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
            <p className="text-h3 mb-space-2">No contracts yet</p>
            <p className="text-body-sm text-ink-secondary mb-space-5">
              Create your first contract to start tracking rentals or sales.
            </p>
            <Link href="/dashboard/contracts/new">
              <Button>Create first contract</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-card border border-border-hair bg-bg-surface overflow-hidden">
            <table className="w-full">
              <thead className="bg-bg-elevated">
                <tr className="text-left">
                  <th className="px-space-5 py-space-3 eyebrow">Contract</th>
                  <th className="px-space-5 py-space-3 eyebrow">Type</th>
                  <th className="px-space-5 py-space-3 eyebrow">Client</th>
                  <th className="px-space-5 py-space-3 eyebrow">Status</th>
                  <th className="px-space-5 py-space-3 eyebrow text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentContracts.map((c) => (
                  <tr key={c.id} className="border-t border-border-hair hover:bg-bg-elevated transition-colors duration-instant ease-out-soft">
                    <td className="px-space-5 py-space-3 text-body-sm">
                      <Link href={`/dashboard/contracts/${c.id}`} className="hover:text-accent">
                        {c.property.title}
                      </Link>
                    </td>
                    <td className="px-space-5 py-space-3 text-body-sm capitalize">{c.kind}</td>
                    <td className="px-space-5 py-space-3 text-body-sm">{c.client.name}</td>
                    <td className="px-space-5 py-space-3 text-body-sm capitalize">{c.status}</td>
                    <td className="px-space-5 py-space-3 text-body-sm text-right font-mono font-tabular">
                      {formatCurrency(c.totalCents / 100)}
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
