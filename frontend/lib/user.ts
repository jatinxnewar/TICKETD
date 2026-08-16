// Single source of truth for the demo user's identity.
// Every surface (dashboard, purchase, resale, marketplace) must agree on this
// value, otherwise owner-filtered queries silently return nothing.
export const CURRENT_USER = {
  name: "Rajesh Kumar",
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
} as const

/** Identifier that ticket/listing ownership is keyed on. */
export const CURRENT_USER_ID = CURRENT_USER.name

export function shortenAddress(address: string, lead = 6, tail = 4): string {
  if (!address) return ""
  if (address.length <= lead + tail) return address
  return `${address.slice(0, lead)}...${address.slice(-tail)}`
}

/** Sellers may be stored as a display name or a 0x address; render both nicely. */
export function displayParty(value?: string): string {
  if (!value) return "Unknown"
  return value.startsWith("0x") ? shortenAddress(value) : value
}
