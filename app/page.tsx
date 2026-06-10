import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg-canvas">
      <nav className="sticky top-0 z-50 h-14 border-b border-border-hair bg-bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-space-6">
          <Link href="/" className="text-h3 tracking-tight">
            Real Estate <span className="text-accent">OS</span>
          </Link>
          <div className="flex items-center gap-space-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button variant="primary" size="sm">Sign in</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-marketing px-space-6 pt-space-10 pb-space-9">
        <p className="eyebrow mb-space-4">Administration • Payments • Contracts</p>
        <h1 className="text-display-xl text-balance mb-space-5 max-w-3xl">
          The operating system for real estate brokers.
        </h1>
        <p className="text-body-lg text-ink-secondary max-w-2xl mb-space-7">
          Manage rentals and sales contracts, route payments through PaymentLine, and share signed
          documents — all from one dashboard. Built for agencies who treat administration as the
          product, not a cost center.
        </p>
        <div className="flex flex-wrap gap-space-3">
          <Link href="/dashboard">
            <Button size="lg">Open dashboard</Button>
          </Link>
          <Link href="/dashboard/contracts/new">
            <Button variant="secondary" size="lg">Create contract</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-content px-space-6 pb-space-10">
        <div className="grid gap-space-5 md:grid-cols-3">
          {[
            { eyebrow: "Locação", title: "Rental lifecycle", body: "Draft, sign, renew. Track due payments per tenant. Share access via QR." },
            { eyebrow: "Vendas", title: "Sales contracts", body: "From listing to closed deal. One contract object covers both flows." },
            { eyebrow: "Payments", title: "PaymentLine routing", body: "Hook into PaymentLine. We never touch funds — we just orchestrate." },
          ].map(({ eyebrow, title, body }) => (
            <div key={title} className="rounded-card border border-border-hair bg-bg-surface p-space-5">
              <p className="eyebrow mb-space-2">{eyebrow}</p>
              <h3 className="text-h2 mb-space-3">{title}</h3>
              <p className="text-body-sm text-ink-secondary">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border-hair">
        <div className="mx-auto max-w-content px-space-6 py-space-5 text-body-sm text-ink-secondary flex justify-between">
          <span>© 2026 Real Estate OS</span>
          <span className="font-mono">v0.1.0 · MVP</span>
        </div>
      </footer>
    </main>
  );
}
