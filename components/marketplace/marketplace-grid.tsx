"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, User, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"




export function MarketplaceGrid({ filters }: any) {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("price-low")

  useEffect(() => {
    async function fetchListings() {
      setLoading(true)
      try {
        const res = await fetch("/api/listings")
        const data = await res.json()
        setListings(data)
      } catch (e) {
        setListings([])
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  // Filtering logic
  const filteredListings = listings.filter((ticket) => {
    const price = parseFloat((ticket.salePrice || "0").replace(/[^\d.]/g, ""));
    const [min, max] = filters?.price || [0, 10000];
    const categoryMatch = !filters?.categories?.length || filters.categories.includes(ticket.category);
    const typeMatch = !filters?.types?.length || filters.types.includes(ticket.ticketType);
    const locationMatch = !filters?.locations?.length || filters.locations.includes(ticket.location);
    return price >= min && price <= max && categoryMatch && typeMatch && locationMatch;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat((a.salePrice || "0").replace(/[^\d.]/g, "")) - parseFloat((b.salePrice || "0").replace(/[^\d.]/g, ""))
      case "price-high":
        return parseFloat((b.salePrice || "0").replace(/[^\d.]/g, "")) - parseFloat((a.salePrice || "0").replace(/[^\d.]/g, ""))
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return Math.random() - 0.5 // Random for demo
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
        ) : sortedListings.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">No listings found.</div>
        ) : (
          sortedListings.map((ticket) => (
            <Card
              key={ticket._id}
              className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={ticket.image || "/placeholder.svg"}
                  alt={ticket.eventTitle || ticket.listingTitle}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-3 left-3">
                  {ticket.category}
                </Badge>
                <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                  <div className="flex items-center text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {ticket.date} {ticket.time}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {ticket.listingTitle || ticket.eventTitle}
                </h3>

                <Badge variant="outline" className="mb-3">
                  {ticket.ticketType}
                </Badge>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {formatEventDate(ticket.date)} at {ticket.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {ticket.location}
                  </div>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-2" />
                    Seller: {ticket.userId || "Anonymous"}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Original Price:</span>
                    <span className="line-through">{ticket.originalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Current Price:</span>
                    <span className="font-bold text-lg">{ticket.salePrice}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {(() => {
                      const sale = parseFloat((ticket.salePrice || "0").replace(/[^\d.]/g, ""))
                      const orig = parseFloat((ticket.originalPrice || "0").replace(/[^\d.]/g, ""))
                      if (!isNaN(sale) && !isNaN(orig) && orig > 0) {
                        return ((sale - orig) / orig * 100).toFixed(1) + "% markup"
                      }
                      return ""
                    })()}
                  </div>
                </div>

                <Button className="w-full">Buy Now</Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
