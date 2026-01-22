"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, TrendingUp, TrendingDown, Minus, ShoppingCart, Gavel } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { MarketplaceListing } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { TransactionModal } from "@/components/transactions/transaction-modal"
import { BiddingModal } from "@/components/marketplace/bidding-modal"

interface ListingCardProps {
  listing: MarketplaceListing
  onPurchase?: (listingId: string) => void
}

export function ListingCard({ listing, onPurchase }: ListingCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showBiddingModal, setShowBiddingModal] = useState(false)
  const { toast } = useToast()
  
  if (!listing.event) return null

  const event = listing.event
  const originalPrice = parseFloat(listing.originalPrice)
  const currentPrice = parseFloat(listing.price)
  const priceChange = currentPrice - originalPrice
  const priceChangePercent = ((priceChange / originalPrice) * 100).toFixed(1)
  
  const handlePurchase = async () => {
    setShowTransactionModal(true)
  }

  const handleTransactionSuccess = async (txHash: string, tokenId: string) => {
    try {
      if (onPurchase) {
        await onPurchase(listing._id)
      }
      toast({
        title: "🎉 Purchase Successful!",
        description: `Ticket ${tokenId} has been added to your wallet`,
      })
      setTimeout(() => {
        setShowTransactionModal(false)
        window.location.href = '/dashboard'
      }, 1500)
    } catch (error) {
      console.error('Purchase failed:', error)
    }
  }

  const handleBidPlaced = (amount: string) => {
    toast({
      title: "Bid Placed!",
      description: `Your bid of ₹${amount} has been placed`,
    })
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card">
      <div className="relative">
        <Image
          src={listing.eventImage || event.image || "/placeholder.jpg"}
          alt={listing.eventTitle || event.title}
          width={400}
          height={200}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <Badge variant="secondary" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
          {event.category}
        </Badge>
        
        {priceChange !== 0 && (
          <div className={`absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
            priceChange > 0 ? 'bg-red-500/90' : priceChange < 0 ? 'bg-green-500/90' : 'bg-gray-500/90'
          } text-white backdrop-blur-sm`}>
            {priceChange > 0 ? <TrendingUp className="h-3 w-3" /> : 
             priceChange < 0 ? <TrendingDown className="h-3 w-3" /> : 
             <Minus className="h-3 w-3" />}
            {priceChangePercent}%
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-lg line-clamp-1 drop-shadow-lg">
            {listing.eventTitle || event.title}
          </h3>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="space-y-2.5 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
            <span className="truncate">{formatEventDate(new Date(listing.eventDate || event.date))}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
            <span className="truncate">{event.location || event.venue}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 flex-shrink-0 text-primary" />
            <span className="truncate">
              {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
            </span>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Ticket Type</span>
            <Badge variant="outline" className="font-medium">
              {listing.ticketType}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center text-sm pt-2 border-t border-border/50">
            <span className="text-muted-foreground">Original Price:</span>
            <span className="line-through text-muted-foreground">₹{Math.round(originalPrice).toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Current Price:</span>
            <span className="text-primary">₹{Math.round(currentPrice).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="font-semibold" 
            onClick={handlePurchase}
            disabled={isPurchasing}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
          
          <Button
            variant="outline"
            className="font-semibold border-2 border-primary/50 hover:bg-primary/10"
            onClick={() => setShowBiddingModal(true)}
          >
            <Gavel className="h-4 w-4 mr-2" />
            Place Bid
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Listed {new Date(listing.listingDate).toLocaleDateString()}
        </p>
      </CardContent>

      {/* Transaction Modal */}
      <TransactionModal
        open={showTransactionModal}
        onOpenChange={setShowTransactionModal}
        eventTitle={event.title}
        ticketType={listing.ticketType || 'General Admission'}
        price={listing.price}
        onSuccess={handleTransactionSuccess}
      />

      {/* Bidding Modal */}
      <BiddingModal
        open={showBiddingModal}
        onOpenChange={setShowBiddingModal}
        listing={listing}
        onBidPlaced={handleBidPlaced}
      />
    </Card>
  )
}
