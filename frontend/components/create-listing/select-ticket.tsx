"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Ticket, CheckCircle } from "lucide-react"
import Image from "next/image"
import { formatEventDate } from "@/lib/utils"
import { ListingFormData } from "./listing-creation-wizard"

// Mock user's tickets - in a real app, this would come from an API
const userTickets = [
  {
    id: "1",
    eventTitle: "Blockchain Summit 2024",
    ticketType: "VIP",
    originalPrice: "0.1 ETH",
    date: "2024-03-15",
    time: "18:00",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=300",
    status: "owned",
    transferable: true,
  },
  {
    id: "2",
    eventTitle: "NFT Music Festival",
    ticketType: "General",
    originalPrice: "0.15 ETH",
    date: "2024-04-10",
    time: "16:00",
    location: "Miami, FL",
    image: "/placeholder.svg?height=200&width=300",
    status: "owned",
    transferable: true,
  },
  {
    id: "3",
    eventTitle: "Web3 Gaming Expo",
    ticketType: "Premium",
    originalPrice: "0.08 ETH",
    date: "2024-04-01",
    time: "10:00",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=300",
    status: "owned",
    transferable: false,
  },
]

interface SelectTicketProps {
  formData: ListingFormData
  updateFormData: (updates: Partial<ListingFormData>) => void
  onNext: () => void
}

export function SelectTicket({ formData, updateFormData, onNext }: SelectTicketProps) {
  const handleTicketSelect = (ticketId: string) => {
    const selectedTicket = userTickets.find(ticket => ticket.id === ticketId)
    if (selectedTicket) {
      updateFormData({ selectedTicket })
    }
  }

  const canProceed = formData.selectedTicket !== null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Select Ticket to List
        </CardTitle>
        <p className="text-muted-foreground">
          Choose from your owned tickets that you want to list for resale
        </p>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={formData.selectedTicket?.id || ""}
          onValueChange={handleTicketSelect}
          className="space-y-4"
        >
          {userTickets.map((ticket) => (
            <div key={ticket.id} className="space-y-2">
              <Label htmlFor={ticket.id} className="cursor-pointer">
                <Card className={`transition-all hover:shadow-md ${
                  formData.selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''
                } ${!ticket.transferable ? 'opacity-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem 
                        value={ticket.id} 
                        id={ticket.id}
                        disabled={!ticket.transferable}
                      />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Ticket Image */}
                        <div className="relative">
                          <Image
                            src={ticket.image}
                            alt={ticket.eventTitle}
                            width={200}
                            height={120}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                            {ticket.ticketType}
                          </Badge>
                        </div>

                        {/* Ticket Details */}
                        <div className="md:col-span-2 space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg">{ticket.eventTitle}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-green-600">
                                {ticket.originalPrice}
                              </Badge>
                              {ticket.status === "owned" && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Owned
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatEventDate(ticket.date)} at {ticket.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {ticket.location}
                            </div>
                          </div>

                          {!ticket.transferable && (
                            <Badge variant="destructive" className="text-xs">
                              Non-transferable
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {userTickets.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Tickets Found</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any tickets that can be listed for resale.
            </p>
            <Button variant="outline">
              Browse Events
            </Button>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button 
            onClick={onNext} 
            disabled={!canProceed}
            className="min-w-[120px]"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
