import { Header } from "@/components/layout/header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { StatsCards } from "@/components/dashboard/stats-cards"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your tickets and events</p>
        </div>
        <StatsCards />
        <DashboardTabs />
      </main>
    </div>
  )
}
