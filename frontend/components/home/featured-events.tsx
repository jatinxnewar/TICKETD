"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"
import { EventCard } from "@/components/events/event-card"
import { SectionHeading } from "@/components/layout/section-heading"

export function FeaturedEvents() {
  const { data, loading } = useStoreData(() => eventsApi.getAll(), "Could not load featured events.")
  const events = (data ?? []).slice(0, 4)

  if (!loading && events.length === 0) return null

  return (
    <section className="border-b bg-muted/30 py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Top picks"
          title="Featured events"
          description="Handpicked events happening across India, from concerts to cultural celebrations."
          action={
            <Button asChild variant="outline">
              <Link href="/events">
                View all
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />

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

        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="outline" className="w-full sm:w-auto">
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
