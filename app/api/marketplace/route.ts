import { type NextRequest, NextResponse } from "next/server"

// Mock marketplace data
const marketplaceListings = [
  {
    id: "1",
    eventTitle: "Blockchain Summit 2024",
    ticketType: "VIP",
    originalPrice: "0.1 ETH",
    currentPrice: "0.12 ETH",
    seller: "0x1234...5678",
    eventDate: "2024-03-15",
    location: "San Francisco, CA",
    category: "Technology",
    verified: true,
    timeLeft: "2 days",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    eventTitle: "NFT Music Festival",
    ticketType: "General",
    originalPrice: "0.15 ETH",
    currentPrice: "0.18 ETH",
    seller: "0x9876...4321",
    eventDate: "2024-04-10",
    location: "Miami, FL",
    category: "Music",
    verified: true,
    timeLeft: "1 week",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sortBy = searchParams.get("sortBy")

  let filteredListings = [...marketplaceListings]

  if (category && category !== "all") {
    filteredListings = filteredListings.filter((listing) => listing.category === category)
  }

  if (minPrice) {
    filteredListings = filteredListings.filter(
      (listing) => Number.parseFloat(listing.currentPrice) >= Number.parseFloat(minPrice),
    )
  }

  if (maxPrice) {
    filteredListings = filteredListings.filter(
      (listing) => Number.parseFloat(listing.currentPrice) <= Number.parseFloat(maxPrice),
    )
  }

  if (sortBy) {
    filteredListings.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number.parseFloat(a.currentPrice) - Number.parseFloat(b.currentPrice)
        case "price-high":
          return Number.parseFloat(b.currentPrice) - Number.parseFloat(a.currentPrice)
        case "date":
          return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
        default:
          return 0
      }
    })
  }

  return NextResponse.json({
    listings: filteredListings,
    total: filteredListings.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { ticketId, price, walletAddress } = await request.json()

    const newListing = {
      id: Date.now().toString(),
      ticketId,
      price,
      seller: walletAddress,
      status: "active",
      listedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      listing: newListing,
      message: "Ticket listed successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to list ticket" }, { status: 500 })
  }
}
