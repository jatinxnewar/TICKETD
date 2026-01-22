"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink, CheckCircle2 } from "lucide-react"
import { ticketsApi, Ticket } from "@/lib/api"
import { formatEventDate } from "@/lib/utils"

export function PurchaseHistoryTab() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
        const userTickets = await ticketsApi.getUserTickets(mockWalletAddress)
        // Sort by purchase date, newest first
        const sorted = userTickets.sort((a, b) => 
          new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
        )
        setTickets(sorted)
      } catch (error) {
        console.error('Failed to load purchase history:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No Purchase History</h3>
          <p className="text-muted-foreground">Your ticket purchases will appear here</p>
        </CardContent>
      </Card>
    )
  }

  const totalSpent = tickets.reduce((sum, ticket) => sum + parseFloat(ticket.price), 0)

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Purchases</p>
              <p className="text-3xl font-bold text-primary">{tickets.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-green-600">₹{totalSpent.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Active Tickets</p>
              <p className="text-3xl font-bold text-blue-600">
                {tickets.filter(t => t.status === 'active' || !t.status).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Transaction History</h3>
        {tickets.map((ticket) => (
          <Card key={ticket._id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Date & Status */}
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    {new Date(ticket.purchaseDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(ticket.purchaseDate).toLocaleTimeString()}
                  </p>
                </div>

                {/* Event Details */}
                <div className="md:col-span-5">
                  <h4 className="font-semibold mb-1">{ticket.event?.title}</h4>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{ticket.event?.date ? formatEventDate(new Date(ticket.event.date)) : 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[200px]">{ticket.event?.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="md:col-span-2">
                  <Badge variant="outline" className="mb-1">
                    {ticket.ticketType}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Token: {ticket.tokenId}
                  </p>
                </div>

                {/* Price */}
                <div className="md:col-span-1 text-right">
                  <p className="font-bold text-primary">₹{ticket.price}</p>
                  <Badge 
                    variant={ticket.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs mt-1"
                  >
                    {ticket.status || 'Active'}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://etherscan.io/tx/${ticket.transactionHash}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View TX
                  </Button>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Transaction Hash:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {ticket.transactionHash}
                  </code>
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Owner:</span>
                  <p className="font-mono truncate">{ticket.owner.substring(0, 10)}...</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Event ID:</span>
                  <p className="font-mono truncate">{ticket.eventId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Used:</span>
                  <p className="flex items-center gap-1">
                    {ticket.isUsed || ticket.used ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        Yes
                      </>
                    ) : (
                      'No'
                    )}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Purchase Method:</span>
                  <p>MetaMask</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
