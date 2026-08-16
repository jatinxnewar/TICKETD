"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Ticket as TicketIcon, TrendingUp } from "lucide-react"
import { EventImage } from "@/components/ui/event-image"
import { formatEventDate, formatINR } from "@/lib/utils"
import { ticketsApi, Ticket, marketplaceApi } from "@/lib/api"
import { CURRENT_USER_ID } from "@/lib/user"
import { useToast } from "@/hooks/use-toast"
import { useStoreData } from "@/hooks/useStoreData"
import { useRouter } from "next/navigation"
import { ListForResaleModal } from "@/components/marketplace/list-for-resale-modal"

export function MyTicketsTab() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showResaleModal, setShowResaleModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const { data, loading, refresh } = useStoreData(
    () => ticketsApi.getUserTickets(CURRENT_USER_ID),
    "Could not load your tickets.",
  )
  const tickets = data ?? []

  const handleListForResale = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setShowResaleModal(true)
  }

  const handleResaleSuccess = async (price: string) => {
    if (!selectedTicket) return

    try {
      await marketplaceApi.create({ ticketId: selectedTicket._id, price })

      toast({
        title: "Listed successfully",
        description: `Your ticket is now on the marketplace for ${formatINR(price)}.`,
      })

      setShowResaleModal(false)
      setSelectedTicket(null)
      refresh()
    } catch (error) {
      toast({
        title: "Listing failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl border bg-muted/50" />
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center px-6 py-16 text-center">
          <span className="mb-4 rounded-full bg-muted p-4">
            <TicketIcon className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          </span>
          <h3 className="mb-1 text-lg font-semibold">No tickets yet</h3>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Tickets you buy will appear here, ready to use or resell.
          </p>
          <Button onClick={() => router.push("/events")}>Browse events</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My tickets</h2>
          <p className="text-muted-foreground">
            {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} owned
          </p>
        </div>
        <Button variant="outline" onClick={refresh}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const event = ticket.event
          if (!event) return null

          const isListed = ticket.status === 'listed'
          const isUsed = ticket.used

          return (
            <Card
              key={ticket._id}
              className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lifted"
            >
              <div className="relative h-44 flex-shrink-0 overflow-hidden bg-muted">
                <EventImage
                  src={event.image || "/placeholder.jpg"}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Explicit colours: a `default` badge with an overridden
                    background keeps its light foreground and vanishes. */}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${
                    isUsed
                      ? "bg-background/90 text-muted-foreground"
                      : isListed
                      ? "bg-warning text-warning-foreground"
                      : "bg-success text-success-foreground"
                  }`}
                >
                  {isUsed ? "Used" : isListed ? "Listed" : "Active"}
                </span>

                <div className="absolute inset-x-3 bottom-3">
                  <h3 className="line-clamp-1 text-base font-semibold text-white drop-shadow">
                    {event.title}
                  </h3>
                  <span className="mt-1.5 inline-block rounded bg-white/15 px-1.5 py-0.5 font-mono text-xs text-white backdrop-blur-sm">
                    #{ticket.tokenId}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-3 text-base">
                  <span className="truncate font-semibold">{ticket.ticketType}</span>
                  <span className="flex-shrink-0 font-bold tabular-nums">{formatINR(ticket.price)}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{formatEventDate(event.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <TicketIcon className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">Purchased {formatEventDate(ticket.purchaseDate)}</span>
                  </div>
                </div>

                <div className="mt-auto border-t pt-4">
                  {!isUsed && !isListed && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleListForResale(ticket)}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" aria-hidden="true" />
                      List for resale
                    </Button>
                  )}

                  {isListed && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => router.push("/marketplace")}
                    >
                      View on marketplace
                    </Button>
                  )}

                  {isUsed && (
                    <p className="py-2 text-center text-sm text-muted-foreground">
                      This ticket has been used
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* List for Resale Modal */}
      {selectedTicket && (
        <ListForResaleModal
          open={showResaleModal}
          onOpenChange={setShowResaleModal}
          ticket={selectedTicket}
          onSuccess={handleResaleSuccess}
        />
      )}
    </div>
  )
}
