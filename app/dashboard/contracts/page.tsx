import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ContractsListPage() {
  const contracts = await db.contract.findMany({
    orderBy: { createdAt: "desc" },
    include: { property: true, client: true, payments: true },
  });

  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow mb-space-2">Administration</p>
          <h1 className="text-display-lg">Contracts</h1>
        </div>
        <Link href="/dashboard/contracts/new">
          <Button>New contract</Button>
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
          <p className="text-h3 mb-space-2">No contracts yet</p>
          <p className="text-body-sm text-ink-secondary mb-space-5">
            Rentals and sales contracts will appear here once created.
          </p>
          <Link href="/dashboard/contracts/new">
            <Button>Create your first contract</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-card border border-border-hair bg-bg-surface overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-elevated">
              <tr className="text-left">
                <th className="px-space-5 py-space-3 eyebrow">Property</th>
                <th className="px-space-5 py-space-3 eyebrow">Type</th>
                <th className="px-space-5 py-space-3 eyebrow">Client</th>
                <th className="px-space-5 py-space-3 eyebrow">Start</th>
                <th className="px-space-5 py-space-3 eyebrow">Status</th>
                <th className="px-space-5 py-space-3 eyebrow text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.id} className="border-t border-border-hair hover:bg-bg-elevated transition-colors duration-instant ease-out-soft">
                  <td className="px-space-5 py-space-3 text-body-sm">
                    <Link href={`/dashboard/contracts/${c.id}`} className="hover:text-accent">
                      {c.property.title}
                    </Link>
                  </td>
                  <td className="px-space-5 py-space-3 text-body-sm capitalize">{c.kind}</td>
                  <td className="px-space-5 py-space-3 text-body-sm">{c.client.name}</td>
                  <td className="px-space-5 py-space-3 text-body-sm font-mono font-tabular">{formatDate(c.startDate)}</td>
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
    </div>
  );
}
