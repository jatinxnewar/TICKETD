import { type NextRequest, NextResponse } from "next/server"

// Mock data for tickets
const tickets = [
  {
    id: "1",
    eventId: "1",
    eventTitle: "Blockchain Summit 2024",
    tokenId: "#1234",
    ticketType: "VIP",
    price: "0.1 ETH",
    status: "active",
    qrCode: "QR123456789",
    purchaseDate: "2024-01-15T10:00:00Z",
    eventDate: "2024-03-15",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    eventId: "2",
    eventTitle: "NFT Art Gallery Opening",
    tokenId: "#1235",
    ticketType: "General",
    price: "0.05 ETH",
    status: "active",
    qrCode: "QR123456790",
    purchaseDate: "2024-01-20T14:00:00Z",
    eventDate: "2024-03-20",
    location: "New York, NY",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get("wallet")
  const status = searchParams.get("status")

  let filteredTickets = tickets

  if (status && status !== "all") {
    filteredTickets = filteredTickets.filter((ticket) => ticket.status === status)
  }

  return NextResponse.json({
    tickets: filteredTickets,
    total: filteredTickets.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { eventId, ticketTypeId, quantity, walletAddress } = await request.json()

    // In a real app, you would interact with smart contract
    const newTicket = {
      id: Date.now().toString(),
      eventId,
      tokenId: `#${Math.floor(Math.random() * 10000)}`,
      status: "active",
      purchaseDate: new Date().toISOString(),
      qrCode: `QR${Math.floor(Math.random() * 1000000000)}`,
    }

    return NextResponse.json({
      success: true,
      ticket: newTicket,
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      message: "Ticket purchased successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to purchase ticket" }, { status: 500 })
  }
}
