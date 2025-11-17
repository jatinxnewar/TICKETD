import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Transfer from "@/lib/models/Transfer"
import Listing from "@/lib/models/Listing"
import Notification from "@/lib/models/Notification"

/**
 * Webhook endpoint for ownership transfers
 * POST /api/webhook/transfer
 * 
 * Expected payload:
 * {
 *   "listingId": "mongo-object-id",
 *   "fromUserId": "0xabc...",
 *   "toUserId": "0xdef...",
 *   "price": "₹1500",
 *   "transferMethod": "blockchain",
 *   "metadata": { "txHash": "0x123...", "blockNumber": 12345 }
 * }
 */
export async function POST(req: NextRequest) {
  await dbConnect()
  
  try {
    const data = await req.json()
    const { listingId, fromUserId, toUserId, price, transferMethod, metadata } = data

    // Validate required fields
    if (!listingId || !fromUserId || !toUserId) {
      return NextResponse.json(
        { error: "Missing required fields: listingId, fromUserId, toUserId" },
        { status: 400 }
      )
    }

    // Verify listing exists
    const listing = await Listing.findById(listingId)
    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    }

    // Create transfer record
    const transfer = await Transfer.create({
      listingId,
      fromUserId,
      toUserId,
      price: price || listing.salePrice,
      transferMethod: transferMethod || "blockchain",
      metadata: metadata || {}
    })

    // Update listing ownership
    await Listing.findByIdAndUpdate(listingId, { userId: toUserId })

    // Create notifications for both parties
    const eventTitle = listing.eventTitle || listing.listingTitle
    
    // Notification for new owner
    await Notification.create({
      userId: toUserId,
      title: "🎉 Ownership Transferred",
      message: `You now own the ticket for "${eventTitle}". The ownership has been successfully transferred to you.`,
      metadata: {
        type: "transfer_received",
        listingId,
        transferId: transfer._id,
        price,
        eventTitle,
        fromUserId
      }
    })

    // Notification for previous owner
    await Notification.create({
      userId: fromUserId,
      title: "✅ Ownership Transferred",
      message: `You have successfully transferred ownership of "${eventTitle}" to ${toUserId}.`,
      metadata: {
        type: "transfer_sent",
        listingId,
        transferId: transfer._id,
        price,
        eventTitle,
        toUserId
      }
    })

    // Log for debugging
    console.log("✅ Transfer webhook processed:", {
      transferId: transfer._id,
      listingId,
      from: fromUserId,
      to: toUserId
    })

    return NextResponse.json({
      success: true,
      transfer: {
        id: transfer._id,
        listingId,
        fromUserId,
        toUserId,
        price,
        transferDate: transfer.transferDate
      },
      message: "Ownership transferred and notifications sent"
    })
    
  } catch (err: any) {
    console.error("❌ Webhook error:", err)
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    )
  }
}
