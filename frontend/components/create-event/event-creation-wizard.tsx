"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BasicInfo } from "./basic-info"
import { TicketTypes } from "./ticket-types"
import { EventSettings } from "./event-settings"
import { ReviewAndDeploy } from "./review-and-deploy"

const steps = [
  { id: 1, title: "Basic Information", component: BasicInfo },
  { id: 2, title: "Ticket Types", component: TicketTypes },
  { id: 3, title: "Event Settings", component: EventSettings },
  { id: 4, title: "Review & Deploy", component: ReviewAndDeploy },
]

export function EventCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [eventData, setEventData] = useState({})

  const progress = (currentStep / steps.length) * 100
  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateEventData = (data: any) => {
    setEventData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>
              Step {currentStep} of {steps.length}
            </CardTitle>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-8">
          {CurrentStepComponent && (
            <CurrentStepComponent
              data={eventData}
              updateData={updateEventData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === steps.length}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
