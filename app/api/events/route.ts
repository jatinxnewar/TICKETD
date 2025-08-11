import { type NextRequest, NextResponse } from "next/server"

// Mock data for events
const events = [
  {
    id: "1",
    title: "Blockchain Summit 2024",
    description: "The premier blockchain conference featuring industry leaders and innovative projects.",
    category: "Technology",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    date: "2024-03-15",
    time: "18:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.1 ETH",
    attendees: 1250,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "NFT Art Gallery Opening",
    description: "Exclusive opening of digital art gallery featuring renowned NFT artists.",
    category: "Art",
    location: "New York, NY",
    venue: "Chelsea Gallery District",
    date: "2024-03-20",
    time: "19:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.05 ETH",
    attendees: 300,
    status: "active",
    createdAt: "2024-01-20T14:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const location = searchParams.get("location")
  const search = searchParams.get("search")

  let filteredEvents = events

  if (category && category !== "all") {
    filteredEvents = filteredEvents.filter((event) => event.category === category)
  }

  if (location && location !== "all") {
    filteredEvents = filteredEvents.filter((event) => event.location === location)
  }

  if (search) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({
    events: filteredEvents,
    total: filteredEvents.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    // In a real app, you would save to database and deploy smart contract
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      status: "draft",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: "Event created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create event" }, { status: 500 })
  }
}
