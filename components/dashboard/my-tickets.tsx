"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Share, MoreHorizontal, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatEventDate } from "@/lib/utils"

const tickets = [
  {
    id: 1,
    eventTitle: "Blockchain Summit 2024",
    date: "2024-03-15",
    time: "18:00",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "VIP",
    price: "0.1 ETH",
    status: "active",
    tokenId: "#1234",
    qrCode: "QR123456789",
  },
  {
    id: 2,
    eventTitle: "NFT Art Gallery Opening",
    date: "2024-03-20",
    time: "19:00",
    location: "New York, NY",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "General",
    price: "0.05 ETH",
    status: "active",
    tokenId: "#1235",
    qrCode: "QR123456790",
  },
  {
    id: 3,
    eventTitle: "Web3 Gaming Conference",
    date: "2024-02-10",
    time: "10:00",
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=200&width=300",
    ticketType: "General",
    price: "0.08 ETH",
    status: "used",
    tokenId: "#1236",
    qrCode: "QR123456791",
  },
]

export function MyTickets() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My NFT Tickets</h2>
        <Button variant="outline">View All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="card-enhanced nft-glow overflow-hidden">
            <div className="relative">
              <Image
                src={ticket.image || "/placeholder.svg"}
                alt={ticket.eventTitle}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <Badge variant={ticket.status === "active" ? "default" : "secondary"} className="absolute top-3 right-3">
                {ticket.status}
              </Badge>
              <Badge variant="outline" className="absolute top-3 left-3 bg-background/80">
                {ticket.tokenId}
              </Badge>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {ticket.ticketType}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <QrCode className="h-4 w-4 mr-2" />
                      Show QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="h-4 w-4 mr-2" />
                      Transfer Ticket
                    </DropdownMenuItem>
                    <DropdownMenuItem>Resell Ticket</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatEventDate(ticket.date)} at {ticket.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {ticket.location}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold">{ticket.price}</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  {ticket.status === "active" && <Button size="sm">Resell</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
