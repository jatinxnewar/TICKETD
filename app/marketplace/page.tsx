import { Header } from "@/components/layout/header"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

  const [filters, setFilters] = useState({ price: [0, 10000], categories: [], types: [], locations: [] });
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ticket Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell event tickets securely</p>
          </div>
          <Link href="/create-listing">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Sell Tickets
            </Button>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <MarketplaceFilters filters={filters} setFilters={setFilters} />
          </aside>
          <div className="flex-1">
            <MarketplaceGrid filters={filters} />
          </div>
        </div>
      </main>
    </div>
  )
}
