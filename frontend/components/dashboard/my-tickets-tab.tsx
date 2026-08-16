"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Ticket as TicketIcon, TrendingUp } from "lucide-react"
import Image from "next/image"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-80 bg-secondary/20 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="text-6xl mb-4">🎫</div>
        <h3 className="text-xl font-semibold">No Tickets Yet</h3>
        <p className="text-muted-foreground text-center max-w-md">
          You haven't purchased any tickets yet. Browse events and get your first NFT ticket!
        </p>
        <Button onClick={() => router.push('/events')} className="mt-4">
          Browse Events
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My NFT Tickets</h2>
          <p className="text-muted-foreground">{tickets.length} ticket{tickets.length !== 1 ? 's' : ''} owned</p>
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
            <Card key={ticket._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card">
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.jpg"}
                  alt={event.title || 'Event'}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <Badge 
                  variant={isUsed ? "secondary" : isListed ? "outline" : "default"}
                  className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
                >
                  {isUsed ? 'Used' : isListed ? 'Listed' : 'Active'}
                </Badge>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white text-lg line-clamp-1 drop-shadow-lg">
                    {event.title}
                  </h3>
                  <Badge variant="secondary" className="mt-2">
                    #{ticket.tokenId}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="font-semibold">{ticket.ticketType}</span>
                  <span className="text-primary font-bold">{formatINR(ticket.price)}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{formatEventDate(new Date(event.date))}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <TicketIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate text-xs">
                      Purchased {new Date(ticket.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  {!isUsed && !isListed && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleListForResale(ticket)}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        List for Resale
                      </Button>
                    </>
                  )}

                  {isListed && (
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Listed on Marketplace</p>
                      <Button variant="link" size="sm" onClick={() => router.push('/marketplace')}>
                        View Listing
                      </Button>
                    </div>
                  )}

                  {isUsed && (
                    <div className="bg-secondary/30 rounded-lg p-3 text-center">
                      <p className="text-sm text-muted-foreground">Ticket has been used</p>
                    </div>
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
