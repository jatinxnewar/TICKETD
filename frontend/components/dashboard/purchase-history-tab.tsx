"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Receipt } from "lucide-react"
import { ticketsApi } from "@/lib/api"
import { CURRENT_USER_ID } from "@/lib/user"
import { formatEventDate, formatEventDateTime, formatINR } from "@/lib/utils"
import { useStoreData } from "@/hooks/useStoreData"

export function PurchaseHistoryTab() {
  const { data, loading } = useStoreData(
    () => ticketsApi.getUserTickets(CURRENT_USER_ID),
    "Could not load your purchase history.",
  )

  const tickets = [...(data ?? [])].sort(
    (a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime(),
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl border bg-muted/40 animate-pulse" />
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center text-center py-16 px-6">
          <span className="rounded-full bg-muted p-4 mb-4">
            <Receipt className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold mb-1">No purchases yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Once you buy a ticket, the receipt and transaction reference will show up here.
          </p>
        </CardContent>
      </Card>
    )
  }

  const totalSpent = tickets.reduce((sum, t) => sum + (parseFloat(t.price) || 0), 0)
  const activeCount = tickets.filter(t => t.status !== "used" && !t.used).length

  const summary = [
    { label: "Purchases", value: String(tickets.length) },
    { label: "Total spent", value: formatINR(totalSpent) },
    { label: "Still valid", value: String(activeCount) },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map(item => (
          <Card key={item.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold tracking-tight tabular-nums mt-1">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight">Transaction history</h3>

        {tickets.map(ticket => (
          <Card key={ticket._id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold leading-tight">
                      {ticket.event?.title || "Event"}
                    </h4>
                    <Badge variant="outline">{ticket.ticketType}</Badge>
                    <Badge variant={ticket.status === "used" || ticket.used ? "secondary" : "default"}>
                      {ticket.status === "listed"
                        ? "Listed"
                        : ticket.status === "used" || ticket.used
                        ? "Used"
                        : "Active"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {ticket.event?.date ? formatEventDate(ticket.event.date) : "Date TBA"}
                    </span>
                    <span className="flex items-center gap-1.5 min-w-0">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">{ticket.event?.location || "Location TBA"}</span>
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right sm:flex-shrink-0">
                  <p className="text-xl font-bold text-primary tabular-nums">
                    {formatINR(ticket.price)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatEventDateTime(ticket.purchaseDate)}
                  </p>
                </div>
              </div>

              <dl className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs">
                <div className="min-w-0">
                  <dt className="text-muted-foreground">Token ID</dt>
                  <dd className="font-mono mt-0.5">#{ticket.tokenId}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-muted-foreground">Paid with</dt>
                  <dd className="mt-0.5">UPI · Demo</dd>
                </div>
                <div className="col-span-2 sm:col-span-1 min-w-0">
                  <dt className="text-muted-foreground">Reference</dt>
                  <dd className="font-mono mt-0.5 truncate" title={ticket.transactionHash}>
                    {ticket.transactionHash}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
