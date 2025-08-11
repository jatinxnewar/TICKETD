import { Header } from "@/components/layout/header"
import { EventFilters } from "@/components/events/event-filters"
import { EventCard } from "@/components/events/event-card"
import { Footer } from "@/components/layout/footer"

// Mock events data
const events = [
  {
    id: "1",
    title: "Blockchain Summit 2024",
    description: "The premier blockchain conference featuring industry leaders and innovative projects.",
    category: "Technology",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    date: "2024-03-15",
    time: "18:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.1 ETH",
    attendees: 1250,
    status: "active",
  },
  {
    id: "2",
    title: "NFT Art Gallery Opening",
    description: "Exclusive opening of digital art gallery featuring renowned NFT artists.",
    category: "Art",
    location: "New York, NY",
    venue: "Chelsea Gallery District",
    date: "2024-03-20",
    time: "19:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.05 ETH",
    attendees: 300,
    status: "active",
  },
  {
    id: "3",
    title: "Web3 Gaming Conference",
    description: "Explore the future of gaming with blockchain technology and NFTs.",
    category: "Gaming",
    location: "Los Angeles, CA",
    venue: "LA Convention Center",
    date: "2024-04-01",
    time: "10:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.08 ETH",
    attendees: 800,
    status: "active",
  },
  {
    id: "4",
    title: "DeFi Workshop Series",
    description: "Learn about decentralized finance protocols and yield farming strategies.",
    category: "Education",
    location: "Online",
    venue: "Virtual Event",
    date: "2024-03-25",
    time: "14:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.03 ETH",
    attendees: 200,
    status: "active",
  },
  {
    id: "5",
    title: "Crypto Art Exhibition",
    description: "Showcase of digital art and NFT collections from emerging artists.",
    category: "Art",
    location: "Miami, FL",
    venue: "Art Basel Miami",
    date: "2024-04-05",
    time: "19:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.06 ETH",
    attendees: 400,
    status: "active",
  },
  {
    id: "6",
    title: "Metaverse Development Bootcamp",
    description: "Intensive 3-day bootcamp on building applications for the metaverse.",
    category: "Education",
    location: "Austin, TX",
    venue: "Tech Hub Austin",
    date: "2024-04-15",
    time: "09:00",
    image: "/placeholder.svg?height=300&width=400",
    price: "0.15 ETH",
    attendees: 150,
    status: "active",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Events</h1>
          <p className="text-muted-foreground">Discover amazing Web3 events happening around the world</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <EventFilters />
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">{events.length} events found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
