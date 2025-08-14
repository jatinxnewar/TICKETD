"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Tag, X } from "lucide-react"
import { useState } from "react"
import { ListingFormData } from "./listing-creation-wizard"

interface ListingDetailsProps {
  formData: ListingFormData
  updateFormData: (updates: Partial<ListingFormData>) => void
  onNext: () => void
  onPrev: () => void
}

const categories = [
  "Technology",
  "Music",
  "Sports",
  "Art",
  "Gaming",
  "Education",
  "Business",
  "Entertainment",
  "Food & Drink",
  "Other"
]

const conditions = [
  { value: "excellent", label: "Excellent - Like new" },
  { value: "good", label: "Good - Minor wear" },
  { value: "fair", label: "Fair - Some wear" },
  { value: "digital", label: "Digital Only" }
]

const transferMethods = [
  { value: "blockchain", label: "Blockchain Transfer" },
  { value: "email", label: "Email Transfer" },
  { value: "mobile", label: "Mobile App Transfer" },
  { value: "physical", label: "Physical Handover" }
]

export function ListingDetails({ formData, updateFormData, onNext, onPrev }: ListingDetailsProps) {
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      updateFormData({ 
        tags: [...formData.tags, tagInput.trim()] 
      })
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    updateFormData({ 
      tags: formData.tags.filter(tag => tag !== tagToRemove) 
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const canProceed = formData.listingTitle.trim() !== "" && 
                    formData.description.trim() !== "" && 
                    formData.category !== ""

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Listing Details
        </CardTitle>
        <p className="text-muted-foreground">
          Add details about your ticket listing to attract buyers
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Ticket Preview */}
        {formData.selectedTicket && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Selected Ticket:</h4>
            <p className="text-sm text-muted-foreground">
              {formData.selectedTicket.eventTitle} - {formData.selectedTicket.ticketType}
            </p>
          </div>
        )}

        {/* Listing Title */}
        <div className="space-y-2">
          <Label htmlFor="listingTitle">Listing Title *</Label>
          <Input
            id="listingTitle"
            placeholder="e.g., VIP Ticket to Blockchain Summit 2024"
            value={formData.listingTitle}
            onChange={(e) => updateFormData({ listingTitle: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Create a compelling title that describes your ticket
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your ticket, any special features, seating details, or why someone should buy it..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Provide detailed information about the ticket and event
          </p>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label htmlFor="condition">Ticket Condition</Label>
          <Select value={formData.condition} onValueChange={(value) => updateFormData({ condition: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {conditions.map((condition) => (
                <SelectItem key={condition.value} value={condition.value}>
                  {condition.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Transfer Method */}
        <div className="space-y-2">
          <Label htmlFor="transferMethod">Transfer Method</Label>
          <Select value={formData.transferMethod} onValueChange={(value) => updateFormData({ transferMethod: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {transferMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Add tags (e.g., vip, front-row, limited)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              <Tag className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Add relevant tags to help buyers find your listing
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!canProceed}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
