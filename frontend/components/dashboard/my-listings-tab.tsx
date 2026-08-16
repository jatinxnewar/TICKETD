"use client"

import { useState } from "react"
import { EventImage } from "@/components/ui/event-image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag, TrendingUp, TrendingDown } from "lucide-react"
import { marketplaceApi, MarketplaceListing } from "@/lib/api"
import { formatEventDate, formatINR, percentChange } from "@/lib/utils"
import { useStoreData } from "@/hooks/useStoreData"
import { useToast } from "@/hooks/use-toast"

const STATUS_LABEL: Record<MarketplaceListing["status"], string> = {
  active: "Live",
  sold: "Sold",
  cancelled: "Withdrawn",
}

export function MyListingsTab() {
  const [pendingId, setPendingId] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const { data, loading, refresh } = useStoreData(
    () => marketplaceApi.getMine(),
    "Could not load your listings.",
  )
  const listings = data ?? []

  const handleCancel = async (listing: MarketplaceListing) => {
    setPendingId(listing._id)
    try {
      await marketplaceApi.cancel(listing._id)
      toast({
        title: "Listing withdrawn",
        description: "The ticket is back in your wallet.",
      })
      refresh()
    } catch (error) {
      toast({
        title: "Could not withdraw listing",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    } finally {
      setPendingId(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 rounded-xl border bg-muted/40 animate-pulse" />
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center text-center py-16 px-6">
          <span className="rounded-full bg-muted p-4 mb-4">
            <Tag className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold mb-1">No listings yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            When you list a ticket for resale it will appear here, where you can track it or withdraw it.
          </p>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Go to my tickets
          </Button>
        </CardContent>
      </Card>
    )
  }

  const active = listings.filter(l => l.status === "active").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Listings</h2>
        <p className="text-muted-foreground">
          {active} live · {listings.length} total
        </p>
      </div>

      <div className="space-y-4">
        {listings.map(listing => {
          const change = percentChange(parseFloat(listing.originalPrice), parseFloat(listing.price))
          const isUp = (change ?? 0) > 0
          const eventDate = listing.eventDate || listing.event?.date

          return (
            <Card key={listing._id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-32 sm:h-auto sm:w-44 flex-shrink-0">
                    <EventImage
                      src={listing.eventImage || listing.event?.image || "/placeholder.jpg"}
                      alt=""
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                          {STATUS_LABEL[listing.status]}
                        </Badge>
                        <Badge variant="outline">{listing.ticketType}</Badge>
                      </div>
                      <h3 className="font-semibold leading-tight truncate">
                        {listing.eventTitle || listing.event?.title || "Event"}
                      </h3>
                      {eventDate && (
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {formatEventDate(eventDate)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-6 sm:flex-shrink-0">
                      <div className="text-right">
                        <p className="text-lg font-bold tabular-nums">{formatINR(listing.price)}</p>
                        {change !== null && Math.abs(change) >= 0.1 && (
                          <p
                            className={`flex items-center justify-end gap-1 text-xs font-medium ${
                              isUp ? "text-success" : "text-destructive"
                            }`}
                          >
                            {isUp ? (
                              <TrendingUp className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <TrendingDown className="h-3 w-3" aria-hidden="true" />
                            )}
                            {isUp ? "+" : ""}
                            {change.toFixed(1)}% vs face
                          </p>
                        )}
                      </div>

                      {listing.status === "active" && (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={pendingId === listing._id}
                          onClick={() => handleCancel(listing)}
                        >
                          {pendingId === listing._id ? "Withdrawing…" : "Withdraw"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
