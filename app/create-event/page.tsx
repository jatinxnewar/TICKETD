import { Header } from "@/components/layout/header"
import { EventCreationWizard } from "@/components/create-event/event-creation-wizard"

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Launch your event on the blockchain</p>
        </div>
        <EventCreationWizard />
      </main>
    </div>
  )
}
