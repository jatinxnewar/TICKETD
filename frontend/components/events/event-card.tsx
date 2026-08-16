"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react"
import { EventImage } from "@/components/ui/event-image"
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
    <Card className="group relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lifted focus-within:border-primary/40">
      <div className="relative h-48 flex-shrink-0 overflow-hidden bg-muted">
        <EventImage
          src={event.image || "/placeholder.jpg"}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <Badge variant="secondary" className="absolute right-3 top-3 bg-background/90 backdrop-blur-sm">
          {event.category}
        </Badge>

        {soldOut ? (
          <Badge variant="destructive" className="absolute left-3 top-3">
            Sold out
          </Badge>
        ) : soldPercentage > 70 ? (
          <Badge className="absolute left-3 top-3 bg-warning text-warning-foreground">
            {soldPercentage}% sold
          </Badge>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
          {/* Stretched link makes the whole card the hit target while keeping
              a single, correctly-labelled link for assistive tech. */}
          <Link href={`/events/${event._id}`} className="after:absolute after:inset-0">
            {event.title}
          </Link>
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
            <span className={soldOut ? "text-destructive" : totalAvailable < 500 ? "text-warning" : ""}>
              {soldOut
                ? "No tickets left"
                : `${totalAvailable.toLocaleString("en-IN")} tickets left`}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t pt-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <span className="text-xl font-bold tabular-nums">
              {lowestPrice === null ? "—" : formatINR(lowestPrice)}
            </span>
          </div>
          {/* Visual affordance only — the stretched title link handles the click. */}
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5"
          >
            {soldOut ? "View" : "Get tickets"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
