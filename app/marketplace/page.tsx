import { Header } from "@/components/layout/header"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ticket Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell event tickets securely</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <MarketplaceFilters />
          </aside>
          <div className="flex-1">
            <MarketplaceGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
