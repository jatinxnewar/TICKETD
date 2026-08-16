"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { defaultMarketplaceFilters, type MarketplaceFilterState } from "@/lib/filters"

export default function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFilterState>(defaultMarketplaceFilters)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ticket Marketplace</h1>
            <p className="text-muted-foreground mt-1">
              Buy verified resale tickets, or list one of your own.
            </p>
          </div>
          <Button asChild className="sm:flex-shrink-0">
            <Link href="/dashboard">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Sell a ticket
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-64 lg:flex-shrink-0">
            <MarketplaceFilters filters={filters} setFilters={setFilters} />
          </aside>
          <div className="min-w-0 flex-1">
            <MarketplaceGrid filters={filters} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
