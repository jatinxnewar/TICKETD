"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Loader2, Calendar, MapPin, Users, IndianRupee } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatEventDate, formatINR } from "@/lib/utils"
import { eventsApi } from "@/lib/api"
import { useRouter } from "next/navigation"

interface ReviewAndDeployProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function ReviewAndDeploy({ data, onPrevious }: ReviewAndDeployProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState(0)
  const [createdEventId, setCreatedEventId] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const deploymentSteps = [
    "Validating event details",
    "Registering the event",
    "Creating ticket inventory",
    "Publishing to the marketplace",
  ]

  const handleDeploy = async () => {
    setIsDeploying(true)

    try {
      for (let i = 0; i < deploymentSteps.length; i++) {
        setDeploymentStep(i)
        await new Promise(resolve => setTimeout(resolve, 700))
      }

      // Actually persist the event so it appears in listings afterwards.
      const created = await eventsApi.create({
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date ? new Date(data.date).toISOString() : undefined,
        time: data.startTime,
        location: data.location,
        venue: data.venue,
        organizer: data.organizer,
        maxAttendees: totalTickets,
        ticketTypes: (data.ticketTypes || []).map((t: any) => ({
          name: t.name,
          price: String(Math.round(Number.parseFloat(t.price) || 0)),
          quantity: t.quantity,
          available: t.quantity,
        })),
      })

      setCreatedEventId(created._id)
      toast({
        title: "Event published",
        description: "Your event is now live and open for bookings.",
      })
    } catch (error) {
      toast({
        title: "Could not publish event",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const totalTickets =
    data.ticketTypes?.reduce((sum: number, t: any) => sum + (Number(t.quantity) || 0), 0) || 0
  const totalRevenue =
    data.ticketTypes?.reduce(
      (sum: number, t: any) => sum + (Number.parseFloat(t.price) || 0) * (Number(t.quantity) || 0),
      0,
    ) || 0

  if (createdEventId) {
    return (
      <div className="space-y-6 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-emerald-500" aria-hidden="true" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Event published</h2>
          <p className="text-muted-foreground">
            {data.title} is live and ready to accept bookings.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={() => router.push(`/events/${createdEventId}`)}>View event</Button>
          <Button variant="outline" onClick={() => router.push("/events")}>
            All events
          </Button>
        </div>
      </div>
    )
  }

  if (isDeploying) {
    return (
      <div className="space-y-6 text-center">
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" aria-hidden="true" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Publishing your event</h2>
          <p className="text-muted-foreground">This only takes a moment.</p>
        </div>
        <div className="space-y-3">
          <Progress
            value={((deploymentStep + 1) / deploymentSteps.length) * 100}
            className="mx-auto w-full max-w-md"
          />
          <p className="text-sm" aria-live="polite">
            {deploymentSteps[deploymentStep]}
          </p>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>Please keep this window open until publishing finishes.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Deploy</h2>
        <p className="text-muted-foreground">Review your event details before deploying to the blockchain</p>
      </div>

      {/* Event Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Event Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
              <p className="text-muted-foreground mb-4">{data.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {data.date ? formatEventDate(data.date) : "Date not set"} at{" "}
                  {data.startTime || "Time not set"}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {data.location} {data.venue && `- ${data.venue}`}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalTickets}</div>
                  <div className="text-sm text-muted-foreground">Total Tickets</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <IndianRupee className="h-6 w-6 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-2xl font-bold tabular-nums">{formatINR(totalRevenue)}</div>
                  <div className="text-sm text-muted-foreground">Max revenue</div>
                </div>
              </div>
              <Badge variant="secondary">{data.category}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Types */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Types ({data.ticketTypes?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.ticketTypes?.map((ticket: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{ticket.name}</h4>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  <div className="flex space-x-2 mt-2">
                    {ticket.transferable && (
                      <Badge variant="outline" className="text-xs">
                        Transferable
                      </Badge>
                    )}
                    {ticket.resellable && (
                      <Badge variant="outline" className="text-xs">
                        Resellable
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold tabular-nums">{formatINR(ticket.price)}</div>
                  <div className="text-sm text-muted-foreground">{ticket.quantity} available</div>
                  <div className="text-xs text-muted-foreground">Max {ticket.maxPerWallet} per person</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Event Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Sale Period:</span>
                <span className="text-sm">
                  {data.saleStartDate ? formatEventDate(data.saleStartDate) : "Not set"} -
                  {data.saleEndDate ? formatEventDate(data.saleEndDate) : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Max per Transaction:</span>
                <span className="text-sm">{data.maxTicketsPerTransaction || 10}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Refund Policy:</span>
                <span className="text-sm">{data.refundPolicy || "No refunds"}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Visibility:</span>
                <Badge variant="outline">{data.eventVisibility || "Public"}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Whitelist Required:</span>
                <Badge variant={data.requireWhitelist ? "default" : "secondary"}>
                  {data.requireWhitelist ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Waitlist Enabled:</span>
                <Badge variant={data.enableWaitlist ? "default" : "secondary"}>
                  {data.enableWaitlist ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <AlertDescription>
          Ticket'D charges a 5% fee on each ticket sold. There is no cost to publish an event.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleDeploy} size="lg" disabled={!data.title || totalTickets === 0}>
          Publish event
        </Button>
      </div>
    </div>
  )
}
