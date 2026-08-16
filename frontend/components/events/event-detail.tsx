"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Share2, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventImage } from "@/components/ui/event-image"
import { useState } from "react"
import { formatEventDate } from "@/lib/utils"
import { Event } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { TicketPurchaseCard } from "@/components/tickets/ticket-purchase-card"

interface EventDetailProps {
  event: Event
}

export function EventDetail({ event }: EventDetailProps) {
  const [shared, setShared] = useState(false)
  const { toast } = useToast()

  const totalAvailable = event.ticketTypes?.reduce((sum, t) => sum + (t.available || 0), 0) || 0
  const totalQuantity = event.ticketTypes?.reduce((sum, t) => sum + (t.quantity || 0), 0) || 0
  const soldPercentage =
    totalQuantity > 0 ? Math.round(((totalQuantity - totalAvailable) / totalQuantity) * 100) : 0

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      // Native share sheet on mobile; clipboard everywhere else.
      if (navigator.share) {
        await navigator.share({ title: event.title, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch (error) {
      // A user dismissing the share sheet is not an error worth reporting.
      if (error instanceof DOMException && error.name === "AbortError") return
      toast({
        title: "Couldn't share",
        description: "Copy the address from your browser instead.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative overflow-hidden rounded-xl border shadow-subtle">
            <EventImage
              src={event.image || "/placeholder.jpg"}
              alt=""
              width={1200}
              height={600}
              priority
              className="h-64 w-full object-cover md:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <Badge className="mb-3 bg-background/90 text-foreground backdrop-blur-sm">
                {event.category}
              </Badge>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{event.title}</h1>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="font-medium">
                  {formatEventDate(event.date)}
                  {event.time ? ` · ${event.time}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Quick facts — one neutral surface, colour reserved for status. */}
          <Card>
            <CardContent className="grid grid-cols-1 divide-y p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { icon: Calendar, label: "Date", value: formatEventDate(event.date) },
                { icon: MapPin, label: "Location", value: event.location },
                {
                  icon: Users,
                  label: "Tickets left",
                  value: `${totalAvailable.toLocaleString("en-IN")} of ${totalQuantity.toLocaleString("en-IN")}`,
                },
              ].map(fact => (
                <div key={fact.label} className="flex items-center gap-3 p-4">
                  <span className="flex-shrink-0 rounded-lg bg-muted p-2">
                    <fact.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{fact.label}</p>
                    <p className="truncate text-sm font-semibold tabular-nums">{fact.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {soldPercentage > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Tickets sold</span>
                  <span className="text-sm font-semibold tabular-nums">{soldPercentage}%</span>
                </div>
                <div
                  className="h-2 w-full overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={soldPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Tickets sold"
                >
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${
                      soldPercentage > 80
                        ? "bg-destructive"
                        : soldPercentage > 50
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs Section */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="organizer">Organizer</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h2 className="mb-2 text-lg font-semibold">About this event</h2>
                      <p className="leading-relaxed text-muted-foreground">{event.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-6">
                    <h3 className="font-semibold">What's included</h3>
                    <ul className="grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
                      {[
                        "Verified ticket, transferable to your account",
                        "Secure resale marketplace access",
                        "Digital collectible for attendees",
                        "Resale capped at 120% of face value",
                      ].map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="venue" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Venue Information</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p className="font-medium text-foreground">{event.venue}</p>
                        <p>{event.location}</p>
                        <p className="text-sm">Capacity: {event.maxAttendees?.toLocaleString()} attendees</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organizer" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Event Organizer</h3>
                      <div className="space-y-2">
                        <p className="font-mono text-sm text-muted-foreground">
                          {event.organizer}
                        </p>
                        <Badge variant="outline">Verified Organizer</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button variant="outline" className="w-full" onClick={handleShare}>
            {shared ? (
              <>
                <Check className="mr-2 h-4 w-4 text-success" aria-hidden="true" />
                Link copied
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Share this event
              </>
            )}
          </Button>
        </div>

        {/* Ticket Purchase Card */}
        <div className="lg:col-span-1">
          <TicketPurchaseCard event={event} />
        </div>
      </div>
    </div>
  )
}
