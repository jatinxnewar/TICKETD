"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, User, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { marketplaceApi, MarketplaceListing } from "@/lib/api"

export function MarketplaceGrid({ filters }: any) {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("price-low")
  const [error, setError] = useState<string | null>(null)

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

  // Filtering logic
  const filteredListings = listings.filter((listing) => {
    const price = parseFloat(listing.price.replace(/[^\d.]/g, ""));
    const [min, max] = filters?.price || [0, 10000];
    const event = listing.event;
    const categoryMatch = !filters?.categories?.length || (event && filters.categories.includes(event.category));
    const locationMatch = !filters?.locations?.length || (event && filters.locations.includes(event.location));
    return price >= min && price <= max && categoryMatch && locationMatch;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, ""))
      case "price-high":
        return parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, ""))
      case "date":
        if (a.event && b.event) {
          return new Date(a.event.date).getTime() - new Date(b.event.date).getTime()
        }
        return 0
      case "popular":
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime() // Most recent first
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Available Tickets</h2>
          <p className="text-muted-foreground">{loading ? "Loading..." : `${listings.length} tickets available`}</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="date">Event Date</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">Loading listings...</div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-destructive">{error}</div>
        ) : sortedListings.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">No listings found.</div>
        ) : (
          sortedListings.map((listing) => {
            const event = listing.event;
            if (!event) return null;

            return (
              <Card
                key={listing._id}
                className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.jpg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3">
                    {event.category}
                  </Badge>
                  <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.date} {event.time}
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      {formatEventDate(new Date(event.date))} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-2" />
                      Seller: {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Original Price:</span>
                      <span className="line-through">₹{listing.originalPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Current Price:</span>
                      <span className="font-bold text-lg">₹{listing.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {(() => {
                        const sale = parseFloat(listing.price)
                        const orig = parseFloat(listing.originalPrice)
                        if (!isNaN(sale) && !isNaN(orig) && orig > 0) {
                          const diff = ((sale - orig) / orig * 100).toFixed(1)
                          return parseFloat(diff) >= 0 ? `+${diff}% markup` : `${diff}% discount`
                        }
                        return "New listing"
                      })()}
                    </div>
                  </div>

                  <Button className="w-full">Buy Now</Button>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
