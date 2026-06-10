import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ContractForm } from "@/components/contract-form";
import { updateContract } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditContractPage({ params }: { params: { id: string } }) {
  const [contract, properties, clients] = await Promise.all([
    db.contract.findUnique({ where: { id: params.id } }),
    db.property.findMany({ orderBy: { title: "asc" } }),
    db.client.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!contract) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateContract(params.id, formData);
  }

  return (
    <div className="flex flex-col gap-space-6">
      <div>
        <Link href={`/dashboard/contracts/${contract.id}`} className="text-body-sm text-ink-secondary hover:text-ink-primary">
          ← Contract
        </Link>
        <p className="eyebrow mt-space-4 mb-space-2">Edit</p>
        <h1 className="text-display-lg">Contract details</h1>
      </div>
      <ContractForm
        properties={properties}
        clients={clients}
        contract={contract}
        action={action}
        submitLabel="Save changes"
      />
    </div>
  );
}
