"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, Check, ShieldCheck } from "lucide-react"
import { ticketsApi, marketplaceApi } from "@/lib/api"
import { CURRENT_USER, CURRENT_USER_ID } from "@/lib/user"
import { formatINR } from "@/lib/utils"
import { useStoreData } from "@/hooks/useStoreData"
import { useToast } from "@/hooks/use-toast"

export function WalletTab() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const { data, loading } = useStoreData(async () => {
    const [tickets, listings] = await Promise.all([
      ticketsApi.getUserTickets(CURRENT_USER_ID),
      marketplaceApi.getMine(),
    ])
    return { tickets, listings }
  }, "Could not load your wallet.")

  const tickets = data?.tickets ?? []
  const listings = data?.listings ?? []

  const holdingsValue = tickets
    .filter(t => t.status !== "used" && !t.used)
    .reduce((sum, t) => sum + (parseFloat(t.price) || 0), 0)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CURRENT_USER.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-48 rounded-xl border bg-muted/40 animate-pulse" />
        <div className="h-32 rounded-xl border bg-muted/40 animate-pulse" />
      </div>
    )
  }

  const breakdown = [
    { label: "Tickets held", value: String(tickets.length) },
    { label: "Holdings value", value: formatINR(holdingsValue) },
    { label: "Active listings", value: String(listings.filter(l => l.status === "active").length) },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5 text-primary" aria-hidden="true" />
                {CURRENT_USER.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">Demo account</p>
            </div>
            <Badge variant="outline" className="gap-1 flex-shrink-0">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              Verified
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <span className="text-sm text-muted-foreground">Wallet address</span>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3">
              <code className="flex-1 min-w-0 truncate font-mono text-sm">
                {CURRENT_USER.address}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                aria-label="Copy wallet address"
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t pt-5">
            {breakdown.map(item => (
              <div key={item.label}>
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="text-xl font-bold tracking-tight tabular-nums mt-1">{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="p-5">
          <p className="text-sm text-muted-foreground">
            This is a demonstration wallet. Balances and transaction references are simulated locally
            and no real funds or on-chain assets are involved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
