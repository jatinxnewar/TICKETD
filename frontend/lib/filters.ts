export interface MarketplaceFilterState {
  price: [number, number]
  categories: string[]
  types: string[]
  locations: string[]
}

export const PRICE_FLOOR = 0
export const PRICE_CEILING = 50000

export const CATEGORY_OPTIONS = [
  "Music",
  "Cultural",
  "Technology",
  "Fashion",
  "Entertainment",
] as const

export const LOCATION_OPTIONS = [
  "Mumbai",
  "New Delhi",
  "Bengaluru",
  "Goa",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Kolkata",
  "Hyderabad",
] as const

export const TICKET_TYPE_OPTIONS = ["VIP", "Premium", "Pass", "General"] as const

export function defaultMarketplaceFilters(): MarketplaceFilterState {
  return {
    price: [PRICE_FLOOR, PRICE_CEILING],
    categories: [],
    types: [],
    locations: [],
  }
}

export function isDefaultFilters(filters: MarketplaceFilterState): boolean {
  return (
    filters.price[0] === PRICE_FLOOR &&
    filters.price[1] === PRICE_CEILING &&
    filters.categories.length === 0 &&
    filters.types.length === 0 &&
    filters.locations.length === 0
  )
}
