import { Header } from "@/components/layout/header"
import { ListingCreationWizard } from "@/components/create-listing/listing-creation-wizard"

export default function CreateListingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
          <p className="text-muted-foreground">List your tickets for resale on the marketplace</p>
        </div>
        <ListingCreationWizard />
      </main>
    </div>
  )
}
