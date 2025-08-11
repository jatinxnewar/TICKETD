"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export function EventFilters() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Categories */}
        <div className="space-y-3">
          <Label>Categories</Label>
          <div className="space-y-2">
            {["Technology", "Art", "Gaming", "Education", "Music", "Sports", "Business"].map((category) => (
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-3">
          <Label>Location</Label>
          <div className="space-y-2">
            {["Online", "San Francisco", "New York", "Los Angeles", "Chicago", "Austin"].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={location} />
                <Label htmlFor={location} className="text-sm">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="space-y-2">
            {["Free", "0-0.05 ETH", "0.05-0.1 ETH", "0.1-0.2 ETH", "0.2+ ETH"].map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox id={range} />
                <Label htmlFor={range} className="text-sm">
                  {range}
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
