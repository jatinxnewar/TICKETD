import { Header } from "@/components/layout/header"
import { EventFilters } from "@/components/events/event-filters"
import { EventCard } from "@/components/events/event-card"
import { Footer } from "@/components/layout/footer"

// Indian/INR events data
const events = [
  {
    id: "1",
    title: "Diwali Night Extravaganza",
    description: "Experience the grandest Diwali celebration with live music, food, and fireworks!",
    category: "Festival",
    location: "Mumbai, Maharashtra",
    venue: "Jio World Centre",
    date: "2025-11-01",
    time: "19:00",
    image: "https://images.unsplash.com/photo-1605811214531-c419c7a8c0e2?w=800&h=600&fit=crop",
    price: "₹2000",
    attendees: 2000,
    status: "active",
  },
  {
    id: "2",
    title: "Arijit Singh Live Concert",
    description: "Enjoy a soulful evening with Arijit Singh performing his greatest hits.",
    category: "Concert",
    location: "Delhi NCR",
    venue: "Indira Gandhi Indoor Stadium",
    date: "2025-10-15",
    time: "18:00",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
    price: "₹1500",
    attendees: 5000,
    status: "active",
  },
  {
    id: "3",
    title: "Bollywood Dandiya Night",
    description: "Dance the night away with Bollywood beats and Dandiya sticks!",
    category: "Festival",
    location: "Ahmedabad, Gujarat",
    venue: "Sardar Patel Stadium",
    date: "2025-10-20",
    time: "20:00",
    image: "https://images.unsplash.com/photo-1583662018414-25657c6a4eef?w=800&h=600&fit=crop",
    price: "₹800",
    attendees: 3000,
    status: "active",
  },
  {
    id: "4",
    title: "Sunburn Goa 2025",
    description: "Asia's biggest music festival with top DJs and artists.",
    category: "Festival",
    location: "Goa",
    venue: "Vagator Beach",
    date: "2025-12-27",
    time: "16:00",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
    price: "₹5000",
    attendees: 10000,
    status: "active",
  },
  {
    id: "5",
    title: "Comedy Night with Zakir Khan",
    description: "Laugh out loud with Zakir Khan's latest stand-up act.",
    category: "Comedy",
    location: "Bangalore, Karnataka",
    venue: "Chowdiah Memorial Hall",
    date: "2025-09-30",
    time: "20:00",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop",
    price: "₹1200",
    attendees: 1200,
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
