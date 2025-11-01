import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Notification from "@/lib/models/Notification"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const id = params.id
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

    const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true })
    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const id = params.id
    const note = await Notification.findById(id)
    if (!note) return NextResponse.json({ error: "not found" }, { status: 404 })
    return NextResponse.json(note)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
