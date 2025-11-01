"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatEventDate } from "@/lib/utils"

const events = [
	{
		id: 1,
		title: "Diwali Night Celebration",
		date: "2024-11-12",
		time: "19:00",
		location: "Mumbai, Maharashtra",
		image: "https://images.unsplash.com/photo-1605811214531-c419c7a8c0e2?w=800&h=600&fit=crop",
		price: "₹2,500",
		category: "Festival",
		attendees: 500,
		rating: 4.8,
		featured: true,
		description:
			"Celebrate the festival of lights with traditional dance, music, and fireworks.",
	},
	{
		id: 2,
		title: "AR Rahman Live Concert",
		date: "2024-11-20",
		time: "20:00",
		location: "Bangalore, Karnataka",
		image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
		price: "₹5,000",
		category: "Music",
		attendees: 2000,
		rating: 4.9,
		featured: true,
		description: "Experience the magic of AR Rahman's music live in concert.",
	},
	{
		id: 3,
		title: "Bollywood Dance Workshop",
		date: "2024-11-25",
		time: "15:00",
		location: "Delhi, NCR",
		image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&h=600&fit=crop",
		price: "₹1,200",
		category: "Workshop",
		attendees: 50,
		rating: 4.7,
		featured: false,
		description:
			"Learn authentic Bollywood dance moves from professional choreographers.",
	},
	{
		id: 4,
		title: "Holi Color Festival",
		date: "2024-12-05",
		time: "10:00",
		location: "Jaipur, Rajasthan",
		image: "https://images.unsplash.com/photo-1583662018414-25657c6a4eef?w=800&h=600&fit=crop",
		price: "₹800",
		category: "Festival",
		attendees: 1000,
		rating: 4.6,
		featured: false,
		description:
			"Celebrate Holi with organic colors, music, and traditional sweets.",
	},
]

export function FeaturedEvents() {
	return (
		<section className="py-20 bg-gradient-to-br from-background via-background to-muted/30">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-16">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 rounded-full"></div>
							<span className="text-sm font-medium text-primary uppercase tracking-wider">
								Premium Events
							</span>
						</div>
						<h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
							Featured Events
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
							Discover handpicked premium events across India. From exclusive
							festivals to world-class concerts, experience the extraordinary.
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

								{/* Featured Badge */}
								{event.featured && (
									<div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
										<Star className="h-3 w-3 fill-current" />
										Featured
									</div>
								)}

								{/* Rating */}
								<div className="absolute bottom-4 left-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
									<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
									<span className="text-xs font-medium">
										{event.rating}
									</span>
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
												{event.attendees.toLocaleString()} attending
											</span>
										</div>
									</div>
								</div>

								<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
									{event.description}
								</p>

								<div className="flex items-center justify-between pt-2 border-t">
									<div className="space-y-1">
										<p className="text-xs text-muted-foreground">
											Starting from
										</p>
										<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
											{event.price}
										</span>
									</div>
									<Link href={`/events/${event.id}`}>
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
