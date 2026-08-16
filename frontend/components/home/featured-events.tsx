"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"
import { EventCard } from "@/components/events/event-card"

export function FeaturedEvents() {
  const { data, loading } = useStoreData(() => eventsApi.getAll(), "Could not load featured events.")
  const events = (data ?? []).slice(0, 4)

  if (!loading && events.length === 0) return null

  return (
    <section className="border-t bg-muted/20 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-primary" />
              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Top picks
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
            <p className="max-w-2xl text-muted-foreground">
              Handpicked events happening across India, from concerts to cultural celebrations.
            </p>
          </div>

          <Button asChild variant="outline" className="hidden flex-shrink-0 md:inline-flex">
            <Link href="/events">
              View all
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[24rem] rounded-xl border bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild>
            <Link href="/events">
              View all events
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
