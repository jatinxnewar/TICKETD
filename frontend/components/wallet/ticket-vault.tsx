"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ticket, Calendar, MapPin, ExternalLink, Share2, Download } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { Ticket as TicketType } from "@/lib/api"

interface TicketVaultProps {
  tickets: TicketType[]
}

export function TicketVault({ tickets }: TicketVaultProps) {
  if (tickets.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Tickets Yet</h3>
          <p className="text-muted-foreground mb-4">
            Your purchased tickets will appear here
          </p>
          <Button onClick={() => window.location.href = '/events'}>
            Browse Events
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Ticket Vault</h2>
        <Badge variant="secondary" className="text-sm">
          {tickets.length} {tickets.length === 1 ? 'Ticket' : 'Tickets'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card
            key={ticket._id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
          >
            <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20">
              {ticket.event?.image && (
                <Image
                  src={ticket.event.image}
                  alt={ticket.event?.title || 'Event'}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white border-0">
                  <Ticket className="h-3 w-3 mr-1" />
                  NFT
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">
                  {ticket.event?.title || 'Event Ticket'}
                </h3>
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  {ticket.ticketType}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4 space-y-4">
              {/* Event Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {ticket.event?.date 
                      ? formatEventDate(new Date(ticket.event.date))
                      : 'Date TBA'
                    }
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">
                    {ticket.event?.location || 'Location TBA'}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Token ID</span>
                  <code className="font-mono bg-muted px-2 py-1 rounded">
                    {ticket.tokenId}
                  </code>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Purchase Price</span>
                  <span className="font-semibold text-primary">₹{ticket.price}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Purchase Date</span>
                  <span>{new Date(ticket.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Status</span>
                  <Badge 
                    variant={ticket.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {ticket.status || 'Active'}
                  </Badge>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Transaction</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2"
                    onClick={() => window.open(`https://etherscan.io/tx/${ticket.transactionHash}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Etherscan
                  </Button>
                </div>
                <code className="text-xs bg-muted px-2 py-1 rounded block truncate">
                  {ticket.transactionHash}
                </code>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Generate and download ticket as PDF
                    alert('Ticket download feature coming soon!')
                  }}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard.writeText(ticket.transactionHash)
                    alert('Transaction hash copied!')
                  }}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
