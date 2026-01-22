"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, ShoppingBag, TrendingUp, Wallet } from "lucide-react"
import { ticketsApi } from "@/lib/api"

export function StatsCards() {
  const [ticketCount, setTicketCount] = useState(0)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
        const tickets = await ticketsApi.getUserTickets(mockWalletAddress)
        setTicketCount(tickets.length)
      } catch (error) {
        console.error('Failed to load stats:', error)
      }
    }
    loadStats()
  }, [])

  const stats = [
    {
      title: "My Tickets",
      value: ticketCount.toString(),
      description: "NFT tickets owned",
      icon: Ticket,
      trend: "+2 this week",
      gradient: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-500"
    },
    {
      title: "Purchased",
      value: "3",
      description: "Total purchases",
      icon: ShoppingBag,
      trend: "+1 this month",
      gradient: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-500"
    },
    {
      title: "Spent",
      value: "0.40 ETH",
      description: "Total spending",
      icon: TrendingUp,
      trend: "+0.15 ETH this month",
      gradient: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-500"
    },
    {
      title: "Wallet",
      value: "1.84 ETH",
      description: "Available balance",
      icon: Wallet,
      trend: "Updated 2 min ago",
      gradient: "from-orange-500/10 to-orange-500/5",
      iconColor: "text-orange-500"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br ${stat.gradient} border-0 shadow-lg`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground mb-2">{stat.description}</p>
            <p className="text-xs text-green-600 font-medium">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
