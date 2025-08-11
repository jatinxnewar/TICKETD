"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function MarketplaceFilters() {
  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range (ETH)</Label>
          <Slider defaultValue={[0, 1]} max={2} min={0} step={0.01} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 ETH</span>
            <span>2 ETH</span>
          </div>
        </div>

        <Separator />

        {/* Event Categories */}
        <div className="space-y-3">
          <Label>Categories</Label>
          <div className="space-y-2">
            {["Music", "Technology", "Art", "Gaming", "Education", "Sports"].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Event Date */}
        <div className="space-y-3">
          <Label>Event Date</Label>
          <div className="space-y-2">
            {["Today", "This Week", "This Month", "Next Month"].map((date) => (
              <div key={date} className="flex items-center space-x-2">
                <Checkbox id={date} />
                <Label htmlFor={date} className="text-sm">
                  {date}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Ticket Type */}
        <div className="space-y-3">
          <Label>Ticket Type</Label>
          <div className="space-y-2">
            {["General", "VIP", "Premium", "Early Bird"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <Label htmlFor={type} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-3">
          <Label>Location</Label>
          <div className="space-y-2">
            {["Online", "San Francisco", "New York", "Los Angeles", "Chicago"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={location} />
                <Label htmlFor={location} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full bg-transparent">
          Clear All
        </Button>
      </CardContent>
    </Card>
  )
}
