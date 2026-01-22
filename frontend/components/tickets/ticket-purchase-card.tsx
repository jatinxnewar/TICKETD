"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Wallet, CheckCircle2, AlertCircle } from "lucide-react"
import { Event, ticketsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { TransactionModal } from "@/components/transactions/transaction-modal"

interface TicketPurchaseCardProps {
  event: Event
}

export function TicketPurchaseCard({ event }: TicketPurchaseCardProps) {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const selectedTicketType = selectedTicket !== null ? event.ticketTypes[selectedTicket] : null
  const totalPrice = selectedTicketType ? (parseFloat(selectedTicketType.price) * quantity).toLocaleString('en-IN') : "0"

  const handlePurchase = async () => {
    // Open the transaction modal instead of direct purchase
    setShowTransactionModal(true)
  }

  const handleTransactionSuccess = async (txHash: string, tokenId: string) => {
    if (!selectedTicketType) return
    
    // Mock wallet address - in production this would come from wallet connection
    const mockWalletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

    try {
      const purchasePromises = []
      for (let i = 0; i < quantity; i++) {
        purchasePromises.push(
          ticketsApi.purchase({
            eventId: event._id,
            owner: mockWalletAddress,
            ticketType: selectedTicketType.name,
            price: selectedTicketType.price,
          })
        )
      }

      await Promise.all(purchasePromises)

      toast({
        title: "🎉 Purchase Successful!",
        description: `Your NFT ticket ${tokenId} has been added to your wallet`,
      })

      // Redirect to dashboard after short delay
      setTimeout(() => {
        setShowTransactionModal(false)
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Purchase failed:', error)
    }
  }

  return (
    <Card className="sticky top-24 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardTitle className="flex items-center justify-between">
          <span>Select Tickets</span>
          <ShoppingCart className="h-5 w-5" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {event.ticketTypes && event.ticketTypes.length > 0 ? (
          event.ticketTypes.map((ticket, index) => {
            const isAvailable = (ticket.available || 0) > 0
            const soldOut = !isAvailable
            const almostSoldOut = isAvailable && (ticket.available || 0) < (ticket.quantity || 0) * 0.2

            return (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTicket === index
                    ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                    : soldOut
                    ? "border-border bg-secondary/20 cursor-not-allowed opacity-60"
                    : "border-border hover:border-primary/50 hover:shadow-sm"
                }`}
                onClick={() => !soldOut && setSelectedTicket(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      {ticket.name}
                      {selectedTicket === index && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </h4>
                    {almostSoldOut && !soldOut && (
                      <Badge variant="destructive" className="mt-1 text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Almost Sold Out
                      </Badge>
                    )}
                    {soldOut && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Sold Out
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-primary">₹{parseFloat(ticket.price).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-border/50">
                  <span className="text-muted-foreground">Available:</span>
                  <span className={`font-medium ${soldOut ? 'text-destructive' : almostSoldOut ? 'text-orange-500' : 'text-green-600'}`}>
                    {ticket.available} / {ticket.quantity}
                  </span>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No tickets available</p>
          </div>
        )}

        {selectedTicket !== null && selectedTicketType && (
          <div className="space-y-4 pt-4 border-t-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-9 w-9 p-0"
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(selectedTicketType.available || 1, quantity + 1))}
                  disabled={quantity >= (selectedTicketType.available || 1)}
                  className="h-9 w-9 p-0"
                >
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per ticket:</span>
                <span className="font-medium">₹{parseFloat(selectedTicketType.price).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">×{quantity}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-2xl text-primary">₹{totalPrice}</span>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base font-semibold"
              size="lg"
              onClick={handlePurchase}
              disabled={isPurchasing}
            >
              <Wallet className="h-5 w-5 mr-2" />
              Purchase {quantity} Ticket{quantity > 1 ? 's' : ''}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By purchasing, you agree to our terms and conditions
            </p>
          </div>
        )}

        {/* Transaction Modal */}
        {selectedTicketType && (
          <TransactionModal
            open={showTransactionModal}
            onOpenChange={setShowTransactionModal}
            eventTitle={event.title}
            ticketType={selectedTicketType.name}
            price={selectedTicketType.price}
            onSuccess={handleTransactionSuccess}
          />
        )}
      </CardContent>
    </Card>
  )
}
