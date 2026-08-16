"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatINR } from "@/lib/utils"
import {
  CATEGORY_OPTIONS,
  LOCATION_OPTIONS,
  TICKET_TYPE_OPTIONS,
  PRICE_CEILING,
  PRICE_FLOOR,
  defaultMarketplaceFilters,
  isDefaultFilters,
  type MarketplaceFilterState,
} from "@/lib/filters"

interface MarketplaceFiltersProps {
  filters: MarketplaceFilterState
  setFilters: (filters: MarketplaceFilterState) => void
}

type ListKey = "categories" | "types" | "locations"

export function MarketplaceFilters({ filters, setFilters }: MarketplaceFiltersProps) {
  const [draft, setDraft] = useState<MarketplaceFilterState>(filters)

  // Keep the draft aligned when the parent resets filters elsewhere.
  useEffect(() => setDraft(filters), [filters])

  const toggle = (key: ListKey, value: string) => {
    setDraft(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }))
  }

  const activeCount =
    draft.categories.length +
    draft.types.length +
    draft.locations.length +
    (draft.price[0] !== PRICE_FLOOR || draft.price[1] !== PRICE_CEILING ? 1 : 0)

  const dirty = JSON.stringify(draft) !== JSON.stringify(filters)

  const groups: { label: string; key: ListKey; options: readonly string[] }[] = [
    { label: "Category", key: "categories", options: CATEGORY_OPTIONS },
    { label: "Ticket type", key: "types", options: TICKET_TYPE_OPTIONS },
    { label: "City", key: "locations", options: LOCATION_OPTIONS },
  ]

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          {activeCount > 0 && <Badge variant="secondary">{activeCount}</Badge>}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-3">
          <Label>Price range</Label>
          <Slider
            value={draft.price}
            onValueChange={value => setDraft(prev => ({ ...prev, price: [value[0], value[1]] }))}
            min={PRICE_FLOOR}
            max={PRICE_CEILING}
            step={500}
            minStepsBetweenThumbs={1}
            aria-label="Price range"
          />
          <div className="flex justify-between text-sm font-medium tabular-nums">
            <span>{formatINR(draft.price[0])}</span>
            <span>
              {draft.price[1] >= PRICE_CEILING ? `${formatINR(PRICE_CEILING)}+` : formatINR(draft.price[1])}
            </span>
          </div>
        </div>

        {groups.map(group => (
          <div key={group.key} className="space-y-3">
            <Separator />
            <Label>{group.label}</Label>
            <div className="space-y-2.5">
              {group.options.map(option => {
                const id = `${group.key}-${option}`
                return (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      checked={draft[group.key].includes(option)}
                      onCheckedChange={() => toggle(group.key, option)}
                    />
                    <Label htmlFor={id} className="text-sm font-normal cursor-pointer">
                      {option}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-1">
          <Button className="w-full" onClick={() => setFilters(draft)} disabled={!dirty}>
            {dirty ? "Apply filters" : "Filters applied"}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            disabled={isDefaultFilters(draft) && isDefaultFilters(filters)}
            onClick={() => {
              const reset = defaultMarketplaceFilters()
              setDraft(reset)
              setFilters(reset)
            }}
          >
            Clear all
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
