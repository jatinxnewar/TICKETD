"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useWeb3 } from "@/components/web3-provider"
import { useTicketNFT } from "@/lib/contracts"
import { Loader2, CheckCircle2, XCircle, ExternalLink, Wallet } from "lucide-react"
import { getExplorerUrl, formatTxHash } from "@/lib/web3-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface TicketPurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: {
    id: string
    name: string
    description: string
    price: string
    available: number
  }
  eventId: string
  eventTitle: string
  onSuccess?: (txHash: string, tokenId: string) => void
}

export function TicketPurchaseModal({
  open,
  onOpenChange,
  ticket,
  eventId,
  eventTitle,
  onSuccess,
}: TicketPurchaseModalProps) {
  const { account, isConnected, connectWallet, chainId, balance } = useWeb3()
  const { mintTicket, isLoading, isSuccess, isError, error, txHash } = useTicketNFT()
  const [purchaseStep, setPurchaseStep] = useState<"confirm" | "processing" | "success" | "error">("confirm")

  const handlePurchase = async () => {
    if (!account) {
      await connectWallet()
      return
    }

    try {
      setPurchaseStep("processing")
      
      // Mint ticket - this calls the smart contract
      const receipt = await mintTicket(
        parseInt(eventId),
        account,
        ticket.price
      )

      // Extract token ID from receipt events (you'll need to parse this based on your contract)
      const tokenId = receipt?.logs?.[0]?.topics?.[3] || "0"
      
      setPurchaseStep("success")
      
      // Store purchase in local storage for quick access
      const purchases = JSON.parse(localStorage.getItem("userTickets") || "[]")
      purchases.push({
        tokenId,
        eventId,
        eventTitle,
        ticketType: ticket.name,
        price: ticket.price,
        purchaseDate: new Date().toISOString(),
        txHash,
        owner: account,
        status: "active",
      })
      localStorage.setItem("userTickets", JSON.stringify(purchases))

      // Call success callback
      if (onSuccess && txHash) {
        onSuccess(txHash, tokenId)
      }

      // Auto-close after 3 seconds
      setTimeout(() => {
        onOpenChange(false)
        setPurchaseStep("confirm")
      }, 3000)
    } catch (err: any) {
      console.error("Purchase failed:", err)
      setPurchaseStep("error")
    }
  }

  const handleClose = () => {
    if (purchaseStep === "processing") return // Don't close during transaction
    onOpenChange(false)
    setTimeout(() => setPurchaseStep("confirm"), 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {purchaseStep === "confirm" && "Purchase Ticket"}
            {purchaseStep === "processing" && "Processing Transaction"}
            {purchaseStep === "success" && "Purchase Successful!"}
            {purchaseStep === "error" && "Purchase Failed"}
          </DialogTitle>
          <DialogDescription>
            {purchaseStep === "confirm" && "Review and confirm your ticket purchase"}
            {purchaseStep === "processing" && "Please wait while we process your transaction..."}
            {purchaseStep === "success" && "Your ticket has been minted successfully!"}
            {purchaseStep === "error" && "There was an error processing your purchase"}
          </DialogDescription>
        </DialogHeader>

        {purchaseStep === "confirm" && (
          <div className="space-y-4">
            {/* Wallet Status */}
            {!isConnected && (
              <Alert>
                <Wallet className="h-4 w-4" />
                <AlertDescription>
                  Please connect your wallet to purchase tickets
                </AlertDescription>
              </Alert>
            )}

            {/* Event & Ticket Details */}
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Event</p>
                <p className="font-medium">{eventTitle}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Ticket Type</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{ticket.name}</p>
                  <Badge variant="secondary">{ticket.available} available</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ticket Price</span>
                <span>{ticket.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Platform Fee (2.5%)</span>
                <span>₹{Math.round(parseFloat(ticket.price) * 0.025).toLocaleString('en-IN')}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{Math.round(parseFloat(ticket.price) * 1.025).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Wallet Balance */}
            {isConnected && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Your Balance</span>
                  <span className="font-medium">₹{balance}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>After Purchase</span>
                  <span className={parseFloat(balance) - parseFloat(ticket.price) * 1.025 < 0 ? "text-red-500" : ""}>
                    ₹{Math.round(parseFloat(balance) - parseFloat(ticket.price) * 1.025).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Insufficient Balance Warning */}
            {isConnected && parseFloat(balance) < parseFloat(ticket.price) * 1.025 && (
              <Alert variant="destructive">
                <AlertDescription>
                  Insufficient balance. You need ₹{Math.round(parseFloat(ticket.price) * 1.025).toLocaleString('en-IN')}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {purchaseStep === "processing" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="font-medium">Waiting for confirmation...</p>
              <p className="text-sm text-muted-foreground">
                Please confirm the transaction in your wallet
              </p>
              {txHash && (
                <div className="pt-2">
                  <a
                    href={getExplorerUrl(chainId || 1, "tx", txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View on Explorer <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    TX: {formatTxHash(txHash)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {purchaseStep === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Ticket Purchased!</p>
              <p className="text-sm text-muted-foreground">
                Your NFT ticket has been minted to your wallet
              </p>
              {txHash && (
                <a
                  href={getExplorerUrl(chainId || 1, "tx", txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  View Transaction <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {purchaseStep === "error" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Transaction Failed</p>
              <p className="text-sm text-muted-foreground">
                {error?.message || "Something went wrong. Please try again."}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {purchaseStep === "confirm" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {!isConnected ? (
                <Button onClick={connectWallet}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  onClick={handlePurchase}
                  disabled={isLoading || parseFloat(balance) < parseFloat(ticket.price) * 1.025}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Purchase for ₹${Math.round(parseFloat(ticket.price) * 1.025).toLocaleString('en-IN')}`
                  )}
                </Button>
              )}
            </>
          )}

          {purchaseStep === "error" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handlePurchase}>Try Again</Button>
            </>
          )}

          {purchaseStep === "success" && (
            <Button onClick={handleClose} className="w-full">
              View My Tickets
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
