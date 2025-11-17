import { Header } from "@/components/layout/header"
import { Hero } from "@/components/home/hero"
import { EventGrid } from "@/components/home/event-grid"
import { FeaturedEvents } from "@/components/home/featured-events"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedEvents />
        <EventGrid />
      </main>
      <Footer />
    </div>
  )
}
