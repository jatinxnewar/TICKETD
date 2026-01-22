"use client"

import { useEffect, useState } from "react"
import { ticketsApi, Ticket } from "@/lib/api"
import { TicketVault } from "@/components/wallet/ticket-vault"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, CheckCircle2 } from "lucide-react"

export function WalletTab() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const userTickets = await ticketsApi.getUserTickets(mockWalletAddress)
        setTickets(userTickets)
      } catch (error) {
        console.error('Failed to load tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTickets()
  }, [])

  const totalValue = tickets.reduce((sum, ticket) => sum + parseFloat(ticket.price), 0)

  const copyAddress = () => {
    navigator.clipboard.writeText(mockWalletAddress)
    alert('Wallet address copied!')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 border-2 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Connected Wallet</h3>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                MetaMask Connected
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://etherscan.io/address/${mockWalletAddress}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Wallet Address */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Wallet Address</label>
              <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                <code className="flex-1 text-sm font-mono truncate">
                  {mockWalletAddress}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyAddress}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Wallet Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{tickets.length}</p>
                <p className="text-xs text-muted-foreground mt-1">NFT Tickets</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{totalValue.toFixed(3)}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Value (INR)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {tickets.filter(t => t.status === 'active' || !t.status).length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Vault */}
      <TicketVault tickets={tickets} />
    </div>
  )
}
