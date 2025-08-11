"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, User, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"

const marketplaceTickets = [
  {
    id: 1,
    eventTitle: "Blockchain Summit 2024",
    date: "2024-03-15",
    time: "18:00",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "VIP",
    originalPrice: "0.1 ETH",
    currentPrice: "0.12 ETH",
    seller: "0x1234...5678",
    category: "Technology",
    timeLeft: "2 days",
    verified: true,
  },
  {
    id: 2,
    eventTitle: "NFT Music Festival",
    date: "2024-04-10",
    time: "16:00",
    location: "Miami, FL",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "General",
    originalPrice: "0.15 ETH",
    currentPrice: "0.18 ETH",
    seller: "0x9876...4321",
    category: "Music",
    timeLeft: "1 week",
    verified: true,
  },
  {
    id: 3,
    eventTitle: "Web3 Gaming Expo",
    date: "2024-04-01",
    time: "10:00",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "Premium",
    originalPrice: "0.08 ETH",
    currentPrice: "0.09 ETH",
    seller: "0x5555...7777",
    category: "Gaming",
    timeLeft: "5 days",
    verified: false,
  },
  {
    id: 4,
    eventTitle: "DeFi Workshop",
    date: "2024-03-25",
    time: "14:00",
    location: "Online",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "General",
    originalPrice: "0.03 ETH",
    currentPrice: "0.035 ETH",
    seller: "0x2222...8888",
    category: "Education",
    timeLeft: "3 days",
    verified: true,
  },
  {
    id: 5,
    eventTitle: "Crypto Art Exhibition",
    date: "2024-04-05",
    time: "19:00",
    location: "New York, NY",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "VIP",
    originalPrice: "0.06 ETH",
    currentPrice: "0.08 ETH",
    seller: "0x3333...9999",
    category: "Art",
    timeLeft: "1 week",
    verified: true,
  },
  {
    id: 6,
    eventTitle: "Metaverse Conference",
    date: "2024-04-20",
    time: "11:00",
    location: "Seattle, WA",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "General",
    originalPrice: "0.12 ETH",
    currentPrice: "0.11 ETH",
    seller: "0x4444...1111",
    category: "Technology",
    timeLeft: "2 weeks",
    verified: true,
  },
]

export function MarketplaceGrid() {
  const [sortBy, setSortBy] = useState("price-low")

  const sortedTickets = [...marketplaceTickets].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseFloat(a.currentPrice) - Number.parseFloat(b.currentPrice)
      case "price-high":
        return Number.parseFloat(b.currentPrice) - Number.parseFloat(a.currentPrice)
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
          <p className="text-muted-foreground">{marketplaceTickets.length} tickets available</p>
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
        {sortedTickets.map((ticket) => (
          <Card
            key={ticket.id}
            className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative">
              <Image
                src={ticket.image || "/placeholder.svg"}
                alt={ticket.eventTitle}
                width={300}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge variant="secondary" className="absolute top-3 left-3">
                {ticket.category}
              </Badge>
              <Badge variant={ticket.verified ? "default" : "destructive"} className="absolute top-3 right-3">
                {ticket.verified ? "Verified" : "Unverified"}
              </Badge>
              <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {ticket.timeLeft} left
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {ticket.eventTitle}
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
                  Seller: {ticket.seller}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span className="line-through">{ticket.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Price:</span>
                  <span className="font-bold text-lg">{ticket.currentPrice}</span>
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {(
                    ((Number.parseFloat(ticket.currentPrice) - Number.parseFloat(ticket.originalPrice)) /
                      Number.parseFloat(ticket.originalPrice)) *
                    100
                  ).toFixed(1)}
                  % markup
                </div>
              </div>

              <Button className="w-full">Buy Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
