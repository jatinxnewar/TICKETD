"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { EventDetail } from "@/components/events/event-detail"
import { Button } from "@/components/ui/button"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = typeof params?.id === "string" ? params.id : ""

  const { data: event, loading, error } = useStoreData(
    () => eventsApi.getById(eventId),
    "We couldn't find that event.",
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="flex-1">
        {loading ? (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="h-64 rounded-xl bg-muted/40 animate-pulse md:h-96" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse" />
                  ))}
                </div>
                <div className="h-64 rounded-xl bg-muted/40 animate-pulse" />
              </div>
              <div className="h-96 rounded-xl bg-muted/40 animate-pulse" />
            </div>
          </div>
        ) : error || !event ? (
          <div className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Event not found</h1>
            <p className="mt-2 max-w-sm text-muted-foreground">
              This event may have been removed, or the link is incorrect.
            </p>
            <Button asChild className="mt-6">
              <Link href="/events">Browse all events</Link>
            </Button>
          </div>
        ) : (
          <EventDetail event={event} />
        )}
      </main>
      <Footer />
    </div>
  )
}
