"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Eye, Calendar, MapPin, Tag, DollarSign, Clock, Ticket, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { ListingFormData } from "./listing-creation-wizard"
import { useRouter } from "next/navigation"

interface ReviewAndPublishProps {
  formData: ListingFormData
  onPrev: () => void
}

export function ReviewAndPublish({ formData, onPrev }: ReviewAndPublishProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const router = useRouter()

  const handlePublish = async () => {
    setIsPublishing(true)
    try {
      // Prepare payload for API
      const payload = {
        ...formData,
        userId: "0x1234...abcd" // TODO: Replace with real user ID from wallet or session
      }
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error("Failed to create listing")
      setIsPublished(true)
      setTimeout(() => {
        router.push("/marketplace")
      }, 2000)
    } catch (error) {
      console.error("Error publishing listing:", error)
      alert("Failed to publish listing. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }

  const platformFee = (parseFloat(formData.salePrice) * 0.025).toFixed(4)
  const royaltyFee = (parseFloat(formData.salePrice) * (parseFloat(formData.royaltyPercentage) / 100)).toFixed(4)
  const netReceived = (parseFloat(formData.salePrice) - parseFloat(platformFee) - parseFloat(royaltyFee)).toFixed(4)

  if (isPublished) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Listing Published Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Your ticket is now live on the marketplace. Redirecting you to view your listing...
          </p>
          <div className="space-y-2">
            <Button onClick={() => router.push("/marketplace")} className="mr-2">
              View in Marketplace
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Listing Preview
          </CardTitle>
          <p className="text-muted-foreground">
            This is how your listing will appear to buyers
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Image */}
              <div className="relative">
                <Image
                  src={formData.selectedTicket?.image || "/placeholder.svg"}
                  alt={formData.listingTitle}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover rounded-md"
                />
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {formData.selectedTicket?.ticketType}
                </Badge>
                {!formData.instantSale && (
                  <Badge variant="destructive" className="absolute top-2 left-2">
                    <Clock className="h-3 w-3 mr-1" />
                    Auction
                  </Badge>
                )}
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{formData.listingTitle}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatEventDate(formData.selectedTicket?.date || "")} at {formData.selectedTicket?.time}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {formData.selectedTicket?.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{formData.category}</Badge>
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{formData.salePrice} ETH</div>
                    {!formData.instantSale && formData.minimumPrice && (
                      <div className="text-xs text-muted-foreground">
                        Reserve: {formData.minimumPrice} ETH
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Listing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Ticket Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event:</span>
                  <span>{formData.selectedTicket?.eventTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{formData.selectedTicket?.ticketType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span>{formData.selectedTicket?.originalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition:</span>
                  <span className="capitalize">{formData.condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transfer Method:</span>
                  <span className="capitalize">{formData.transferMethod.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sale Type:</span>
                  <span>{formData.instantSale ? "Instant Sale" : "Auction"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formData.instantSale ? "Price:" : "Starting Bid:"}
                  </span>
                  <span>{formData.salePrice} ETH</span>
                </div>
                {!formData.instantSale && formData.minimumPrice && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reserve Price:</span>
                    <span>{formData.minimumPrice} ETH</span>
                  </div>
                )}
                {!formData.instantSale && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{formData.auctionDuration} days</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creator Royalty:</span>
                  <span>{formData.royaltyPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Fee Breakdown */}
          <div className="space-y-2">
            <h4 className="font-medium">Expected Earnings</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Sale Price:</span>
                <span>{formData.salePrice} ETH</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Platform Fee (2.5%):</span>
                <span>-{platformFee} ETH</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Creator Royalty ({formData.royaltyPercentage}%):</span>
                <span>-{royaltyFee} ETH</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>You will receive:</span>
                <span className="text-green-600">{netReceived} ETH</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <h4 className="font-medium">Important Terms:</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Once published, this listing cannot be cancelled if there are active bids</li>
              <li>You are responsible for transferring the ticket to the buyer upon sale</li>
              <li>Platform fees are deducted automatically from the sale price</li>
              <li>False listings or fraudulent activity will result in account suspension</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isPublishing}>
          Previous
        </Button>
        <Button 
          onClick={handlePublish} 
          disabled={isPublishing}
          className="min-w-[140px]"
        >
          {isPublishing ? "Publishing..." : "Publish Listing"}
        </Button>
      </div>
    </div>
  )
}
