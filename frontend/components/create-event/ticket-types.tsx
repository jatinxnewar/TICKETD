"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Edit } from "lucide-react"
import { formatINR } from "@/lib/utils"

interface TicketTypesProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

interface TicketType {
  id: string
  name: string
  description: string
  price: string
  quantity: number
  transferable: boolean
  resellable: boolean
  maxPerWallet: number
}

export function TicketTypes({ data, updateData, onNext, onPrevious }: TicketTypesProps) {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(data.ticketTypes || [])
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null)
  const [showForm, setShowForm] = useState(false)

  const defaultTicket: TicketType = {
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: 100,
    transferable: true,
    resellable: true,
    maxPerWallet: 5,
  }

  const [formData, setFormData] = useState<TicketType>(defaultTicket)

  const handleInputChange = (field: keyof TicketType, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTicketType = () => {
    const newTicket = {
      ...formData,
      id: Date.now().toString(),
    }
    const updatedTickets = [...ticketTypes, newTicket]
    setTicketTypes(updatedTickets)
    updateData({ ticketTypes: updatedTickets })
    setFormData(defaultTicket)
    setShowForm(false)
  }

  const editTicketType = (ticket: TicketType) => {
    setFormData(ticket)
    setEditingTicket(ticket)
    setShowForm(true)
  }

  const updateTicketType = () => {
    const updatedTickets = ticketTypes.map((ticket) => (ticket.id === editingTicket?.id ? formData : ticket))
    setTicketTypes(updatedTickets)
    updateData({ ticketTypes: updatedTickets })
    setFormData(defaultTicket)
    setEditingTicket(null)
    setShowForm(false)
  }

  const deleteTicketType = (id: string) => {
    const updatedTickets = ticketTypes.filter((ticket) => ticket.id !== id)
    setTicketTypes(updatedTickets)
    updateData({ ticketTypes: updatedTickets })
  }

  const handleNext = () => {
    if (ticketTypes.length > 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Ticket Types</h2>
        <p className="text-muted-foreground">Define different ticket categories for your event</p>
      </div>

      {/* Existing Ticket Types */}
      <div className="space-y-4">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ticket.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => editTicketType(ticket)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => deleteTicketType(ticket.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Price:</span>
                  <p>{formatINR(ticket.price)}</p>
                </div>
                <div>
                  <span className="font-medium">Quantity:</span>
                  <p>{ticket.quantity}</p>
                </div>
                <div>
                  <span className="font-medium">Max per wallet:</span>
                  <p>{ticket.maxPerWallet}</p>
                </div>
                <div className="flex space-x-2">
                  {ticket.transferable && <Badge variant="secondary">Transferable</Badge>}
                  {ticket.resellable && <Badge variant="secondary">Resellable</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Ticket Type */}
      {!showForm ? (
        <Button variant="outline" onClick={() => setShowForm(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Ticket Type
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{editingTicket ? "Edit Ticket Type" : "Add New Ticket Type"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketName">Ticket Name *</Label>
                <Input
                  id="ticketName"
                  placeholder="e.g., General Admission, VIP"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">Price (INR) *</Label>
                <Input
                  id="ticketPrice"
                  type="number"
                  step="100"
                  min="0"
                  placeholder="2500"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketDescription">Description</Label>
              <Textarea
                id="ticketDescription"
                placeholder="Describe what's included with this ticket..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Total Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", Math.max(1, Number.parseInt(e.target.value) || 1))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPerWallet">Max per Wallet</Label>
                <Input
                  id="maxPerWallet"
                  type="number"
                  min="1"
                  value={formData.maxPerWallet}
                  onChange={(e) => handleInputChange("maxPerWallet", Math.max(1, Number.parseInt(e.target.value) || 1))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transferable</Label>
                  <p className="text-sm text-muted-foreground">Allow ticket holders to transfer tickets to others</p>
                </div>
                <Switch
                  checked={formData.transferable}
                  onCheckedChange={(checked) => handleInputChange("transferable", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Resellable</Label>
                  <p className="text-sm text-muted-foreground">Allow ticket holders to resell on the marketplace</p>
                </div>
                <Switch
                  checked={formData.resellable}
                  onCheckedChange={(checked) => handleInputChange("resellable", checked)}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={editingTicket ? updateTicketType : addTicketType}
                disabled={!formData.name || !formData.price}
              >
                {editingTicket ? "Update Ticket Type" : "Add Ticket Type"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setEditingTicket(null)
                  setFormData(defaultTicket)
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={ticketTypes.length === 0}>
          Next: Event Settings
        </Button>
      </div>
    </div>
  )
}
