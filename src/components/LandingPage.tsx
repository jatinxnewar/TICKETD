import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, MessageCircle } from 'lucide-react'
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Navbar } from './Navbar'

export function LandingPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const features = [
    { title: 'Anti-Counterfeiting', description: 'Secure blockchain-based tickets', icon: '🔒' },
    { title: 'Profit Sharing', description: 'Earn from resales', icon: '💰' },
    { title: 'Smart Contracts', description: 'Automated, transparent transactions', icon: '📄' },
  ]

  const events = [
    { id: 1, title: 'Summer Music Festival', date: '2024-07-15', price: '$99', image: '/placeholder.svg?height=200&width=300', category: 'music' },
    { id: 2, title: 'Tech Conference 2024', date: '2024-09-20', price: '$149', image: '/placeholder.svg?height=200&width=300', category: 'tech' },
    { id: 3, title: 'Food & Wine Expo', date: '2024-08-05', price: '$79', image: '/placeholder.svg?height=200&width=300', category: 'food' },
  ]

  const testimonials = [
    { name: 'John Doe', role: 'Event Organizer', quote: 'Ticket\'D has revolutionized how we manage our events. The security and profit-sharing model are game-changers!', rating: 5 },
    { name: 'Jane Smith', role: 'Concert-goer', quote: 'I love how easy it is to buy and resell tickets. The transparency is refreshing!', rating: 4 },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">Revolutionizing Ticketing with Blockchain Transparency</h1>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary">Buy Tickets</Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">Host an Event</Button>
          </div>
        </div>
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src="https://videos.pexels.com/video-files/7722354/7722354-sd_360_640_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-center text-muted-foreground mb-4">{feature.description}</p>
                      <Button variant="link">Learn More</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Popular Events Showcase */}
      <section className="py-16" id="events">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Events</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'music' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('music')}
            >
              Music
            </Button>
            <Button
              variant={activeFilter === 'tech' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('tech')}
            >
              Tech
            </Button>
            <Button
              variant={activeFilter === 'food' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('food')}
            >
              Food
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events
              .filter(event => activeFilter === 'all' || event.category === activeFilter)
              .map(event => (
                <Card key={event.id}>
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">Date: {event.date} | Price: {event.price}</p>
                    <div className="flex justify-between">
                      <Button size="sm">Buy Ticket</Button>
                      <Button size="sm" variant="outline">Add to Watchlist</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted" id="how-it-works">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
            {['Select Event', 'Buy Secure Ticket', 'Resell or Attend'].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Ticket'D Section */}
      <section className="py-16" id="why-choose">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ticket'D</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Security', 'Profit from Resales', 'User-Friendly'].map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{benefit}</h3>
                  <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                  <Button variant="link">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted" id="testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-lg mb-4">"{testimonial.quote}"</p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground mb-4">{testimonial.role}</p>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16" id="get-started">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Join Ticket'D</Button>
            <Button size="lg" variant="outline">Create Event</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Marketplace</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social Media</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:underline">Twitter</a></li>
                <li><a href="#" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
            <div className="col-span-2">
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <form className="flex">
                <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-md border border-r-0 focus:outline-none focus:ring-2 focus:ring-primary" />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            © 2024 Ticket'D. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Live Chat Support Button */}
      <Button className="fixed bottom-4 right-4 rounded-full p-4" variant="default">
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">Live Chat Support</span>
      </Button>
    </div>
  )
}