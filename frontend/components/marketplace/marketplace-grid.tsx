"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { marketplaceApi, MarketplaceListing } from "@/lib/api"
import { ListingCard } from "./listing-card"
import { useToast } from "@/hooks/use-toast"

export function MarketplaceGrid({ filters }: any) {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("recent")
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      setError(null)
      try {
        const data = await marketplaceApi.getAll({ status: 'active' })
        setListings(data)
      } catch (err) {
        console.error('Failed to fetch marketplace listings:', err)
        setError('Failed to load listings')
        setListings([])
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const handlePurchase = async (listingId: string) => {
    // Mock wallet address - in production this would come from wallet connection
    const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    
    try {
      await marketplaceApi.purchase(listingId, mockWalletAddress)
      
      // Remove the purchased listing from the list
      setListings(listings.filter(l => l._id !== listingId))
      
      toast({
        title: "Success!",
        description: "Ticket purchased successfully. Check your dashboard!",
      })
    } catch (error) {
      throw error
    }
  }

  // Filtering logic
  const filteredListings = listings.filter((listing) => {
    const price = parseFloat(listing.price)
    const [min, max] = filters?.price || [0, 10000]
    const event = listing.event
    const categoryMatch = !filters?.categories?.length || (event && filters.categories.includes(event.category))
    const locationMatch = !filters?.locations?.length || (event && filters.locations.includes(event.location))
    return price >= min && price <= max && categoryMatch && locationMatch
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
            <div key={i} className="h-96 bg-secondary/20 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : sortedListings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later</p>
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
