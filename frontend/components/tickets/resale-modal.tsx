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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useWeb3 } from "@/components/web3-provider"
import { useTicketNFT } from "@/lib/contracts"
import { Loader2, CheckCircle2, XCircle, ExternalLink, TrendingUp, AlertTriangle } from "lucide-react"
import { getExplorerUrl, formatTxHash } from "@/lib/web3-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ResaleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: {
    tokenId: string
    eventTitle: string
    ticketType: string
    originalPrice: string
    eventDate: string
  }
  onSuccess?: (txHash: string) => void
}

export function ResaleModal({
  open,
  onOpenChange,
  ticket,
  onSuccess,
}: ResaleModalProps) {
  const { account, isConnected, chainId } = useWeb3()
  const { resellTicket, isLoading, txHash } = useTicketNFT()
  const [resaleStep, setResaleStep] = useState<"input" | "processing" | "success" | "error">("input")
  const [resalePrice, setResalePrice] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const originalPrice = parseFloat(ticket.originalPrice.replace(" ETH", "").replace("₹", "").replace(/,/g, ""))
  const suggestedPrice = Math.round(originalPrice * 0.9)
  const platformFee = resalePrice ? Math.round(parseFloat(resalePrice) * 0.025) : 0
  const youReceive = resalePrice ? Math.round(parseFloat(resalePrice) * 0.975) : 0

  const handleList = async () => {
    if (!resalePrice || parseFloat(resalePrice) <= 0) {
      setErrorMessage("Please enter a valid price")
      return
    }

    if (parseFloat(resalePrice) > originalPrice * 1.5) {
      setErrorMessage("Price cannot exceed 150% of original price")
      return
    }

    try {
      setResaleStep("processing")
      setErrorMessage("")

      // Call smart contract to list ticket for resale
      const receipt = await resellTicket(
        parseInt(ticket.tokenId.replace("#", "")),
        resalePrice
      )

      // Update local storage
      const tickets = JSON.parse(localStorage.getItem("userTickets") || "[]")
      const updatedTickets = tickets.map((t: any) =>
        t.tokenId === ticket.tokenId
          ? { ...t, status: "listed", resalePrice, listedAt: new Date().toISOString() }
          : t
      )
      localStorage.setItem("userTickets", JSON.stringify(updatedTickets))

      setResaleStep("success")

      if (onSuccess && txHash) {
        onSuccess(txHash)
      }

      // Auto-close after 3 seconds
      setTimeout(() => {
        onOpenChange(false)
        setResaleStep("input")
        setResalePrice("")
      }, 3000)
    } catch (err: any) {
      console.error("Listing failed:", err)
      setErrorMessage(err?.message || "Failed to list ticket for resale")
      setResaleStep("error")
    }
  }

  const handleClose = () => {
    if (resaleStep === "processing") return
    onOpenChange(false)
    setTimeout(() => {
      setResaleStep("input")
      setResalePrice("")
      setErrorMessage("")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {resaleStep === "input" && "List Ticket for Resale"}
            {resaleStep === "processing" && "Listing Ticket"}
            {resaleStep === "success" && "Ticket Listed!"}
            {resaleStep === "error" && "Listing Failed"}
          </DialogTitle>
          <DialogDescription>
            {resaleStep === "input" && "Set your price and list your ticket on the marketplace"}
            {resaleStep === "processing" && "Processing your listing..."}
            {resaleStep === "success" && "Your ticket is now listed on the marketplace"}
            {resaleStep === "error" && "There was an error listing your ticket"}
          </DialogDescription>
        </DialogHeader>

        {resaleStep === "input" && (
          <div className="space-y-4">
            {/* Ticket Info */}
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Event</p>
                <p className="font-medium">{ticket.eventTitle}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Type</p>
                  <p className="font-medium">{ticket.ticketType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Original Price</p>
                  <p className="font-medium">{ticket.originalPrice}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Input */}
            <div className="space-y-2">
              <Label htmlFor="resalePrice">Resale Price (INR)</Label>
              <Input
                id="resalePrice"
                type="number"
                step="100"
                placeholder="0"
                value={resalePrice}
                onChange={(e) => {
                  setResalePrice(e.target.value)
                  setErrorMessage("")
                }}
              />
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">Suggested price:</p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => setResalePrice(String(suggestedPrice))}
                >
                  ₹{suggestedPrice.toLocaleString('en-IN')}
                </Button>
              </div>
            </div>

            {/* Price Warning */}
            {resalePrice && parseFloat(resalePrice) > originalPrice * 1.2 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  High markup may reduce buyer interest
                </AlertDescription>
              </Alert>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Price Breakdown */}
            {resalePrice && parseFloat(resalePrice) > 0 && (
              <div className="p-3 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Listing Price</span>
                  <span>₹{Math.round(parseFloat(resalePrice)).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Platform Fee (2.5%)</span>
                  <span>-₹{platformFee.toLocaleString('en-IN')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>You Receive</span>
                  <span className="text-green-600 dark:text-green-400">₹{youReceive.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 mt-0.5 text-primary" />
                <div className="text-sm space-y-1">
                  <p className="font-medium">Listing Benefits</p>
                  <ul className="text-muted-foreground space-y-0.5">
                    <li>• Instant sale when buyer purchases</li>
                    <li>• Automatic transfer to buyer's wallet</li>
                    <li>• Payment sent directly to your wallet</li>
                    <li>• Cancel listing anytime before sale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {resaleStep === "processing" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="font-medium">Listing your ticket...</p>
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

        {resaleStep === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Ticket Listed!</p>
              <p className="text-sm text-muted-foreground">
                Your ticket is now available on the marketplace
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

        {resaleStep === "error" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">Listing Failed</p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
            </div>
          </div>
        )}

        <DialogFooter>
          {resaleStep === "input" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleList}
                disabled={!resalePrice || parseFloat(resalePrice) <= 0 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Listing...
                  </>
                ) : (
                  "List for Sale"
                )}
              </Button>
            </>
          )}

          {resaleStep === "error" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleList}>Try Again</Button>
            </>
          )}

          {resaleStep === "success" && (
            <Button onClick={handleClose} className="w-full">
              View Marketplace
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
