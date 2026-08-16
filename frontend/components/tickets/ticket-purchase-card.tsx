"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, CheckCircle2, AlertCircle } from "lucide-react"
import { Event, ticketsApi } from "@/lib/api"
import { CURRENT_USER_ID } from "@/lib/user"
import { formatINR } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { TransactionModal } from "@/components/transactions/transaction-modal"

/** Per-order cap, mirroring the "max per transaction" rule shown at checkout. */
const MAX_PER_ORDER = 10

interface TicketPurchaseCardProps {
  event: Event
}

export function TicketPurchaseCard({ event }: TicketPurchaseCardProps) {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const selectedTicketType = selectedTicket !== null ? event.ticketTypes[selectedTicket] : null
  const maxQuantity = selectedTicketType
    ? Math.max(1, Math.min(selectedTicketType.available || 0, MAX_PER_ORDER))
    : 1
  const totalPrice = selectedTicketType ? (parseFloat(selectedTicketType.price) || 0) * quantity : 0

  // Re-clamp quantity on tier change: moving from a tier with 50 left to one
  // with 2 left must not carry the larger quantity over.
  const selectTier = (index: number) => {
    const tier = event.ticketTypes[index]
    if (!tier || (tier.available || 0) <= 0) return
    setSelectedTicket(index)
    setQuantity(q => Math.min(q, Math.max(1, Math.min(tier.available, MAX_PER_ORDER))))
  }

  const handleTransactionSuccess = async () => {
    if (!selectedTicketType) return

    // Sequential, not Promise.all: each purchase decrements availability, and a
    // parallel batch could slip past the sold-out guard.
    for (let i = 0; i < quantity; i++) {
      await ticketsApi.purchase({
        eventId: event._id,
        owner: CURRENT_USER_ID,
        ticketType: selectedTicketType.name,
        price: selectedTicketType.price,
      })
    }

    toast({
      title: "Purchase confirmed",
      description: `${quantity} ${selectedTicketType.name} ticket${quantity > 1 ? "s" : ""} added to your account.`,
    })

    setShowTransactionModal(false)
    router.push("/dashboard")
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <span>Select tickets</span>
          <ShoppingCart className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 sm:p-5">
        {event.ticketTypes && event.ticketTypes.length > 0 ? (
          event.ticketTypes.map((ticket, index) => {
            const isAvailable = (ticket.available || 0) > 0
            const soldOut = !isAvailable
            const almostSoldOut = isAvailable && (ticket.available || 0) < (ticket.quantity || 0) * 0.2

            return (
              <button
                key={index}
                type="button"
                disabled={soldOut}
                aria-pressed={selectedTicket === index}
                className={`w-full text-left p-4 border-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  selectedTicket === index
                    ? "border-primary bg-primary/5"
                    : soldOut
                    ? "border-border bg-muted/40 opacity-60 cursor-not-allowed"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => selectTier(index)}
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <span className="truncate">{ticket.name}</span>
                      {selectedTicket === index && (
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                      )}
                    </h4>
                    {soldOut ? (
                      <Badge variant="secondary" className="mt-1.5 text-xs">
                        Sold out
                      </Badge>
                    ) : almostSoldOut ? (
                      <Badge variant="destructive" className="mt-1.5 text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" aria-hidden="true" />
                        Almost sold out
                      </Badge>
                    ) : null}
                  </div>
                  <span className="font-bold text-lg text-primary tabular-nums flex-shrink-0">
                    {formatINR(ticket.price)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-border/50">
                  <span className="text-muted-foreground">Available</span>
                  <span
                    className={`font-medium tabular-nums ${
                      soldOut ? "text-destructive" : almostSoldOut ? "text-warning" : "text-success"
                    }`}
                  >
                    {(ticket.available || 0).toLocaleString("en-IN")} left
                  </span>
                </div>
              </button>
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
              <span className="font-medium">Quantity</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="h-9 w-9 p-0"
                  aria-label="Decrease quantity"
                >
                  −
                </Button>
                <span className="w-10 text-center font-semibold text-lg tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(q => Math.min(maxQuantity, q + 1))}
                  disabled={quantity >= maxQuantity}
                  className="h-9 w-9 p-0"
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
            </div>
            {quantity >= maxQuantity && (
              <p className="text-xs text-muted-foreground text-right -mt-2">
                {maxQuantity === MAX_PER_ORDER
                  ? `Maximum ${MAX_PER_ORDER} tickets per order`
                  : "That's all the tickets left in this tier"}
              </p>
            )}

            <Separator />

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per ticket</span>
                <span className="font-medium tabular-nums">{formatINR(selectedTicketType.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantity</span>
                <span className="font-medium tabular-nums">× {quantity}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary tabular-nums">{formatINR(totalPrice)}</span>
              </div>
            </div>

            <Button
              className="w-full h-12 text-base font-semibold"
              size="lg"
              onClick={() => setShowTransactionModal(true)}
            >
              <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
              Buy {quantity} ticket{quantity > 1 ? "s" : ""}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By purchasing, you agree to our terms and conditions.
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
            quantity={quantity}
            onSuccess={handleTransactionSuccess}
          />
        )}
      </CardContent>
    </Card>
  )
}
