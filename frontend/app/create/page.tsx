"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, ArrowRight } from "lucide-react"
import { EventCreationWizard } from "@/components/create-event/event-creation-wizard"

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Create an event</h1>
            <p className="mt-1 text-muted-foreground">
              Set up your event, define ticket tiers and publish it to Ticket'D.
            </p>
          </div>

          <Card className="mb-8 bg-muted/30">
            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-background p-2">
                  <Ticket className="h-5 w-5 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">Want to resell a ticket instead?</p>
                  <p className="text-sm text-muted-foreground">
                    List any ticket you already own from your dashboard.
                  </p>
                </div>
              </div>
              <Button asChild variant="outline" className="sm:flex-shrink-0">
                <Link href="/dashboard">
                  Go to my tickets
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <EventCreationWizard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
