"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Calendar, MapPin, AlertCircle, Loader2 } from "lucide-react"
import { Ticket } from "@/lib/api"
import { formatEventDate, formatINR, percentChange } from "@/lib/utils"

/**
 * Resale is capped at 120% of face value. This is the platform's anti-scalping
 * rule and the reason the price field rejects higher numbers.
 */
const MAX_MARKUP = 1.2

interface ListForResaleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: Ticket
  onSuccess: (price: string) => void | Promise<void>
}

export function ListForResaleModal({
  open,
  onOpenChange,
  ticket,
  onSuccess,
}: ListForResaleModalProps) {
  const [price, setPrice] = useState(ticket.price)
  const [isListing, setIsListing] = useState(false)

  // Reset the field whenever a different ticket is opened, otherwise the price
  // from the previously selected ticket sticks.
  useEffect(() => {
    if (open) {
      setPrice(ticket.price)
      setIsListing(false)
    }
  }, [open, ticket._id, ticket.price])

  const originalPrice = parseFloat(ticket.price)
  const newPrice = parseFloat(price)
  const hasValidPrice = Number.isFinite(newPrice) && newPrice > 0
  const priceDiff = hasValidPrice ? newPrice - originalPrice : 0
  const changePct = hasValidPrice ? percentChange(originalPrice, newPrice) : null

  const maxPrice = Math.round(originalPrice * MAX_MARKUP)
  const exceedsCap = hasValidPrice && newPrice > maxPrice
  const eventHasPassed = ticket.event ? new Date(ticket.event.date).getTime() < Date.now() : false
  const alreadyListed = ticket.status === "listed"
  const isUsed = Boolean(ticket.used) || ticket.status === "used"

  const blockedReason = isUsed
    ? "This ticket has already been used and cannot be resold."
    : alreadyListed
    ? "This ticket is already listed on the marketplace."
    : eventHasPassed
    ? "This event has already taken place."
    : null

  const canSubmit = !blockedReason && hasValidPrice && !exceedsCap && !isListing

  const handleList = async () => {
    if (!canSubmit) return
    setIsListing(true)
    try {
      await onSuccess(String(Math.round(newPrice)))
    } finally {
      setIsListing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>List Ticket for Resale</DialogTitle>
          <DialogDescription>
            Set your price and list your ticket on the marketplace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {blockedReason ? (
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-destructive">Cannot list this ticket</p>
                    <p className="text-xs text-muted-foreground mt-1">{blockedReason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-success-subtle border-success/25">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-success">
                      Eligible for resale
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      To keep pricing fair, resale is capped at {formatINR(maxPrice)} (120% of face value).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ticket Details */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold mb-1">{ticket.event?.title}</h4>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{ticket.event?.date ? formatEventDate(new Date(ticket.event.date)) : 'TBA'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{ticket.event?.location || 'TBA'}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t text-sm">
                <span className="text-muted-foreground">Ticket Type</span>
                <Badge variant="outline">{ticket.ticketType}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Original Price</span>
                <span className="font-semibold">{formatINR(ticket.price)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Token ID</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">{ticket.tokenId}</code>
              </div>
            </CardContent>
          </Card>

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price">Resale Price (INR)</Label>
            <Input
              id="price"
              type="number"
              step="100"
              min="1"
              max={maxPrice}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in INR"
              disabled={Boolean(blockedReason)}
              aria-invalid={exceedsCap}
              aria-describedby="price-help"
              className="text-lg font-semibold"
            />
            <div id="price-help" className="min-h-[1.25rem]">
              {exceedsCap ? (
                <p className="text-sm font-medium text-destructive">
                  Maximum allowed is {formatINR(maxPrice)}.
                </p>
              ) : hasValidPrice && changePct !== null ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price change</span>
                  <span
                    className={`font-semibold ${
                      priceDiff > 0
                        ? "text-success"
                        : priceDiff < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {priceDiff > 0 ? "+" : priceDiff < 0 ? "−" : ""}
                    {formatINR(Math.abs(priceDiff))} ({changePct > 0 ? "+" : ""}
                    {changePct.toFixed(1)}%)
                  </span>
                </div>
              ) : price !== "" && !hasValidPrice ? (
                <p className="text-sm font-medium text-destructive">Enter a price greater than zero.</p>
              ) : null}
            </div>
          </div>

          {/* Suggested Prices */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick select</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "−10%", value: Math.round(originalPrice * 0.9) },
                { label: "Face value", value: Math.round(originalPrice) },
                { label: "+20%", value: maxPrice },
              ].map(option => (
                <Button
                  key={option.label}
                  type="button"
                  variant={hasValidPrice && Math.round(newPrice) === option.value ? "default" : "outline"}
                  size="sm"
                  disabled={Boolean(blockedReason)}
                  onClick={() => setPrice(String(option.value))}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Platform Fee Notice */}
          <Card className="bg-muted/30">
            <CardContent className="p-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Platform fee (5%)</span>
                <span className="font-semibold">
                  {hasValidPrice ? `−${formatINR(newPrice * 0.05)}` : "—"}
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1 pt-1 border-t">
                <span className="text-muted-foreground">You'll receive</span>
                <span className="font-bold text-primary">
                  {hasValidPrice ? formatINR(newPrice * 0.95) : "—"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" onClick={handleList} disabled={!canSubmit}>
              {isListing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Listing…
                </>
              ) : (
                "List for sale"
              )}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isListing}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
