"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"
import { Event } from "@/lib/api"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  // Get the lowest price ticket
  const lowestPrice = event.ticketTypes?.reduce((min, ticket) => {
    const price = parseFloat(ticket.price)
    return price < min ? price : min
  }, Infinity) || 0

  // Calculate available tickets
  const totalAvailable = event.ticketTypes?.reduce((sum, ticket) => sum + (ticket.available || 0), 0) || 0
  const totalQuantity = event.ticketTypes?.reduce((sum, ticket) => sum + (ticket.quantity || 0), 0) || 0
  const soldPercentage = totalQuantity > 0 ? Math.round(((totalQuantity - totalAvailable) / totalQuantity) * 100) : 0

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.jpg"}
          alt={event.title}
          width={400}
          height={240}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Badge variant="secondary" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
          {event.category}
        </Badge>
        
        {event.status === 'sold-out' && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            Sold Out
          </Badge>
        )}

        {soldPercentage > 70 && soldPercentage < 100 && (
          <Badge className="absolute bottom-3 left-3 bg-orange-500">
            {soldPercentage}% Sold
          </Badge>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
          {event.description}
        </p>

        <div className="space-y-2.5 text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{formatEventDate(new Date(event.date))} • {event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{event.maxAttendees?.toLocaleString()} capacity</span>
            </div>
            <div className="flex items-center text-green-600">
              <Tag className="h-4 w-4 mr-1" />
              <span className="font-medium">{totalAvailable} left</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Starting from</p>
            <span className="font-bold text-2xl text-primary">₹{lowestPrice.toLocaleString('en-IN')}</span>
          </div>
          <Link href={`/events/${event._id}`}>
            <Button size="lg" className="font-semibold">
              Get Tickets
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
