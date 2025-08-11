"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Flame } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"

const featuredEvents = [
  {
    id: 1,
    title: "Blockchain Summit 2024",
    date: "2024-03-15",
    time: "18:00",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.1 ETH",
    attendees: 1250,
    category: "Conference",
    isHot: true,
  },
  {
    id: 2,
    title: "NFT Art Gallery Opening",
    date: "2024-03-20",
    time: "19:00",
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.05 ETH",
    attendees: 300,
    category: "Art",
    isHot: true,
  },
  {
    id: 3,
    title: "DeFi Developer Meetup",
    date: "2024-03-25",
    time: "17:30",
    location: "Austin, TX",
    image: "/placeholder.svg?height=300&width=400",
    price: "Free",
    attendees: 150,
    category: "Meetup",
    isHot: false,
  },
]

export function FeaturedEvents() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
            <p className="text-muted-foreground">Don't miss these trending events</p>
          </div>
          <Link href="/events">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <Card
              key={event.id}
              className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {event.isHot && (
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    <Flame className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-3 right-3">
                  {event.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{event.title}</h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatEventDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} attending
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{event.price}</span>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm">Get Tickets</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
