"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface EventFiltersProps {
  categories: string[]
  cities: string[]
  category: string
  city: string
  onCategoryChange: (value: string) => void
  onCityChange: (value: string) => void
  onClear: () => void
  canClear: boolean
}

export function EventFilters({
  categories,
  cities,
  category,
  city,
  onCategoryChange,
  onCityChange,
  onClear,
  canClear,
}: EventFiltersProps) {
  const groups = [
    { label: "Category", options: categories, value: category, onChange: onCategoryChange },
    { label: "City", options: cities, value: city, onChange: onCityChange },
  ]

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {groups.map((group, index) => (
          <div key={group.label} className="space-y-3">
            {index > 0 && <Separator />}
            <Label>{group.label}</Label>
            <div className="flex flex-wrap gap-2">
              {group.options.map(option => {
                const selected = group.value === option
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => group.onChange(option)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full" onClick={onClear} disabled={!canClear}>
          Clear all
        </Button>
      </CardContent>
    </Card>
  )
}
