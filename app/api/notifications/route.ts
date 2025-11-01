import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Notification from "@/lib/models/Notification"

export async function GET(req: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 })

    const notes = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(100)
    return NextResponse.json(notes)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect()
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

    await Notification.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
