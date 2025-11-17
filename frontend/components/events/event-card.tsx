"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"
import { Event } from "@/lib/api"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  // Get the first ticket type for pricing
  const firstTicket = event.ticketTypes?.[0]
  const price = firstTicket ? `₹${firstTicket.price}` : 'TBD'
  const attendees = event.maxAttendees || 0

  return (
    <Card className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.jpg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge variant="secondary" className="absolute top-3 right-3">
          {event.category}
        </Badge>
        {event.status === 'sold-out' && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            Sold Out
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatEventDate(new Date(event.date))} at {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            {attendees} capacity
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <span className="font-semibold text-lg">{price}</span>
          </div>
          <Link href={`/events/${event._id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
