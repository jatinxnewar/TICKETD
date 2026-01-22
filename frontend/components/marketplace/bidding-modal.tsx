"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Gavel, TrendingUp, Clock, User, AlertCircle } from "lucide-react"
import { MarketplaceListing } from "@/lib/api"
import { formatEventDate } from "@/lib/utils"

interface Bid {
  id: string
  bidder: string
  amount: string
  timestamp: Date
}

interface BiddingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing: MarketplaceListing
  onBidPlaced: (amount: string) => void
}

export function BiddingModal({
  open,
  onOpenChange,
  listing,
  onBidPlaced,
}: BiddingModalProps) {
  const [bidAmount, setBidAmount] = useState('')
  const [bids, setBids] = useState<Bid[]>([])
  const [isPlacingBid, setIsPlacingBid] = useState(false)

  const currentPrice = parseFloat(listing.price)
  const highestBid = bids.length > 0 ? Math.max(...bids.map(b => parseFloat(b.amount))) : currentPrice
  const minimumBid = highestBid + 100

  useEffect(() => {
    if (open) {
      // Generate some mock bids
      const mockBids: Bid[] = [
        {
          id: '1',
          bidder: '0x' + Math.random().toString(16).substring(2, 10),
          amount: String(currentPrice + 500),
          timestamp: new Date(Date.now() - 300000)
        },
        {
          id: '2',
          bidder: '0x' + Math.random().toString(16).substring(2, 10),
          amount: String(currentPrice + 1000),
          timestamp: new Date(Date.now() - 180000)
        },
        {
          id: '3',
          bidder: '0x' + Math.random().toString(16).substring(2, 10),
          amount: String(currentPrice + 1500),
          timestamp: new Date(Date.now() - 60000)
        },
      ]
      setBids(mockBids)
      setBidAmount(String(minimumBid + 100))
    }
  }, [open])

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount)
    if (amount < minimumBid) {
      alert(`Bid must be at least ₹${Math.round(minimumBid).toLocaleString('en-IN')}`)
      return
    }

    setIsPlacingBid(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newBid: Bid = {
        id: String(bids.length + 1),
        bidder: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        amount: bidAmount,
        timestamp: new Date()
      }
      
      setBids([...bids, newBid])
      onBidPlaced(bidAmount)
      
      setTimeout(() => {
        onOpenChange(false)
      }, 1500)
    } catch (error) {
      console.error('Failed to place bid:', error)
    } finally {
      setIsPlacingBid(false)
    }
  }

  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-primary" />
            Place Your Bid
          </DialogTitle>
          <DialogDescription>
            Compete with other buyers for this ticket
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Listing Details */}
          <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">{listing.event?.title}</h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>{listing.event?.date ? formatEventDate(new Date(listing.event.date)) : 'TBA'}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">{listing.ticketType}</Badge>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-sm text-muted-foreground">Starting Price</span>
                <span className="font-bold text-lg text-primary">₹{Math.round(parseFloat(listing.price)).toLocaleString('en-IN')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Current Highest Bid */}
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-600">Current Highest Bid</p>
                    <p className="text-xs text-muted-foreground">{bids.length} total bids</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(highestBid).toLocaleString('en-IN')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Your Bid Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="bid">Your Bid Amount</Label>
              <span className="text-xs text-muted-foreground">Min: ₹{Math.round(minimumBid).toLocaleString('en-IN')}</span>
            </div>
            <div className="relative">
              <Input
                id="bid"
                type="number"
                step="100"
                min={minimumBid}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="text-lg font-semibold pr-16"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                INR
              </span>
            </div>

            {/* Quick Bid Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidAmount(String(minimumBid))}
              >
                Min
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidAmount(String(minimumBid + 500))}
              >
                +₹500
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidAmount(String(minimumBid + 1000))}
              >
                +₹1000
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidAmount(String(minimumBid + 1500))}
              >
                +₹1500
              </Button>
            </div>
          </div>

          {/* Bid History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Recent Bids</Label>
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
            <Card>
              <CardContent className="p-3 max-h-40 overflow-y-auto">
                {bids.length > 0 ? (
                  <div className="space-y-2">
                    {bids.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between py-2 border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <code className="text-xs font-mono">{bid.bidder.substring(0, 10)}...</code>
                            <p className="text-xs text-muted-foreground">{timeAgo(bid.timestamp)}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-green-600">₹{Math.round(parseFloat(bid.amount)).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-center text-muted-foreground py-4">No bids yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Warning */}
          {parseFloat(bidAmount) < minimumBid && bidAmount !== '' && (
            <Card className="bg-orange-500/10 border-orange-500/20">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <p className="text-xs text-orange-600">
                    Your bid must be higher than the current highest bid
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={handlePlaceBid}
              disabled={isPlacingBid || !bidAmount || parseFloat(bidAmount) < minimumBid}
            >
              {isPlacingBid ? 'Placing Bid...' : `Place Bid ${bidAmount ? `(₹${bidAmount})` : ''}`}
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
