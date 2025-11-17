"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { SelectTicket } from "./select-ticket"
import { ListingDetails } from "./listing-details"
import { PricingSettings } from "./pricing-settings"
import { ReviewAndPublish } from "./review-and-publish"

export type ListingFormData = {
  selectedTicket: {
    id: string
    eventTitle: string
    ticketType: string
    originalPrice: string
    date: string
    time: string
    location: string
    image: string
  } | null
  listingTitle: string
  description: string
  category: string
  condition: string
  transferMethod: string
  salePrice: string
  minimumPrice: string
  instantSale: boolean
  auctionDuration: string
  royaltyPercentage: string
  tags: string[]
}

const steps = [
  { id: 1, title: "Select Ticket", description: "Choose the ticket you want to list" },
  { id: 2, title: "Listing Details", description: "Add title, description and details" },
  { id: 3, title: "Pricing & Terms", description: "Set price and sale terms" },
  { id: 4, title: "Review & Publish", description: "Review and publish your listing" },
]

export function ListingCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ListingFormData>({
    selectedTicket: null,
    listingTitle: "",
    description: "",
    category: "",
    condition: "excellent",
    transferMethod: "blockchain",
    salePrice: "",
    minimumPrice: "",
    instantSale: true,
    auctionDuration: "7",
    royaltyPercentage: "2.5",
    tags: [],
  })

  const updateFormData = (updates: Partial<ListingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectTicket formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 2:
        return <ListingDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      case 3:
        return <PricingSettings formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
      case 4:
        return <ReviewAndPublish formData={formData} onPrev={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>Create Ticket Listing</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`text-center p-3 rounded-lg transition-colors ${
                  step.id === currentStep
                    ? "bg-primary/10 border-2 border-primary"
                    : step.id < currentStep
                    ? "bg-green-100 border-2 border-green-300"
                    : "bg-muted"
                }`}
              >
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      {renderStep()}
    </div>
  )
}
