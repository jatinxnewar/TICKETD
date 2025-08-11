"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div className="relative container mx-auto max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-primary mr-2" />
          <span className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full">Web3 Ticketing Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Own Your Tickets as
          <span className="text-primary"> NFTs</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Secure, transparent, and transferable event tickets powered by blockchain technology. Buy, sell, and trade
          tickets with complete ownership and authenticity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." className="pl-10" />
          </div>
          <Button size="lg">Search</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Events
            </Button>
          </Link>
          <Link href="/create-event">
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              Create Event
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
