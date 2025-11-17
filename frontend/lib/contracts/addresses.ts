/**
 * Smart Contract Deployment Addresses
 * 
 * Update these addresses after deploying contracts to each network
 */

export interface ContractAddresses {
  ticketNFT: string
  marketplace: string
}

export const CONTRACTS: Record<number, ContractAddresses> = {
  // Ethereum Mainnet
  1: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
  
  // Sepolia Testnet
  11155111: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
  
  // Polygon Mainnet
  137: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
  
  // Mumbai Testnet
  80001: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
  
  // BSC Mainnet
  56: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
  
  // BSC Testnet
  97: {
    ticketNFT: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
    marketplace: "0x0000000000000000000000000000000000000000", // TODO: Deploy and update
  },
}

/**
 * Get contract addresses for a specific chain
 */
export function getContractAddresses(chainId: number): ContractAddresses | null {
  return CONTRACTS[chainId] || null
}

/**
 * Check if contracts are deployed on a chain
 */
export function isChainSupported(chainId: number): boolean {
  const addresses = CONTRACTS[chainId]
  if (!addresses) return false
  
  // Check if addresses are not zero addresses
  return (
    addresses.ticketNFT !== "0x0000000000000000000000000000000000000000" &&
    addresses.marketplace !== "0x0000000000000000000000000000000000000000"
  )
}

/**
 * Get all supported chain IDs
 */
export function getSupportedChains(): number[] {
  return Object.keys(CONTRACTS)
    .map(Number)
    .filter(chainId => isChainSupported(chainId))
}

/**
 * Supported networks configuration
 */
export const SUPPORTED_NETWORKS = [
  {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    nativeCurrency: {
      name: "Sepolia ETH",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    chainId: 80001,
    name: "Mumbai Testnet",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  {
    chainId: 137,
    name: "Polygon",
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
]
