import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await db.property.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { contracts: true } } },
  });

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <p className="eyebrow mb-space-2">Inventory</p>
        <h1 className="text-display-lg">Properties</h1>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
          <p className="text-h3 mb-space-2">No properties yet</p>
          <p className="text-body-sm text-ink-secondary">
            Run <code className="font-mono">npm run db:seed</code> to populate sample data.
          </p>
        </div>
      ) : (
        <div className="grid gap-space-4 md:grid-cols-2">
          {properties.map((p) => (
            <div key={p.id} className="rounded-card border border-border-hair bg-bg-surface p-space-5">
              <p className="eyebrow mb-space-2 capitalize">{p.type} · {p.status}</p>
              <h3 className="text-h2 mb-space-2">{p.title}</h3>
              <p className="text-body-sm text-ink-secondary mb-space-3">
                {p.address} · {p.city}/{p.state} {p.zip ? `· ${p.zip}` : ""}
              </p>
              <div className="flex items-baseline justify-between pt-space-3 border-t border-border-hair">
                <div className="text-body-sm text-ink-secondary">
                  {p.bedrooms ? `${p.bedrooms} br` : ""} {p.area ? `· ${p.area}m²` : ""}
                </div>
                <div className="text-h3 font-mono font-tabular">{formatCurrency(p.priceCents / 100)}</div>
              </div>
              <p className="text-caption text-ink-muted mt-space-2">{p._count.contracts} contract(s)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
