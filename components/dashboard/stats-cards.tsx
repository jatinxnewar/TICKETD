"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Calendar, TrendingUp, Wallet } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "My Tickets",
      value: "12",
      description: "Active NFT tickets",
      icon: Ticket,
      trend: "+2 this month",
    },
    {
      title: "Events Created",
      value: "3",
      description: "Total events organized",
      icon: Calendar,
      trend: "+1 this month",
    },
    {
      title: "Total Sales",
      value: "2.4 ETH",
      description: "Revenue from ticket sales",
      icon: TrendingUp,
      trend: "+0.8 ETH this month",
    },
    {
      title: "Wallet Balance",
      value: "1.2 ETH",
      description: "Available balance",
      icon: Wallet,
      trend: "Updated 2 min ago",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="card-enhanced">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
