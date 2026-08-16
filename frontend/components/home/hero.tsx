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
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background"
      />

      <div className="container relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
        <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Secure event ticketing
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Buy, sell and trade
          <span className="text-primary"> event tickets</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Genuine tickets for concerts, festivals and cultural events across India — and a safe way
          to resell when your plans change.
        </p>

        <form
          onSubmit={handleSearch}
          role="search"
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
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
              className="h-11 pl-10"
            />
          </div>
          <Button type="submit" size="lg" className="h-11">
            Search
          </Button>
        </form>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="outline">
            <Link href="/events">Browse events</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/marketplace">Visit marketplace</Link>
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
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
