"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EventSettingsProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function EventSettings({ data, updateData, onNext, onPrevious }: EventSettingsProps) {
  const [settings, setSettings] = useState({
    saleStartDate: data.saleStartDate || "",
    saleEndDate: data.saleEndDate || "",
    maxTicketsPerTransaction: data.maxTicketsPerTransaction || 10,
    requireWhitelist: data.requireWhitelist || false,
    enableWaitlist: data.enableWaitlist || false,
    refundPolicy: data.refundPolicy || "no-refund",
    eventVisibility: data.eventVisibility || "public",
    socialLinks: data.socialLinks || {
      website: "",
      twitter: "",
      discord: "",
      telegram: "",
    },
    additionalInfo: data.additionalInfo || "",
    ageRestriction: data.ageRestriction || "none",
    dressCode: data.dressCode || "",
    specialInstructions: data.specialInstructions || "",
    ...data,
  })

  const handleInputChange = (field: string, value: any) => {
    const newSettings = { ...settings, [field]: value }
    setSettings(newSettings)
    updateData(newSettings)
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    const newSocialLinks = { ...settings.socialLinks, [platform]: value }
    const newSettings = { ...settings, socialLinks: newSocialLinks }
    setSettings(newSettings)
    updateData(newSettings)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Event Settings</h2>
        <p className="text-muted-foreground">Configure advanced settings for your event</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sale Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Sale Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="saleStartDate">Sale Start Date & Time</Label>
              <Input
                id="saleStartDate"
                type="datetime-local"
                value={settings.saleStartDate}
                onChange={(e) => handleInputChange("saleStartDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="saleEndDate">Sale End Date & Time</Label>
              <Input
                id="saleEndDate"
                type="datetime-local"
                value={settings.saleEndDate}
                onChange={(e) => handleInputChange("saleEndDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTickets">Max Tickets per Transaction</Label>
              <Input
                id="maxTickets"
                type="number"
                min="1"
                max="50"
                value={settings.maxTicketsPerTransaction}
                onChange={(e) => handleInputChange("maxTicketsPerTransaction", Number.parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Access Control */}
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Whitelist</Label>
                <p className="text-sm text-muted-foreground">Only whitelisted addresses can purchase tickets</p>
              </div>
              <Switch
                checked={settings.requireWhitelist}
                onCheckedChange={(checked) => handleInputChange("requireWhitelist", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Waitlist</Label>
                <p className="text-sm text-muted-foreground">Allow users to join waitlist when sold out</p>
              </div>
              <Switch
                checked={settings.enableWaitlist}
                onCheckedChange={(checked) => handleInputChange("enableWaitlist", checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">Event Visibility</Label>
              <Select
                value={settings.eventVisibility}
                onValueChange={(value) => handleInputChange("eventVisibility", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="unlisted">Unlisted</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Refund Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Refund Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Refund Policy</Label>
              <Select value={settings.refundPolicy} onValueChange={(value) => handleInputChange("refundPolicy", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-refund">No Refunds</SelectItem>
                  <SelectItem value="full-refund-24h">Full refund within 24 hours</SelectItem>
                  <SelectItem value="full-refund-7d">Full refund within 7 days</SelectItem>
                  <SelectItem value="partial-refund">Partial refund (minus fees)</SelectItem>
                  <SelectItem value="custom">Custom policy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={settings.socialLinks.website}
                onChange={(e) => handleSocialLinkChange("website", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="@yourusername"
                value={settings.socialLinks.twitter}
                onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                placeholder="Discord invite link"
                value={settings.socialLinks.discord}
                onChange={(e) => handleSocialLinkChange("discord", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="Telegram group link"
                value={settings.socialLinks.telegram}
                onChange={(e) => handleSocialLinkChange("telegram", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ageRestriction">Age Restriction</Label>
              <Select
                value={settings.ageRestriction}
                onValueChange={(value) => handleInputChange("ageRestriction", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No restriction</SelectItem>
                  <SelectItem value="18+">18+ only</SelectItem>
                  <SelectItem value="21+">21+ only</SelectItem>
                  <SelectItem value="all-ages">All ages welcome</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dressCode">Dress Code</Label>
              <Input
                id="dressCode"
                placeholder="e.g., Business casual, Formal"
                value={settings.dressCode}
                onChange={(e) => handleInputChange("dressCode", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Any special instructions for attendees..."
              value={settings.specialInstructions}
              onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any other important information..."
              value={settings.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next: Review & Deploy</Button>
      </div>
    </div>
  )
}
