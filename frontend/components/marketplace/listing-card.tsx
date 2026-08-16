"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, TrendingUp, TrendingDown, ShoppingCart } from "lucide-react"
import { EventImage } from "@/components/ui/event-image"
import { formatEventDate, formatINR, percentChange } from "@/lib/utils"
import { MarketplaceListing } from "@/lib/api"
import { displayParty } from "@/lib/user"
import { TransactionModal } from "@/components/transactions/transaction-modal"

interface ListingCardProps {
  listing: MarketplaceListing
  onPurchase?: (listingId: string) => Promise<void> | void
}

export function ListingCard({ listing, onPurchase }: ListingCardProps) {
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const router = useRouter()

  const event = listing.event
  const originalPrice = parseFloat(listing.originalPrice)
  const currentPrice = parseFloat(listing.price)
  const changePct = percentChange(originalPrice, currentPrice)
  const isUp = (changePct ?? 0) > 0

  const title = listing.eventTitle || event?.title || "Event ticket"
  const image = listing.eventImage || event?.image || "/placeholder.jpg"
  const eventDate = listing.eventDate || event?.date
  const location = event?.location || event?.venue

  // The modal owns the outcome; a rejection here keeps it in its error state
  // rather than falsely reporting success.
  const handleTransactionSuccess = async () => {
    if (onPurchase) {
      await onPurchase(listing._id)
    }
    setShowTransactionModal(false)
    router.push("/dashboard")
  }

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lifted">
      <div className="relative h-44 flex-shrink-0 overflow-hidden bg-muted">
        <EventImage
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {event?.category && (
          <Badge variant="secondary" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
            {event.category}
          </Badge>
        )}

        {changePct !== null && Math.abs(changePct) >= 0.1 && (
          <div
            className={`absolute top-3 right-3 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm ${
              isUp ? "bg-destructive/90" : "bg-success/90"
            }`}
          >
            {isUp ? (
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-3 w-3" aria-hidden="true" />
            )}
            {isUp ? "+" : ""}
            {changePct.toFixed(1)}%
          </div>
        )}

        <h3 className="absolute bottom-3 left-3 right-3 line-clamp-2 text-base font-semibold leading-snug text-white drop-shadow">
          {title}
        </h3>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          {eventDate && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{formatEventDate(eventDate)}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </div>
          )}
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">Sold by {displayParty(listing.seller)}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Ticket type</span>
            <Badge variant="outline" className="font-medium">
              {listing.ticketType || "General"}
            </Badge>
          </div>

          <div className="flex items-baseline justify-between border-t border-border/60 pt-2">
            <span className="text-sm text-muted-foreground">Face value</span>
            <span className="text-sm text-muted-foreground line-through tabular-nums">
              {formatINR(originalPrice)}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Asking price</span>
            <span className="text-xl font-bold text-primary tabular-nums">{formatINR(currentPrice)}</span>
          </div>
        </div>

        <div className="mt-auto space-y-2">
          <Button className="w-full font-semibold" onClick={() => setShowTransactionModal(true)}>
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Buy now
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Listed {formatEventDate(listing.listingDate)}
          </p>
        </div>
      </CardContent>

      <TransactionModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        eventTitle={title}
        ticketType={listing.ticketType || "General Admission"}
        price={listing.price}
        onSuccess={handleTransactionSuccess}
      />
    </Card>
  )
}
