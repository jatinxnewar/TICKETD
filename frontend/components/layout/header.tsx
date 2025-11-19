"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { NetworkSwitcher } from "@/components/network-switcher"
import { Search, Menu, Ticket } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Events", href: "/events" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Create", href: "/create" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      aria-label="Site header"
    >
      {/* Accessibility: Skip to main content */}
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 bg-primary text-white px-3 py-1 rounded z-50">
        Skip to main content
      </a>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 group" aria-label="Go to homepage">
            <Ticket className="h-6 w-6 group-hover:text-primary transition-colors" />
            <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">Ticket'D</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
              tabIndex={0}
              aria-label={item.name}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <NetworkSwitcher />
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <WalletConnect />

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0">
              <nav className="flex flex-col space-y-4 mt-8 px-6" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium transition-colors hover:text-primary py-2 border-b border-muted-foreground/10"
                    onClick={() => setIsOpen(false)}
                    tabIndex={0}
                    aria-label={item.name}
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
