"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Search, Menu, Ticket } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Events", href: "/events" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Create", href: "/create" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Elevate the bar once the page moves, so it reads as a layer above content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/events?q=${encodeURIComponent(trimmed)}` : "/events")
    setShowSearch(false)
    setIsOpen(false)
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-shadow duration-200",
        "supports-[backdrop-filter]:bg-background/80",
        scrolled && "shadow-subtle",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex items-center gap-2" aria-label="Ticket'D home">
          <Ticket className="h-6 w-6 transition-colors group-hover:text-primary" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            Ticket'D
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                // Underline marks the active section without boxing the label.
                "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:transition-colors",
                isActive(item.href)
                  ? "text-foreground after:bg-primary"
                  : "text-muted-foreground after:bg-transparent hover:text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {showSearch ? (
            <form onSubmit={submitSearch} className="hidden items-center sm:flex" role="search">
              <label htmlFor="site-search" className="sr-only">
                Search events
              </label>
              <Input
                id="site-search"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={() => !query && setShowSearch(false)}
                placeholder="Search events…"
                className="h-9 w-48 lg:w-64"
              />
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search events"
              className="hidden sm:inline-flex"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          <NetworkSwitcher />
          <ThemeToggle />
          <WalletConnect />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-left">Menu</SheetTitle>
              <form onSubmit={submitSearch} className="mt-6" role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search events
                </label>
                <Input
                  id="mobile-search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search events…"
                />
              </form>
              <nav className="mt-6 flex flex-col" aria-label="Mobile">
                {navigation.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "border-b py-3 text-base font-medium transition-colors",
                      isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
