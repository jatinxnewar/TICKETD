"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, TrendingUp, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"

const events = [
  {
    id: 1,
    title: "My Crypto Meetup",
    date: "2024-04-01",
    time: "18:00",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=300",
    status: "upcoming",
    ticketsSold: 45,
    totalTickets: 100,
    revenue: "2.25 ETH",
    category: "Meetup",
  },
  {
    id: 2,
    title: "NFT Workshop Series",
    date: "2024-04-15",
    time: "14:00",
    location: "Online",
    image: "/placeholder.svg?height=200&width=300",
    status: "upcoming",
    ticketsSold: 78,
    totalTickets: 150,
    revenue: "1.56 ETH",
    category: "Education",
  },
  {
    id: 3,
    title: "Blockchain Hackathon",
    date: "2024-02-20",
    time: "09:00",
    location: "Austin, TX",
    image: "/placeholder.svg?height=200&width=300",
    status: "completed",
    ticketsSold: 200,
    totalTickets: 200,
    revenue: "0 ETH",
    category: "Hackathon",
  },
]

export function MyEvents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Events</h2>
        <Link href="/create-event">
          <Button>Create New Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="card-enhanced overflow-hidden">
            <div className="relative">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <Badge
                variant={
                  event.status === "upcoming" ? "default" : event.status === "completed" ? "secondary" : "destructive"
                }
                className="absolute top-3 right-3"
              >
                {event.status}
              </Badge>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {event.category}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatEventDate(event.date)} at {event.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {event.ticketsSold}/{event.totalTickets} sold
                  </span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.revenue}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Analytics
                </Button>
                <Button size="sm" className="flex-1">
                  Manage Event
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
