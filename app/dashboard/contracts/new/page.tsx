import Link from "next/link";
import { db } from "@/lib/db";
import { ContractForm } from "@/components/contract-form";
import { createContract } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewContractPage() {
  const [properties, clients] = await Promise.all([
    db.property.findMany({ orderBy: { title: "asc" } }),
    db.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <Link href="/dashboard/contracts" className="text-body-sm text-ink-secondary hover:text-ink-primary">
          ← Contracts
        </Link>
        <p className="eyebrow mt-space-4 mb-space-2">Create contract</p>
        <h1 className="text-display-lg">New contract</h1>
      </div>

      {properties.length === 0 || clients.length === 0 ? (
        <div className="rounded-card border border-border-hair bg-bg-surface p-space-7 text-center">
          <p className="text-h3 mb-space-2">Missing data</p>
          <p className="text-body-sm text-ink-secondary">
            You need at least one property and one client before creating a contract. Run{" "}
            <code className="font-mono">npm run db:seed</code> to populate fixtures.
          </p>
        </div>
      ) : (
        <ContractForm properties={properties} clients={clients} action={createContract} submitLabel="Create contract" />
      )}
    </div>
  );
}
