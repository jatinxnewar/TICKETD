"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { EventFilters } from "@/components/events/event-filters"
import { EventCard } from "@/components/events/event-card"
import { Button } from "@/components/ui/button"
import { eventsApi } from "@/lib/api"
import { useStoreData } from "@/hooks/useStoreData"

const ALL = "All"

function EventsView() {
  const searchParams = useSearchParams()
  const query = (searchParams.get("q") || "").trim().toLowerCase()

  const [category, setCategory] = useState<string>(ALL)
  const [city, setCity] = useState<string>(ALL)

  const { data, loading, error, refresh } = useStoreData(
    () => eventsApi.getAll(),
    "Could not load events.",
  )
  const events = useMemo(() => data ?? [], [data])

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(events.map(e => e.category))).sort()],
    [events],
  )
  const cities = useMemo(
    () => [ALL, ...Array.from(new Set(events.map(e => e.location.split(",")[0].trim()))).sort()],
    [events],
  )

  const visible = events.filter(event => {
    const matchesQuery =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.venue.toLowerCase().includes(query)

    const matchesCategory = category === ALL || event.category === category
    const matchesCity = city === ALL || event.location.split(",")[0].trim() === city

    return matchesQuery && matchesCategory && matchesCity
  })

  const filtersDirty = category !== ALL || city !== ALL

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {query ? `Results for “${searchParams.get("q")}”` : "All Events"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover concerts, festivals and cultural events across India.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64 lg:flex-shrink-0">
          <EventFilters
            categories={categories}
            cities={cities}
            category={category}
            city={city}
            onCategoryChange={setCategory}
            onCityChange={setCity}
            onClear={() => {
              setCategory(ALL)
              setCity(ALL)
            }}
            canClear={filtersDirty}
          />
        </aside>

        <div className="min-w-0 flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[24rem] rounded-xl border bg-muted/40 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-20 text-center">
              <h2 className="text-lg font-semibold">Couldn't load events</h2>
              <p className="mt-1 mb-6 text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={refresh}>
                Try again
              </Button>
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <h2 className="text-lg font-semibold">No events found</h2>
              <p className="mt-1 max-w-sm text-muted-foreground">
                {query
                  ? "Try a different search term, or clear your filters."
                  : "Try widening your filters to see more events."}
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {visible.length} event{visible.length === 1 ? "" : "s"} found
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visible.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="container mx-auto flex-1 px-4 py-8">
        {/* useSearchParams requires a Suspense boundary during prerender. */}
        <Suspense fallback={<div className="h-96 rounded-xl border bg-muted/40 animate-pulse" />}>
          <EventsView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
