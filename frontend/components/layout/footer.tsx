import Link from "next/link"
import { Ticket } from "lucide-react"

const platformLinks = [
  { href: "/events", label: "Browse events" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/create", label: "Create" },
  { href: "/dashboard", label: "Dashboard" },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Ticket className="h-5 w-5" aria-hidden="true" />
              <span className="text-lg font-bold">Ticket'D</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Verified tickets for concerts, festivals and cultural events across India — with a
              resale marketplace that keeps pricing fair.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-3 text-sm font-semibold">Platform</h2>
            <ul className="space-y-2 text-sm">
              {platformLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Ticket'D. All rights reserved.</p>
          <p>Demo application — no real payments are processed.</p>
        </div>
      </div>
    </footer>
  )
}
