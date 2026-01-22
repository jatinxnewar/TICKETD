"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Calendar, MapPin, AlertCircle } from "lucide-react"
import { Ticket } from "@/lib/api"
import { formatEventDate } from "@/lib/utils"

interface ListForResaleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: Ticket
  onSuccess: (listingId: string, price: string) => void
}

export function ListForResaleModal({
  open,
  onOpenChange,
  ticket,
  onSuccess,
}: ListForResaleModalProps) {
  const [price, setPrice] = useState(ticket.price)
  const [isListing, setIsListing] = useState(false)

  const originalPrice = parseFloat(ticket.price)
  const newPrice = parseFloat(price) || 0
  const priceDiff = newPrice - originalPrice
  const priceChangePercent = ((priceDiff / originalPrice) * 100).toFixed(1)

  const canList = () => {
    const purchaseDate = new Date(ticket.purchaseDate)
    const now = new Date()
    const minutesSincePurchase = (now.getTime() - purchaseDate.getTime()) / 1000 / 60
    return minutesSincePurchase <= 15
  }

  const timeRemaining = () => {
    const purchaseDate = new Date(ticket.purchaseDate)
    const now = new Date()
    const minutesSincePurchase = (now.getTime() - purchaseDate.getTime()) / 1000 / 60
    const remaining = Math.max(0, 15 - minutesSincePurchase)
    return Math.floor(remaining)
  }

  const handleList = async () => {
    setIsListing(true)
    try {
      // Simulate listing creation
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockListingId = 'listing_' + Math.random().toString(36).substring(7)
      onSuccess(mockListingId, price)
    } catch (error) {
      console.error('Failed to list ticket:', error)
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
          {/* 15-Minute Window Notice */}
          {canList() ? (
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-green-600">Resale Window Active</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {timeRemaining()} minutes remaining to list this ticket
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-red-500/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-red-600">Resale Window Closed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You can only list tickets within 15 minutes of purchase
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
                <span className="font-semibold">₹{ticket.price}</span>
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
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in INR"
              className="text-lg font-semibold"
            />
            {newPrice > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Price Change</span>
                <span className={`font-semibold ${priceDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceDiff >= 0 ? '+' : ''}₹{Math.abs(Math.round(priceDiff)).toLocaleString('en-IN')} ({priceDiff >= 0 ? '+' : ''}{priceChangePercent}%)
                </span>
              </div>
            )}
          </div>

          {/* Suggested Prices */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick Select</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrice(String(Math.round(originalPrice * 0.9)))}
              >
                -10%
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrice(ticket.price)}
              >
                Same
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrice(String(Math.round(originalPrice * 1.2)))}
              >
                +20%
              </Button>
            </div>
          </div>

          {/* Platform Fee Notice */}
          <Card className="bg-muted/30">
            <CardContent className="p-3">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Platform Fee (5%)</span>
                <span className="font-semibold">₹{Math.round(newPrice * 0.05).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs mt-1 pt-1 border-t">
                <span className="text-muted-foreground">You'll Receive</span>
                <span className="font-bold text-primary">₹{Math.round(newPrice * 0.95).toLocaleString('en-IN')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={handleList}
              disabled={isListing || !canList() || !newPrice || newPrice <= 0}
            >
              {isListing ? 'Listing...' : 'List for Sale'}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
