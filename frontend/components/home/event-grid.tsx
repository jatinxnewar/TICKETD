"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, TrendingUp, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"
import { eventsApi, Event } from "@/lib/api"
import { useEffect, useState } from "react"

export function EventGrid() {
	const [events, setEvents] = useState<Event[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchEvents() {
			try {
				setLoading(true)
				const data = await eventsApi.getAll({ status: 'active' })
				setEvents(data.slice(0, 6)) // Show only first 6 events on homepage
			} catch (err) {
				console.error('Failed to fetch events:', err)
				setError('Failed to load events')
			} finally {
				setLoading(false)
			}
		}

		fetchEvents()
	}, [])

	if (loading) {
		return (
			<section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="space-y-8">
						<div className="space-y-4 animate-pulse">
							<div className="h-8 w-48 bg-muted rounded"></div>
							<div className="h-12 w-96 bg-muted rounded"></div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="bg-card rounded-lg overflow-hidden border animate-pulse">
									<div className="h-48 bg-muted"></div>
									<div className="p-6 space-y-4">
										<div className="h-6 bg-muted rounded w-3/4"></div>
										<div className="h-4 bg-muted rounded w-1/2"></div>
										<div className="h-4 bg-muted rounded w-2/3"></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	}

	if (error) {
		return (
			<section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="text-center text-destructive">
						<p>{error}</p>
					</div>
				</div>
			</section>
		)
	}
	return (
		<section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-16">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
							<span className="text-sm font-medium text-orange-600 uppercase tracking-wider">
								Trending Now
							</span>
						</div>
						<h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
							Discover Events
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
							Find the perfect cultural experience for you. From classical performances to modern celebrations, explore India's vibrant event scene.
						</p>
					</div>
					<div className="hidden md:flex items-center gap-4">
						<div className="text-right">
							<p className="text-sm text-muted-foreground">Browse all categories</p>
							<p className="font-semibold">500+ Events Available</p>
						</div>
						<Link href="/events">
							<Button variant="outline" size="lg" className="group">
								Explore All
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
						</Link>
					</div>
				</div>

				{/* Events Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event, index) => {
						// Get the first ticket type for pricing
						const firstTicket = event.ticketTypes?.[0]
						const price = firstTicket ? `₹${parseFloat(firstTicket.price).toLocaleString('en-IN')}` : 'TBD'
						const attendees = event.maxAttendees || 0
						const isTrending = index < 2 // First 2 events are trending
						const isFillingFast = event.status === 'sold-out' || (firstTicket && firstTicket.available < firstTicket.quantity * 0.2)

						return (
							<Card 
								key={event._id} 
								className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/90 backdrop-blur-sm"
							>
								<div className="relative h-56 overflow-hidden">
									<Image
										src={event.image || '/placeholder.jpg'}
										alt={event.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
									
									{/* Category Badge */}
									<Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm border-0">
										{event.category}
									</Badge>

									{/* Status Indicators */}
									<div className="absolute top-4 right-4 flex flex-col gap-2">
										{isTrending && (
											<div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
												<TrendingUp className="h-3 w-3" />
												Trending
											</div>
										)}
										{isFillingFast && (
											<div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
												<Clock className="h-3 w-3" />
												Filling Fast
											</div>
										)}
									</div>

									{/* Attendees Count Overlay */}
									<div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
										{attendees}+ capacity
									</div>
								</div>

								<CardContent className="p-6 space-y-4">
									<div className="space-y-3">
										<h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
											{event.title}
										</h3>
										
										<div className="space-y-2 text-sm text-muted-foreground">
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-primary" />
												<span className="font-medium">
													{formatEventDate(new Date(event.date))} • {event.time}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-primary" />
												<span>{event.location}</span>
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-border/50">
										<div className="space-y-1">
											<p className="text-xs text-muted-foreground">Starting from</p>
											<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
												{price}
											</span>
										</div>
										<Link href={`/events/${event._id}`}>
											<Button 
												size="sm" 
												className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
											>
												View Details
												<ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
											</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>

				{/* Call to Action Section */}
				<div className="mt-16 text-center">
					<div className="max-w-3xl mx-auto space-y-6 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
						<h3 className="text-2xl font-bold">Can't find what you're looking for?</h3>
						<p className="text-muted-foreground">
							Explore our complete catalog of events or create your own unique experience.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/events">
								<Button size="lg" className="group">
									Browse All Events
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
							<Link href="/create-event">
								<Button size="lg" variant="outline" className="group">
									Create Your Event
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* Mobile View All Button */}
				<div className="flex justify-center mt-12 md:hidden">
					<Link href="/events">
						<Button size="lg" className="group">
							Explore All Events
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
