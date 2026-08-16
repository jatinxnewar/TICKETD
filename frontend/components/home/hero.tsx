"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck, Repeat, BadgeCheck } from "lucide-react"

const trustPoints = [
  { icon: ShieldCheck, label: "Verified tickets" },
  { icon: Repeat, label: "Fair-priced resale" },
  { icon: BadgeCheck, label: "Instant transfer" },
]

export function Hero() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/events?q=${encodeURIComponent(trimmed)}` : "/events")
  }

  return (
    <section className="surface-gradient relative overflow-hidden border-b">
      <div className="container relative mx-auto max-w-4xl py-16 text-center sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Verified tickets, fair resale
        </span>

        <h1 className="mt-6 text-display-md font-bold md:text-display-lg">
          Buy, sell and trade
          <span className="text-primary"> event tickets</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Genuine tickets for concerts, festivals and cultural events across India — and a safe way
          to resell when your plans change.
        </p>

        {/* Search and primary actions share one row group so the eye lands
            on a single call to action rather than four competing ones. */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mx-auto mt-10 flex max-w-lg flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="hero-search" className="sr-only">
              Search events
            </label>
            <Input
              id="hero-search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search events, artists or cities…"
              className="h-12 rounded-lg pl-10 text-base shadow-subtle"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 sm:px-8">
            Search
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm">
          <span className="text-muted-foreground">Or browse</span>
          <Button asChild variant="link" className="h-auto p-0 px-1 text-sm">
            <Link href="/events">all events</Link>
          </Button>
          <span className="text-muted-foreground">and the</span>
          <Button asChild variant="link" className="h-auto p-0 px-1 text-sm">
            <Link href="/marketplace">resale marketplace</Link>
          </Button>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {trustPoints.map(point => (
            <li key={point.label} className="flex items-center gap-2">
              <point.icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {point.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
