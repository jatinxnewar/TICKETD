import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function for consistent date formatting to prevent hydration mismatches
export function formatDate(date: string | Date, dateFormat: string = "MM/dd/yyyy"): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date"
    }
    return format(dateObj, dateFormat)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

// Events are Indian; render dates the way the audience reads them.
export function formatEventDate(date: string | Date): string {
  return formatDate(date, "d MMM yyyy")
}

export function formatEventDateTime(date: string | Date): string {
  return formatDate(date, "d MMM yyyy, h:mm a")
}

/**
 * Prices move through the app as strings. Render them as whole rupees with
 * Indian digit grouping, and degrade to a dash rather than "₹NaN".
 */
export function formatINR(value: string | number | undefined | null): string {
  const amount = typeof value === "number" ? value : parseFloat(value ?? "")
  if (!Number.isFinite(amount)) return "—"
  return `₹${Math.round(amount).toLocaleString("en-IN")}`
}

/** Percentage change between two prices, guarding the divide-by-zero case. */
export function percentChange(from: number, to: number): number | null {
  if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return null
  return ((to - from) / from) * 100
}
