"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { EventDetail } from "@/components/events/event-detail"
import { Footer } from "@/components/layout/footer"
import { eventsApi, Event } from "@/lib/api"

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params?.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) return

    async function fetchEvent() {
      try {
        setLoading(true)
        const data = await eventsApi.getById(eventId)
        setEvent(data)
      } catch (err) {
        console.error('Failed to fetch event:', err)
        setError('Failed to load event details')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {loading ? (
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        ) : error || !event ? (
          <div className="container mx-auto px-4 py-12 text-center text-destructive">
            <p>{error || 'Event not found'}</p>
          </div>
        ) : (
          <EventDetail event={event} />
        )}
      </main>
      <Footer />
    </div>
  )
}
    { time: "21:00", title: "Networking & Refreshments" },
  ],
  speakers: [
    { name: "Vitalik Buterin", role: "Ethereum Founder", avatar: "/placeholder.svg?height=64&width=64" },
    { name: "Changpeng Zhao", role: "Binance CEO", avatar: "/placeholder.svg?height=64&width=64" },
  ],
  socialLinks: {
    website: "https://blockchainsummit.com",
    twitter: "@blockchainsummit",
    discord: "https://discord.gg/blockchain",
  },
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EventDetail event={eventData} />
      </main>
      <Footer />
    </div>
  )
}
