"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"
import { eventsApi } from "@/lib/api"
import { useEffect, useState } from "react"

export function FeaturedEvents() {
	const [events, setEvents] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadEvents = async () => {
			try {
				setLoading(true)
				const allEvents = await eventsApi.getAll()
				setEvents(allEvents.slice(0, 4))
			} finally {
				setLoading(false)
			}
		}
		loadEvents()
	}, [])

	if (loading) {
		return (
			<section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="space-y-8">
						<div className="space-y-4 animate-pulse">
							<div className="h-8 w-48 bg-muted rounded"></div>
							<div className="h-12 w-96 bg-muted rounded"></div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{[1, 2, 3, 4].map((i) => (
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

	return (
		<section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-16">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="h-1 w-12 bg-primary rounded-full"></div>
							<span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
								Top Picks
							</span>
						</div>
						<h2 className="text-3xl lg:text-4xl font-bold">
							Featured Events
						</h2>
						<p className="text-muted-foreground max-w-2xl">
							Handpicked events happening across India. From concerts to cultural celebrations.
						</p>
					</div>
					<Link href="/events" className="hidden md:block">
						<Button variant="outline" size="lg" className="group">
							View All Events
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>

				{/* Events Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{events.map((event, index) => (
						<Card
							key={event.id}
							className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm ${
								event.featured ? "ring-2 ring-primary/20" : ""
							}`}
						>
							<div className="relative h-56 overflow-hidden">
								<Image
									src={event.image}
									alt={event.title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

								{/* Category Badge */}
								<Badge
									className={`absolute top-4 left-4 ${
										event.featured
											? "bg-primary text-primary-foreground"
											: "bg-background/90 text-foreground"
									} backdrop-blur-sm border-0`}
								>
									{event.category}
								</Badge>
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
											{formatEventDate(new Date(event.date))} •{" "}
											{event.time}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<MapPin className="h-4 w-4 text-primary" />
										<span>{event.location}</span>
									</div>
									<div className="flex items-center gap-2">
										<Users className="h-4 w-4 text-primary" />
										<span>
											{event.maxAttendees?.toLocaleString()} capacity
										</span>
									</div>
								</div>
							</div>

								<div className="flex items-center justify-between pt-2 border-t">
									<div className="space-y-1">
										<p className="text-xs text-muted-foreground">
											Starting from
										</p>
										<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
										₹{event.ticketTypes?.[0]?.price ? parseFloat(event.ticketTypes[0].price).toLocaleString('en-IN') : 'N/A'}
									</span>
								</div>
								<Link href={`/events/${event._id}`}>
										<Button
											size="sm"
											className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
										>
											Get Tickets
											<ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Mobile View All Button */}
				<div className="flex justify-center mt-12 md:hidden">
					<Link href="/events">
						<Button size="lg" className="group">
							View All Events
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
