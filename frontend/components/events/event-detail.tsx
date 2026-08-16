"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Share2, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={event.image || "/placeholder.jpg"}
              alt={event.title}
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge className="mb-3 bg-background/90 backdrop-blur-sm text-foreground">
                {event.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {event.title}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{formatEventDate(event.date)} • {event.time}</span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date & Time</p>
                  <p className="font-semibold text-sm">{formatEventDate(event.date)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-sm truncate">{event.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tickets Available</p>
                  <p className="font-semibold text-sm tabular-nums">
                    {totalAvailable.toLocaleString("en-IN")} of {totalQuantity.toLocaleString("en-IN")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          {soldPercentage > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tickets sold</span>
                  <span className="text-sm font-bold text-primary tabular-nums">{soldPercentage}%</span>
                </div>
                <div
                  className="w-full bg-secondary rounded-full h-2.5 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={soldPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Tickets sold"
                >
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      soldPercentage > 80
                        ? "bg-rose-500"
                        : soldPercentage > 50
                        ? "bg-amber-500"
                        : "bg-emerald-500"
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
                  <div className="flex items-start gap-3 mb-4">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">About This Event</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-4">
                    <h4 className="font-semibold">Event Highlights</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>NFT-based tickets with blockchain verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Secure resale marketplace available</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Digital collectible ticket for attendees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Resale capped at 120% of face value to deter scalping</span>
                      </li>
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
                <Check className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
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
