"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"

interface EventCardProps {
  event: {
    id: string
    title: string
    description: string
    category: string
    location: string
    date: string
    time: string
    image: string
    price: string
    attendees: number
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="card-enhanced group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge variant="secondary" className="absolute top-3 right-3">
          {event.category}
        </Badge>
      </div>

      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

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
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
