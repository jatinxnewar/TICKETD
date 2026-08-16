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
      accent: "text-blue-600 dark:text-blue-400",
      surface: "bg-blue-500/10",
    },
    {
      title: "Total Spent",
      value: formatINR(totalSpent),
      description: `Across ${tickets.length} purchase${tickets.length === 1 ? "" : "s"}`,
      icon: ShoppingBag,
      accent: "text-violet-600 dark:text-violet-400",
      surface: "bg-violet-500/10",
    },
    {
      title: "Listed for Resale",
      value: String(activeListings.length),
      description: activeListings.length ? "Live on the marketplace" : "Nothing listed right now",
      icon: Tag,
      accent: "text-amber-600 dark:text-amber-400",
      surface: "bg-amber-500/10",
    },
    {
      title: "Resale Earnings",
      value: formatINR(earned),
      description: `${soldListings.length} ticket${soldListings.length === 1 ? "" : "s"} sold`,
      icon: TrendingUp,
      accent: "text-emerald-600 dark:text-emerald-400",
      surface: "bg-emerald-500/10",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[7.5rem] rounded-xl border bg-muted/40 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(stat => (
        <Card key={stat.title} className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <span className={`rounded-lg p-2 ${stat.surface}`}>
              <stat.icon className={`h-4 w-4 ${stat.accent}`} aria-hidden="true" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight tabular-nums">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
