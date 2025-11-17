"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyTickets } from "./my-tickets"
import { MyEvents } from "./my-events"
import { EventHistory } from "./event-history"
import { ProfileSettings } from "./profile-settings"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="tickets" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        <TabsTrigger value="events">My Events</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="tickets">
        <MyTickets />
      </TabsContent>

      <TabsContent value="events">
        <MyEvents />
      </TabsContent>

      <TabsContent value="history">
        <EventHistory />
      </TabsContent>

      <TabsContent value="settings">
        <ProfileSettings />
      </TabsContent>
    </Tabs>
  )
}
