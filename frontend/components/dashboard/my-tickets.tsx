"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Share, MoreHorizontal, Calendar, MapPin, Tag, ExternalLink } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatEventDate } from "@/lib/utils"
import { ResaleModal } from "@/components/tickets/resale-modal"
import { useWeb3 } from "@/components/web3-provider"
import { getExplorerUrl } from "@/lib/web3-utils"
import { useToast } from "@/hooks/use-toast"

interface UserTicket {
  tokenId: string
  eventId: string
  eventTitle: string
  ticketType: string
  price: string
  purchaseDate: string
  txHash: string
  owner: string
  status: "active" | "listed" | "used"
  resalePrice?: string
  listedAt?: string
  eventDate?: string
  eventTime?: string
  location?: string
  image?: string
}

export function MyTickets() {
  const [tickets, setTickets] = useState<UserTicket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<UserTicket | null>(null)
  const [showResaleModal, setShowResaleModal] = useState(false)
  const { account, isConnected, chainId } = useWeb3()
  const { toast } = useToast()

  useEffect(() => {
    loadUserTickets()
  }, [account])

  const loadUserTickets = () => {
    if (!account) {
      setTickets([])
      return
    }

    // Load from local storage (in production, fetch from blockchain + backend)
    const storedTickets = JSON.parse(localStorage.getItem("userTickets") || "[]")
    const userTickets = storedTickets.filter((t: UserTicket) => 
      t.owner.toLowerCase() === account.toLowerCase()
    )
    setTickets(userTickets)
  }

  const handleResell = (ticket: UserTicket) => {
    setSelectedTicket(ticket)
    setShowResaleModal(true)
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-lg text-muted-foreground">Connect your wallet to view your tickets</p>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-lg text-muted-foreground">You don't have any tickets yet</p>
        <Button>Browse Events</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My NFT Tickets ({tickets.length})</h2>
        <Button variant="outline" onClick={loadUserTickets}>Refresh</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.tokenId} className="card-enhanced nft-glow overflow-hidden">
            <div className="relative">
              <Image
                src={ticket.image || "/placeholder.svg"}
                alt={ticket.eventTitle}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <Badge 
                variant={ticket.status === "active" ? "default" : ticket.status === "listed" ? "secondary" : "outline"} 
                className="absolute top-3 right-3"
              >
                {ticket.status}
              </Badge>
              <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                #{ticket.tokenId.replace("#", "")}
              </Badge>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {ticket.ticketType}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR Code
                    </DropdownMenuItem>
                    {ticket.txHash && (
                      <DropdownMenuItem asChild>
                        <a
                          href={getExplorerUrl(chainId || 1, "tx", ticket.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Transaction
                        </a>
                      </DropdownMenuItem>
                    )}
                    {ticket.status === "active" && (
                      <DropdownMenuItem onClick={() => handleResell(ticket)}>
                        <Tag className="h-4 w-4 mr-2" />
                        List for Resale
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                {ticket.eventDate && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatEventDate(ticket.eventDate)} {ticket.eventTime && `at ${ticket.eventTime}`}
                  </div>
                )}
                {ticket.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {ticket.location}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="font-semibold">{ticket.price}</span>
                  {ticket.status === "listed" && ticket.resalePrice && (
                    <p className="text-xs text-green-600">Listed: {ticket.resalePrice} ETH</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  {ticket.status === "active" && (
                    <Button size="sm" onClick={() => handleResell(ticket)}>
                      Resell
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resale Modal */}
      {selectedTicket && (
        <ResaleModal
          open={showResaleModal}
          onOpenChange={setShowResaleModal}
          ticket={{
            tokenId: selectedTicket.tokenId,
            eventTitle: selectedTicket.eventTitle,
            ticketType: selectedTicket.ticketType,
            originalPrice: selectedTicket.price,
            eventDate: selectedTicket.eventDate || "",
          }}
          onSuccess={(txHash) => {
            toast({
              title: "Ticket Listed!",
              description: "Your ticket is now available on the marketplace.",
            })
            loadUserTickets()
            setSelectedTicket(null)
          }}
        />
      )}
    </div>
  )
}
