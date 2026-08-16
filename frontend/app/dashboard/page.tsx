import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { StatsCards } from "@/components/dashboard/stats-cards"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main-content" className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Your tickets, listings and purchase history in one place.
          </p>
        </div>
        <StatsCards />
        <DashboardTabs />
      </main>
      <Footer />
    </div>
  )
}
