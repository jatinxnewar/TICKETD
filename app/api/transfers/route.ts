import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Transfer from "@/lib/models/Transfer"
import Listing from "@/lib/models/Listing"
import Notification from "@/lib/models/Notification"

export async function POST(req: NextRequest) {
  await dbConnect()
  try {
    const data = await req.json()
    const { listingId, fromUserId, toUserId, price, transferMethod, metadata } = data

    if (!listingId || !fromUserId || !toUserId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create transfer record
    const transfer = await Transfer.create({ listingId, fromUserId, toUserId, price, transferMethod, metadata })

    // Update listing ownership
    await Listing.findByIdAndUpdate(listingId, { userId: toUserId })

    // Create notifications for both parties
    const title = "Ownership Transferred"
    const toMessage = `You have received a ticket (listing ${listingId}). Price: ${price}`
    const fromMessage = `You have transferred ownership of listing ${listingId} to ${toUserId}.`

    await Notification.create({ userId: toUserId, title, message: toMessage, metadata: { listingId, price } })
    await Notification.create({ userId: fromUserId, title, message: fromMessage, metadata: { listingId, price } })

    // For demo: log to server console as well
    console.log("Transfer recorded:", transfer._id)

    return NextResponse.json({ success: true, transfer })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
