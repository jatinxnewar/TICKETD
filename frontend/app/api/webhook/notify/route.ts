import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Notification from "@/lib/models/Notification"

/**
 * Webhook endpoint for custom notifications
 * POST /api/webhook/notify
 * 
 * Expected payload:
 * {
 *   "userId": "0xabc...",
 *   "title": "Custom Notification",
 *   "message": "Your custom message here",
 *   "metadata": { "any": "custom data" }
 * }
 */
export async function POST(req: NextRequest) {
  await dbConnect()
  
  try {
    const data = await req.json()
    const { userId, title, message, metadata } = data

    // Validate required fields
    if (!userId || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: userId, title, message" },
        { status: 400 }
      )
    }

    // Create notification
    const notification = await Notification.create({
      userId,
      title,
      message,
      metadata: metadata || {}
    })

    console.log("✅ Notification webhook processed:", notification._id)

    return NextResponse.json({
      success: true,
      notification: {
        id: notification._id,
        userId,
        title,
        message,
        createdAt: notification.createdAt
      }
    })
    
  } catch (err: any) {
    console.error("❌ Webhook error:", err)
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    )
  }
}
