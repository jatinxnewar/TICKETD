"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { marketplaceApi } from "@/lib/api"
import { CURRENT_USER_ID } from "@/lib/user"
import type { MarketplaceFilterState } from "@/lib/filters"
import { ListingCard } from "./listing-card"
import { useToast } from "@/hooks/use-toast"
import { useStoreData } from "@/hooks/useStoreData"

export function MarketplaceGrid({ filters }: { filters?: MarketplaceFilterState }) {
  const [sortBy, setSortBy] = useState("recent")
  const { toast } = useToast()

  const { data, loading, error, refresh } = useStoreData(
    () => marketplaceApi.getAll(),
    "Could not load marketplace listings.",
  )
  const listings = data ?? []

  const handlePurchase = async (listingId: string) => {
    // Surfaced to the caller so the transaction modal can show a failed state;
    // the toast here covers the success path.
    await marketplaceApi.purchase(listingId, CURRENT_USER_ID)
    toast({
      title: "Purchase complete",
      description: "The ticket is now in your dashboard.",
    })
    refresh()
  }

  const filteredListings = listings.filter(listing => {
    const price = parseFloat(listing.price)
    const [min, max] = filters?.price ?? [0, Number.POSITIVE_INFINITY]
    const event = listing.event

    const priceMatch = !Number.isFinite(price) || (price >= min && price <= max)
    const categoryMatch = !filters?.categories?.length || (!!event && filters.categories.includes(event.category))
    // Locations are stored as "Mumbai, Maharashtra" but filtered by city alone.
    const locationMatch =
      !filters?.locations?.length ||
      (!!event && filters.locations.some(city => event.location.toLowerCase().includes(city.toLowerCase())))
    const typeMatch =
      !filters?.types?.length ||
      filters.types.some(type => (listing.ticketType || "").toLowerCase().includes(type.toLowerCase()))

    return priceMatch && categoryMatch && locationMatch && typeMatch
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price)
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price)
      case "date":
        if (a.event && b.event) {
          return new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
        }
        return 0
      case "recent":
        return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Resale Marketplace</h2>
          <p className="text-muted-foreground mt-1">
            {loading ? "Loading..." : `${sortedListings.length} ticket${sortedListings.length !== 1 ? 's' : ''} available`}
          </p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Listed</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="date">Event Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[26rem] rounded-xl border bg-muted/40 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center text-center py-20 px-6">
          <h3 className="text-lg font-semibold mb-1">Couldn't load the marketplace</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">{error}</p>
          <Button variant="outline" onClick={refresh}>
            Try again
          </Button>
        </div>
      ) : sortedListings.length === 0 ? (
        <div className="flex flex-col items-center text-center py-20 px-6">
          <h3 className="text-lg font-semibold mb-1">
            {listings.length === 0 ? "No tickets listed yet" : "No tickets match your filters"}
          </h3>
          <p className="text-muted-foreground max-w-sm">
            {listings.length === 0
              ? "Resale tickets appear here as soon as someone lists one."
              : "Try widening your price range or clearing a filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} onPurchase={handlePurchase} />
          ))}
        </div>
      )}
    </div>
  )
}
