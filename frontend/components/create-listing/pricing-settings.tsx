"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, Clock, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ListingFormData } from "./listing-creation-wizard"

interface PricingSettingsProps {
  formData: ListingFormData
  updateFormData: (updates: Partial<ListingFormData>) => void
  onNext: () => void
  onPrev: () => void
}

const auctionDurations = [
  { value: "1", label: "1 Day" },
  { value: "3", label: "3 Days" },
  { value: "7", label: "7 Days" },
  { value: "14", label: "14 Days" },
  { value: "30", label: "30 Days" }
]

export function PricingSettings({ formData, updateFormData, onNext, onPrev }: PricingSettingsProps) {
  const originalPrice = formData.selectedTicket?.originalPrice || "₹0"
  const originalPriceNumber = parseFloat(originalPrice.replace(/[^\d.]/g, ""))
  const salePriceNumber = parseFloat((formData.salePrice || "0").replace(/[^\d.]/g, ""))
  const minimumPriceNumber = parseFloat((formData.minimumPrice || "0").replace(/[^\d.]/g, ""))

  const profitMargin = salePriceNumber > originalPriceNumber 
    ? ((salePriceNumber - originalPriceNumber) / originalPriceNumber * 100).toFixed(1)
    : "0"

  const platformFee = Math.round(salePriceNumber * 0.025) // 2.5% platform fee
  const royaltyFee = Math.round(salePriceNumber * (parseFloat(formData.royaltyPercentage) / 100))
  const netReceived = salePriceNumber - platformFee - royaltyFee

  const canProceed = formData.salePrice !== "" && 
                    parseFloat(formData.salePrice) > 0 &&
                    (!formData.instantSale || parseFloat(formData.minimumPrice || "0") >= 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing & Sale Terms
        </CardTitle>
        <p className="text-muted-foreground">
          Set your price and configure how you want to sell your ticket
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Original Price Reference */}
        {formData.selectedTicket && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Original Purchase Price:</span>
              <Badge variant="outline" className="text-green-600">
                {originalPrice}
              </Badge>
            </div>
          </div>
        )}

        {/* Sale Type */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="instantSale">Sale Type</Label>
              <p className="text-xs text-muted-foreground">
                Choose between instant sale or auction
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="instantSale" className="text-sm">Auction</Label>
              <Switch
                id="instantSale"
                checked={formData.instantSale}
                onCheckedChange={(checked) => updateFormData({ instantSale: checked })}
              />
              <Label htmlFor="instantSale" className="text-sm">Instant Sale</Label>
            </div>
          </div>
        </div>

        {/* Pricing Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sale Price */}
          <div className="space-y-2">
            <Label htmlFor="salePrice">
              {formData.instantSale ? "Sale Price *" : "Starting Bid *"}
            </Label>
            <div className="relative">
              <Input
                id="salePrice"
                type="number"
                step="100"
                placeholder="0"
                value={formData.salePrice}
                onChange={(e) => updateFormData({ salePrice: e.target.value })}
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
            </div>
            {salePriceNumber > originalPriceNumber && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +{profitMargin}% profit margin
              </p>
            )}
          </div>

          {/* Minimum Price (for auctions) */}
          {!formData.instantSale && (
            <div className="space-y-2">
              <Label htmlFor="minimumPrice">Reserve Price (Optional)</Label>
              <div className="relative">
                <Input
                  id="minimumPrice"
                  type="number"
                  step="100"
                  placeholder="0"
                  value={formData.minimumPrice}
                  onChange={(e) => updateFormData({ minimumPrice: e.target.value })}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  ₹
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum price you'll accept
              </p>
            </div>
          )}
        </div>

        {/* Auction Duration (for auctions) */}
        {!formData.instantSale && (
          <div className="space-y-2">
            <Label htmlFor="auctionDuration">Auction Duration</Label>
            <Select 
              value={formData.auctionDuration} 
              onValueChange={(value) => updateFormData({ auctionDuration: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {auctionDurations.map((duration) => (
                  <SelectItem key={duration.value} value={duration.value}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {duration.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Royalty Settings */}
        <div className="space-y-2">
          <Label htmlFor="royaltyPercentage">Creator Royalty (%)</Label>
          <Input
            id="royaltyPercentage"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.royaltyPercentage}
            onChange={(e) => updateFormData({ royaltyPercentage: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Percentage paid to the original event creator (0-10%)
          </p>
        </div>

        {/* Fee Breakdown */}
  {formData.salePrice && parseFloat(formData.salePrice.replace(/[^\d.]/g, "")) > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h4 className="font-medium">Fee Breakdown:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sale Price:</span>
                    <span>₹{Math.round(salePriceNumber).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Fee (2.5%):</span>
                    <span>-₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Creator Royalty ({formData.royaltyPercentage}%):</span>
                    <span>-₹{royaltyFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>You Receive:</span>
                    <span className="text-green-600">₹{netReceived.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!canProceed}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
