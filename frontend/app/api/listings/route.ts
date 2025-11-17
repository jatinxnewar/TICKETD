import { NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/mongodb"
import Listing from "@/lib/models/Listing"

export async function GET() {
  await dbConnect()
  const listings = await Listing.find().sort({ createdAt: -1 })
  return NextResponse.json(listings)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const data = await req.json()
  const listing = await Listing.create(data)
  return NextResponse.json(listing, { status: 201 })
}
