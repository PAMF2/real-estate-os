import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await db.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { contracts: true } } },
  });

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <p className="eyebrow mb-space-2">Directory</p>
        <h1 className="text-display-lg">Clients</h1>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
          <p className="text-h3 mb-space-2">No clients yet</p>
          <p className="text-body-sm text-ink-secondary">
            Run <code className="font-mono">npm run db:seed</code> to populate sample data.
          </p>
        </div>
      ) : (
        <div className="rounded-card border border-border-hair bg-bg-surface overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-elevated">
              <tr className="text-left">
                <th className="px-space-5 py-space-3 eyebrow">Name</th>
                <th className="px-space-5 py-space-3 eyebrow">Email</th>
                <th className="px-space-5 py-space-3 eyebrow">Phone</th>
                <th className="px-space-5 py-space-3 eyebrow">Document</th>
                <th className="px-space-5 py-space-3 eyebrow text-right">Contracts</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t border-border-hair hover:bg-bg-elevated transition-colors duration-instant ease-out-soft">
                  <td className="px-space-5 py-space-3 text-body-sm">{c.name}</td>
                  <td className="px-space-5 py-space-3 text-body-sm">{c.email}</td>
                  <td className="px-space-5 py-space-3 text-body-sm font-mono font-tabular">{c.phone ?? "—"}</td>
                  <td className="px-space-5 py-space-3 text-body-sm font-mono font-tabular">{c.document ?? "—"}</td>
                  <td className="px-space-5 py-space-3 text-body-sm text-right font-mono font-tabular">{c._count.contracts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
