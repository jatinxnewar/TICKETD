import { redirect } from "next/navigation"

// Event creation consolidated onto /create; keep this path working for old links.
export default function CreateEventPage() {
  redirect("/create")
}
