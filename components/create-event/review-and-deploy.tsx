"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Loader2, Calendar, MapPin, Users, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatEventDate } from "@/lib/utils"

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
  const [deploymentComplete, setDeploymentComplete] = useState(false)
  const { toast } = useToast()

  const deploymentSteps = [
    "Validating event data",
    "Deploying smart contract",
    "Minting NFT collection",
    "Setting up marketplace",
    "Finalizing deployment",
  ]

  const handleDeploy = async () => {
    setIsDeploying(true)

    // Simulate deployment process
    for (let i = 0; i < deploymentSteps.length; i++) {
      setDeploymentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    setDeploymentComplete(true)
    setIsDeploying(false)

    toast({
      title: "Event Deployed Successfully!",
      description: "Your event is now live on the blockchain.",
    })
  }

  const totalTickets = data.ticketTypes?.reduce((sum: number, ticket: any) => sum + ticket.quantity, 0) || 0
  const totalRevenue =
    data.ticketTypes?.reduce(
      (sum: number, ticket: any) => sum + Number.parseFloat(ticket.price) * ticket.quantity,
      0,
    ) || 0

  if (deploymentComplete) {
    return (
      <div className="text-center space-y-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Event Deployed Successfully!</h2>
          <p className="text-muted-foreground">Your event is now live on the blockchain</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Contract Address:</p>
          <code className="bg-muted px-3 py-1 rounded text-sm">0x1234567890abcdef1234567890abcdef12345678</code>
        </div>
        <div className="flex justify-center space-x-4">
          <Button>View Event</Button>
          <Button variant="outline">Share Event</Button>
        </div>
      </div>
    )
  }

  if (isDeploying) {
    return (
      <div className="text-center space-y-6">
        <Loader2 className="h-16 w-16 animate-spin mx-auto" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Deploying Your Event</h2>
          <p className="text-muted-foreground">Please wait while we deploy your event to the blockchain</p>
        </div>
        <div className="space-y-4">
          <Progress value={(deploymentStep / deploymentSteps.length) * 100} className="w-full max-w-md mx-auto" />
          <p className="text-sm">{deploymentSteps[deploymentStep]}</p>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Do not close this window during deployment. This process may take a few minutes.
          </AlertDescription>
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
                  <DollarSign className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{totalRevenue.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Max Revenue (ETH)</div>
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
                  <div className="font-semibold">{ticket.price} ETH</div>
                  <div className="text-sm text-muted-foreground">{ticket.quantity} available</div>
                  <div className="text-xs text-muted-foreground">Max {ticket.maxPerWallet} per wallet</div>
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

      {/* Deployment Cost */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Deployment Cost:</strong> Approximately 0.05 ETH will be required to deploy your event smart contract
          and mint the NFT collection. Make sure you have sufficient balance in your connected wallet.
        </AlertDescription>
      </Alert>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleDeploy} size="lg">
          Deploy Event to Blockchain
        </Button>
      </div>
    </div>
  )
}
