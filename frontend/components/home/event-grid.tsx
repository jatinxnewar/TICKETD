"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"
import { EventCard } from "@/components/events/event-card"

export function EventGrid() {
  const { data, loading, error, refresh } = useStoreData(
    () => eventsApi.getAll(),
    "Could not load events.",
  )
  const all = data ?? []
  // Featured already shows the first four; continue the list rather than repeat it.
  const events = all.slice(4, 10)

  if (!loading && !error && events.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-primary" />
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                More to explore
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Discover Events</h2>
            <p className="max-w-2xl text-muted-foreground">
              From classical performances to modern celebrations — find your next experience.
            </p>
          </div>

          <Button asChild variant="outline" className="hidden flex-shrink-0 md:inline-flex">
            <Link href="/events">
              Explore all
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[24rem] rounded-xl border bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-12 text-center">
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={refresh}>
              Try again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-14 rounded-2xl border bg-muted/30 px-6 py-10 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Hosting something of your own?</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            List your event on Ticket'D and reach audiences across India, with resale built in from
            day one.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/create">Create an event</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">Browse all events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
