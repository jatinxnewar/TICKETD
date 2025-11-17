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

// Utility function for displaying dates in a consistent format for the US locale
export function formatEventDate(date: string | Date): string {
  return formatDate(date, "M/d/yyyy")
}
