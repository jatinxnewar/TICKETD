import { Header } from "@/components/layout/header"
import { EventDetail } from "@/components/events/event-detail"
import { Footer } from "@/components/layout/footer"

// Mock event data
const eventData = {
  id: "1",
  title: "Blockchain Summit 2024",
  description:
    "The premier blockchain conference featuring industry leaders and innovative projects. Join us for three days of networking, learning, and exploring the future of blockchain technology.",
  category: "Technology",
  location: "San Francisco, CA",
  venue: "Moscone Center",
  address: "747 Howard St, San Francisco, CA 94103",
  date: "2024-03-15",
  time: "18:00",
  endTime: "22:00",
  image: "/placeholder.svg?height=400&width=800",
  images: [
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
  ],
  organizer: {
    name: "Blockchain Foundation",
    avatar: "/placeholder.svg?height=64&width=64",
    verified: true,
  },
  ticketTypes: [
    {
      id: "1",
      name: "General Admission",
      description: "Access to all conference sessions and networking areas",
      price: "0.05 ETH",
      available: 150,
      total: 200,
    },
    {
      id: "2",
      name: "VIP Pass",
      description: "All access plus VIP networking dinner and premium seating",
      price: "0.1 ETH",
      available: 25,
      total: 50,
    },
  ],
  agenda: [
    { time: "18:00", title: "Registration & Welcome Reception" },
    { time: "19:00", title: "Keynote: The Future of Blockchain" },
    { time: "20:00", title: "Panel: DeFi Innovation" },
    { time: "21:00", title: "Networking & Refreshments" },
  ],
  speakers: [
    { name: "Vitalik Buterin", role: "Ethereum Founder", avatar: "/placeholder.svg?height=64&width=64" },
    { name: "Changpeng Zhao", role: "Binance CEO", avatar: "/placeholder.svg?height=64&width=64" },
  ],
  socialLinks: {
    website: "https://blockchainsummit.com",
    twitter: "@blockchainsummit",
    discord: "https://discord.gg/blockchain",
  },
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EventDetail event={eventData} />
      </main>
      <Footer />
    </div>
  )
}
