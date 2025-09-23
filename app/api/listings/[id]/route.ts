import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Listing from "@/lib/models/Listing"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const listing = await Listing.findById(params.id)
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(listing)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const data = await req.json()
  const listing = await Listing.findByIdAndUpdate(params.id, data, { new: true })
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(listing)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const listing = await Listing.findByIdAndDelete(params.id)
  if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ success: true })
}
