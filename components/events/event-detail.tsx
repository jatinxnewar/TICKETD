"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, Globe, Twitter, MessageCircle, Share2, Heart, CheckCircle } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"

interface EventDetailProps {
  event: {
    id: string
    title: string
    description: string
    category: string
    location: string
    venue: string
    address: string
    date: string
    time: string
    endTime: string
    image: string
    images: string[]
    organizer: {
      name: string
      avatar: string
      verified: boolean
    }
    ticketTypes: Array<{
      id: string
      name: string
      description: string
      price: string
      available: number
      total: number
    }>
    agenda: Array<{
      time: string
      title: string
    }>
    speakers: Array<{
      name: string
      role: string
      avatar: string
    }>
    socialLinks: {
      website: string
      twitter: string
      discord: string
    }
  }
}

export function EventDetail({ event }: EventDetailProps) {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="relative mb-6">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {event.category}
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>

            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{event.organizer.name}</span>
                  {event.organizer.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <span className="text-sm text-muted-foreground">Event Organizer</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatEventDate(event.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {event.time} - {event.endTime}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {event.venue}, {event.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>1,250 attending</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Ticket Purchase Card */}
        <div className="lg:col-span-1">
          <Card className="card-enhanced sticky top-4">
            <CardHeader>
              <CardTitle>Get Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {event.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedTicket === ticket.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{ticket.name}</h4>
                    <span className="font-bold">{ticket.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                  <div className="text-sm">
                    <span className="text-green-600">{ticket.available} available</span>
                    <span className="text-muted-foreground"> of {ticket.total}</span>
                  </div>
                </div>
              ))}

              {selectedTicket && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span>Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        -
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      {(
                        Number.parseFloat(
                          event.ticketTypes.find((t) => t.id === selectedTicket)?.price.replace(" ETH", "") || "0",
                        ) * quantity
                      ).toFixed(3)}{" "}
                      ETH
                    </span>
                  </div>

                  <Button className="w-full" size="lg">
                    Purchase Tickets
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Details Tabs */}
      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>

              <div className="mt-6 flex space-x-4">
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Event Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex space-x-4 pb-4 border-b last:border-b-0">
                    <div className="w-16 text-sm font-medium text-muted-foreground">{item.time}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="speakers" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Featured Speakers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={speaker.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{speaker.name}</h4>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle>Event Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{event.venue}</h4>
                  <p className="text-muted-foreground">{event.address}</p>
                </div>
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Map would be displayed here</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
