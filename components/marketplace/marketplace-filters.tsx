"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { useState } from "react"

const CATEGORY_OPTIONS = ["Music", "Festival", "Comedy", "Concert", "Education"];
const LOCATION_OPTIONS = ["Mumbai", "Delhi", "Goa", "Bangalore", "Ahmedabad"];
const TICKET_TYPE_OPTIONS = ["General", "VIP"];

export function MarketplaceFilters({ filters, setFilters, onApply }: any) {
  const [localFilters, setLocalFilters] = useState(filters || {
    price: [0, 10000],
    categories: [],
    types: [],
    locations: [],
  });

  const handleCheckbox = (key: string, value: string) => {
    setLocalFilters((prev: any) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value],
      };
    });
  };

  const handlePrice = (val: number[]) => {
    setLocalFilters((prev: any) => ({ ...prev, price: val }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    if (onApply) onApply(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({ price: [0, 10000], categories: [], types: [], locations: [] });
    setFilters({ price: [0, 10000], categories: [], types: [], locations: [] });
    if (onApply) onApply({ price: [0, 10000], categories: [], types: [], locations: [] });
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range (INR)</Label>
          <Slider value={localFilters.price} onValueChange={handlePrice} max={10000} min={0} step={100} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹0</span>
            <span>₹10,000</span>
          </div>
        </div>
        <Separator />
        {/* Event Categories */}
        <div className="space-y-3">
          <Label>Categories</Label>
          <div className="space-y-2">
            {CATEGORY_OPTIONS.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} checked={localFilters.categories.includes(category)} onCheckedChange={() => handleCheckbox("categories", category)} />
                <Label htmlFor={category} className="text-sm">{category}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        {/* Ticket Type */}
        <div className="space-y-3">
          <Label>Ticket Type</Label>
          <div className="space-y-2">
            {TICKET_TYPE_OPTIONS.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} checked={localFilters.types.includes(type)} onCheckedChange={() => handleCheckbox("types", type)} />
                <Label htmlFor={type} className="text-sm">{type}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        {/* Location */}
        <div className="space-y-3">
          <Label>Location</Label>
          <div className="space-y-2">
            {LOCATION_OPTIONS.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={location} checked={localFilters.locations.includes(location)} onCheckedChange={() => handleCheckbox("locations", location)} />
                <Label htmlFor={location} className="text-sm">{location}</Label>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full" onClick={handleApply}>Apply Filters</Button>
        <Button variant="outline" className="w-full bg-transparent" onClick={handleClear}>Clear All</Button>
      </CardContent>
    </Card>
  )
}
