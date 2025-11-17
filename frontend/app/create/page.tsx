"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { EventCreationWizard } from "@/components/create-event/event-creation-wizard"
import { ListingCreationWizard } from "@/components/create-listing/listing-creation-wizard"
import { Calendar, Ticket } from "lucide-react"

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState<string>("event")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Create</h1>
          <p className="text-lg text-muted-foreground">
            Launch a new event or list your tickets for resale
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="event" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              New Event
            </TabsTrigger>
            <TabsTrigger value="listing" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Resell Ticket
            </TabsTrigger>
          </TabsList>

          <TabsContent value="event">
            <EventCreationWizard />
          </TabsContent>

          <TabsContent value="listing">
            <ListingCreationWizard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
