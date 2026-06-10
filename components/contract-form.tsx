import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Property, Client, Contract } from "@prisma/client";

interface Props {
  properties: Property[];
  clients: Client[];
  contract?: Contract;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

function toDateInput(d: Date | null | undefined) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

export function ContractForm({ properties, clients, contract, action, submitLabel = "Save" }: Props) {
  return (
    <form action={action} className="flex flex-col gap-space-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-space-4">
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="kind">Type</Label>
          <select
            id="kind"
            name="kind"
            required
            defaultValue={contract?.kind ?? "rental"}
            className="h-10 rounded-md border border-border-hair bg-bg-surface px-3 text-body-sm"
          >
            <option value="rental">Rental (Locação)</option>
            <option value="sale">Sale (Venda)</option>
          </select>
        </div>
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            required
            defaultValue={contract?.status ?? "draft"}
            className="h-10 rounded-md border border-border-hair bg-bg-surface px-3 text-body-sm"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="signed">Signed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-space-2">
        <Label htmlFor="propertyId">Property</Label>
        <select
          id="propertyId"
          name="propertyId"
          required
          defaultValue={contract?.propertyId ?? ""}
          className="h-10 rounded-md border border-border-hair bg-bg-surface px-3 text-body-sm"
        >
          <option value="" disabled>Choose a property…</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} — {p.city}/{p.state}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-space-2">
        <Label htmlFor="clientId">Client</Label>
        <select
          id="clientId"
          name="clientId"
          required
          defaultValue={contract?.clientId ?? ""}
          className="h-10 rounded-md border border-border-hair bg-bg-surface px-3 text-body-sm"
        >
          <option value="" disabled>Choose a client…</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {c.email}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-space-4">
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="startDate">Start date</Label>
          <Input id="startDate" name="startDate" type="date" required defaultValue={toDateInput(contract?.startDate)} />
        </div>
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="endDate">End date <span className="text-ink-muted normal-case">(optional)</span></Label>
          <Input id="endDate" name="endDate" type="date" defaultValue={toDateInput(contract?.endDate)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-space-4">
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="monthlyCents">Monthly amount (cents) <span className="text-ink-muted normal-case">— rentals only</span></Label>
          <Input id="monthlyCents" name="monthlyCents" type="number" min="0" defaultValue={contract?.monthlyCents ?? ""} />
        </div>
        <div className="flex flex-col gap-space-2">
          <Label htmlFor="totalCents">Total amount (cents)</Label>
          <Input id="totalCents" name="totalCents" type="number" min="0" required defaultValue={contract?.totalCents ?? ""} />
        </div>
      </div>

      <div className="flex flex-col gap-space-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" rows={4} defaultValue={contract?.notes ?? ""} />
      </div>

      <div className="flex gap-space-3 pt-space-3">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
