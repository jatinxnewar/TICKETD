"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag, Calendar, MapPin, Ticket as TicketIcon, TrendingUp } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { ticketsApi, Ticket, marketplaceApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ListForResaleModal } from "@/components/marketplace/list-for-resale-modal"

export function MyTicketsTab() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [showResaleModal, setShowResaleModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Mock wallet address - in production this would come from wallet connection
  const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

  useEffect(() => {
    loadUserTickets()
  }, [])

  const loadUserTickets = async () => {
    try {
      setLoading(true)
      const data = await ticketsApi.getUserTickets(mockWalletAddress)
      setTickets(data)
    } catch (error) {
      console.error('Failed to load tickets:', error)
      toast({
        title: "Error loading tickets",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleListForResale = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setShowResaleModal(true)
  }

  const handleResaleSuccess = async (listingId: string, price: string) => {
    try {
      const resalePrice = price

      await marketplaceApi.create({
        ticketId: selectedTicket!._id,
        tokenId: selectedTicket!.tokenId,
        eventId: selectedTicket!.eventId,
        seller: mockWalletAddress,
        price: resalePrice,
        originalPrice: selectedTicket!.price,
        ticketType: selectedTicket!.ticketType,
        eventTitle: selectedTicket!.event?.title || 'Event',
        eventDate: selectedTicket!.event?.date || '',
        eventImage: selectedTicket!.event?.image || ''
      })

      toast({
        title: "✅ Listed Successfully!",
        description: `Your ticket is now listed for ₹${resalePrice}`,
      })

      setShowResaleModal(false)
      setSelectedTicket(null)
      
      // Reload tickets
      await loadUserTickets()
    } catch (error) {
      console.error('Failed to list ticket:', error)
      toast({
        title: "Listing Failed",
        description: "Please try again later",
        variant: "destructive"
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
        <Button variant="outline" onClick={loadUserTickets}>
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
                  <span className="text-primary font-bold">₹{ticket.price}</span>
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
