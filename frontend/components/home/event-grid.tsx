"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"
import { EventCard } from "@/components/events/event-card"
import { SectionHeading } from "@/components/layout/section-heading"

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
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="More to explore"
          title="Discover events"
          description="From classical performances to modern celebrations — find your next experience."
          action={
            <Button asChild variant="outline">
              <Link href="/events">
                Explore all
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

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

        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/events">
              Explore all events
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="surface-gradient mt-16 rounded-2xl border px-6 py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Hosting something of your own?</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            List your event on Ticket'D and reach audiences across India, with fair-priced resale
            built in from day one.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/create">
              Create an event
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
