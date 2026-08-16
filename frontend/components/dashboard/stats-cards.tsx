"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, ShoppingBag, TrendingUp, Tag } from "lucide-react"
import { ticketsApi, marketplaceApi } from "@/lib/api"
import { CURRENT_USER_ID } from "@/lib/user"
import { formatINR } from "@/lib/utils"
import { useStoreData } from "@/hooks/useStoreData"

export function StatsCards() {
  const { data, loading } = useStoreData(async () => {
    const [tickets, listings] = await Promise.all([
      ticketsApi.getUserTickets(CURRENT_USER_ID),
      marketplaceApi.getMine(),
    ])
    return { tickets, listings }
  }, "Could not load your stats.")

  const tickets = data?.tickets ?? []
  const listings = data?.listings ?? []

  const activeTickets = tickets.filter(t => t.status !== "used" && !t.used)
  const totalSpent = tickets.reduce((sum, t) => sum + (parseFloat(t.price) || 0), 0)
  const activeListings = listings.filter(l => l.status === "active")
  const soldListings = listings.filter(l => l.status === "sold")
  const earned = soldListings.reduce((sum, l) => sum + (parseFloat(l.price) || 0) * 0.95, 0)

  const stats = [
    {
      title: "My Tickets",
      value: String(tickets.length),
      description: `${activeTickets.length} ready to use`,
      icon: Ticket,
      accent: "text-primary",
      surface: "bg-info-subtle",
    },
    {
      title: "Total Spent",
      value: formatINR(totalSpent),
      description: `Across ${tickets.length} purchase${tickets.length === 1 ? "" : "s"}`,
      icon: ShoppingBag,
      accent: "text-foreground",
      surface: "bg-muted",
    },
    {
      title: "Listed for Resale",
      value: String(activeListings.length),
      description: activeListings.length ? "Live on the marketplace" : "Nothing listed right now",
      icon: Tag,
      accent: "text-warning",
      surface: "bg-warning-subtle",
    },
    {
      title: "Resale Earnings",
      value: formatINR(earned),
      description: `${soldListings.length} ticket${soldListings.length === 1 ? "" : "s"} sold`,
      icon: TrendingUp,
      accent: "text-success",
      surface: "bg-success-subtle",
    },
  ]

  if (loading) {
    return (
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[7.5rem] animate-pulse rounded-xl border bg-muted/50" />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.title} className="transition-shadow duration-200 hover:shadow-lifted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <span className={`rounded-lg p-2 ${stat.surface}`}>
              <stat.icon className={`h-4 w-4 ${stat.accent}`} aria-hidden="true" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums tracking-tight">{stat.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
