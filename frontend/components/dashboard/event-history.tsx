"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatEventDate } from "@/lib/utils"

const history = [
  {
    id: 1,
    eventTitle: "Web3 Gaming Conference",
    date: "2024-02-10",
    location: "Los Angeles, CA",
    ticketType: "General",
    price: "0.08 ETH",
    status: "attended",
    rating: 5,
  },
  {
    id: 2,
    eventTitle: "DeFi Summit",
    date: "2024-01-15",
    location: "New York, NY",
    ticketType: "VIP",
    price: "0.15 ETH",
    status: "attended",
    rating: 4,
  },
  {
    id: 3,
    eventTitle: "NFT Art Show",
    date: "2024-01-05",
    location: "Miami, FL",
    ticketType: "General",
    price: "0.05 ETH",
    status: "missed",
    rating: null,
  },
  {
    id: 4,
    eventTitle: "Crypto Trading Workshop",
    date: "2023-12-20",
    location: "Online",
    ticketType: "Premium",
    price: "0.03 ETH",
    status: "attended",
    rating: 5,
  },
]

export function EventHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event History</h2>
        <Button variant="outline">Export History</Button>
      </div>

      <div className="space-y-4">
        {history.map((event) => (
          <Card key={event.id} className="card-enhanced">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{event.eventTitle}</h3>
                    <Badge variant={event.status === "attended" ? "default" : "destructive"}>{event.status}</Badge>
                    <Badge variant="outline">{event.ticketType}</Badge>
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatEventDate(event.date)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  {event.rating && (
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < event.rating! ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="font-semibold text-lg mb-2">{event.price}</div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
