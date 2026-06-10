import Link from "next/link";
import { LayoutDashboard, FileSignature, Home, Users, CreditCard, Settings } from "lucide-react";

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/contracts", icon: FileSignature, label: "Contracts" },
  { href: "/dashboard/properties", icon: Home, label: "Properties" },
  { href: "/dashboard/clients", icon: Users, label: "Clients" },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-canvas">
      <header className="sticky top-0 z-50 h-14 border-b border-border-hair bg-bg-canvas">
        <div className="flex h-full items-center justify-between px-space-6">
          <Link href="/" className="text-h3 tracking-tight">
            Real Estate <span className="text-accent">OS</span>
          </Link>
          <div className="flex items-center gap-space-4">
            <kbd className="font-mono text-body-sm text-ink-secondary border border-border-hair rounded px-2 py-0.5">⌘K</kbd>
            <div className="h-8 w-8 rounded-full bg-bg-elevated border border-border-hair grid place-items-center text-body-sm text-ink-secondary">P</div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[240px] shrink-0 border-r border-border-hair min-h-[calc(100vh-56px)] p-space-4">
          <nav className="flex flex-col gap-space-1">
            {nav.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-space-3 rounded-md px-space-3 py-space-2 text-body-sm text-ink-primary hover:bg-bg-elevated transition-colors duration-instant ease-out-soft"
              >
                <Icon className="h-5 w-5 text-ink-secondary group-hover:text-ink-primary" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-space-6 pt-space-4 border-t border-border-hair">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-space-3 rounded-md px-space-3 py-space-2 text-body-sm text-ink-secondary hover:bg-bg-elevated transition-colors duration-instant ease-out-soft"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-content-narrow px-space-6 py-space-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
