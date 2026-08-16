"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Tag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate, formatINR } from "@/lib/utils"
import { Event } from "@/lib/api"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const prices = (event.ticketTypes ?? [])
    .map(t => parseFloat(t.price))
    .filter(price => Number.isFinite(price))
  // Guard the empty case: reducing with Infinity would render "₹Infinity".
  const lowestPrice = prices.length ? Math.min(...prices) : null

  const totalAvailable = event.ticketTypes?.reduce((sum, t) => sum + (t.available || 0), 0) || 0
  const totalQuantity = event.ticketTypes?.reduce((sum, t) => sum + (t.quantity || 0), 0) || 0
  const soldPercentage =
    totalQuantity > 0 ? Math.round(((totalQuantity - totalAvailable) / totalQuantity) * 100) : 0
  const soldOut = event.status === "sold-out" || totalAvailable === 0

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-52 flex-shrink-0">
        <Image
          src={event.image || "/placeholder.jpg"}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <Badge variant="secondary" className="absolute right-3 top-3 bg-background/90 backdrop-blur-sm">
          {event.category}
        </Badge>

        {soldOut ? (
          <Badge variant="destructive" className="absolute left-3 top-3">
            Sold out
          </Badge>
        ) : soldPercentage > 70 ? (
          <Badge className="absolute left-3 top-3 bg-amber-600 hover:bg-amber-600">
            {soldPercentage}% sold
          </Badge>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
          {event.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>

        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">
              {formatEventDate(event.date)}
              {event.time ? ` · ${event.time}` : ""}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className={soldOut ? "text-destructive" : totalAvailable < 500 ? "text-amber-600" : ""}>
              {soldOut
                ? "No tickets left"
                : `${totalAvailable.toLocaleString("en-IN")} tickets left`}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t pt-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <span className="text-2xl font-bold text-primary tabular-nums">
              {lowestPrice === null ? "—" : formatINR(lowestPrice)}
            </span>
          </div>
          <Button asChild className="flex-shrink-0 font-semibold" variant={soldOut ? "outline" : "default"}>
            <Link href={`/events/${event._id}`}>{soldOut ? "View event" : "Get tickets"}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
