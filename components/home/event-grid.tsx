"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"

const events = [
  {
    id: 1,
    title: "Web3 Gaming Conference",
    date: "2024-04-01",
    time: "10:00",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=300",
    price: "0.08 ETH",
    attendees: 800,
    category: "Gaming",
  },
  {
    id: 2,
    title: "Crypto Trading Workshop",
    date: "2024-04-05",
    time: "14:00",
    location: "Chicago, IL",
    image: "/placeholder.svg?height=200&width=300",
    price: "0.03 ETH",
    attendees: 200,
    category: "Education",
  },
  {
    id: 3,
    title: "NFT Music Festival",
    date: "2024-04-10",
    time: "16:00",
    location: "Miami, FL",
    image: "/placeholder.svg?height=200&width=300",
    price: "0.15 ETH",
    attendees: 2000,
    category: "Music",
  },
  {
    id: 4,
    title: "Metaverse Expo",
    date: "2024-04-15",
    time: "11:00",
    location: "Seattle, WA",
    image: "/placeholder.svg?height=200&width=300",
    price: "0.12 ETH",
    attendees: 1500,
    category: "Technology",
  },
  {
    id: 5,
    title: "DeFi Hackathon",
    date: "2024-04-20",
    time: "09:00",
    location: "Boston, MA",
    image: "/placeholder.svg?height=200&width=300",
    price: "Free",
    attendees: 300,
    category: "Hackathon",
  },
  {
    id: 6,
    title: "Blockchain Art Exhibition",
    date: "2024-04-25",
    time: "18:00",
    location: "Denver, CO",
    image: "/placeholder.svg?height=200&width=300",
    price: "0.06 ETH",
    attendees: 400,
    category: "Art",
  },
]

export function EventGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const categories = ["all", "Gaming", "Education", "Music", "Technology", "Hackathon", "Art"]
  const locations = ["all", "Los Angeles, CA", "Chicago, IL", "Miami, FL", "Seattle, WA", "Boston, MA", "Denver, CO"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || event.location === selectedLocation
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Discover Events</h2>
          <p className="text-muted-foreground mb-6">Find the perfect event for you</p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {event.category}
                </Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{event.title}</h3>

                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {formatEventDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-2" />
                    {event.attendees} attending
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold">{event.price}</span>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </section>
  )
}
