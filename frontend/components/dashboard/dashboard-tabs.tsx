"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyTicketsTab } from "./my-tickets-tab"
import { MyListingsTab } from "./my-listings-tab"
import { PurchaseHistoryTab } from "./purchase-history-tab"
import { WalletTab } from "./wallet-tab"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="tickets" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        <TabsTrigger value="listings">My Listings</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
      </TabsList>

      <TabsContent value="tickets">
        <MyTicketsTab />
      </TabsContent>

      <TabsContent value="listings">
        <MyListingsTab />
      </TabsContent>

      <TabsContent value="history">
        <PurchaseHistoryTab />
      </TabsContent>

      <TabsContent value="wallet">
        <WalletTab />
      </TabsContent>
    </Tabs>
  )
}
