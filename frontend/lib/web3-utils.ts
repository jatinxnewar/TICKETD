import { formatEther, parseEther, formatUnits, parseUnits } from "ethers"

/**
 * Format Wei to Ether with specified decimals
 */
export function formatWeiToEther(wei: bigint | string, decimals: number = 4): string {
  const ether = formatEther(wei)
  return parseFloat(ether).toFixed(decimals)
}

/**
 * Parse Ether string to Wei
 */
export function parseEtherToWei(ether: string): bigint {
  return parseEther(ether)
}

/**
 * Format token amount with custom decimals
 */
export function formatTokenAmount(
  amount: bigint | string,
  decimals: number = 18,
  displayDecimals: number = 4
): string {
  const formatted = formatUnits(amount, decimals)
  return parseFloat(formatted).toFixed(displayDecimals)
}

/**
 * Parse token amount to raw units
 */
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  return parseUnits(amount, decimals)
}

/**
 * Shorten Ethereum address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return ""
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Get block explorer URL for address or transaction
 */
export function getExplorerUrl(
  chainId: number,
  type: "address" | "tx",
  value: string
): string {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io",
    11155111: "https://sepolia.etherscan.io",
    137: "https://polygonscan.com",
    80001: "https://mumbai.polygonscan.com",
    56: "https://bscscan.com",
    97: "https://testnet.bscscan.com",
  }

  const baseUrl = explorers[chainId] || explorers[1]
  return `${baseUrl}/${type}/${value}`
}

/**
 * Get network name from chain ID
 */
export function getNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: "Ethereum Mainnet",
    11155111: "Sepolia Testnet",
    137: "Polygon",
    80001: "Mumbai Testnet",
    56: "BSC",
    97: "BSC Testnet",
  }

  return networks[chainId] || `Unknown Network (${chainId})`
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

/**
 * Format transaction hash for display
 */
export function formatTxHash(hash: string, chars: number = 6): string {
  if (!hash) return ""
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`
}

/**
 * Convert gas price from Gwei to Wei
 */
export function gweiToWei(gwei: string): bigint {
  return parseUnits(gwei, "gwei")
}

/**
 * Convert gas price from Wei to Gwei
 */
export function weiToGwei(wei: bigint): string {
  return formatUnits(wei, "gwei")
}

/**
 * Calculate transaction cost in ETH
 */
export function calculateTxCost(gasUsed: bigint, gasPrice: bigint): string {
  const cost = gasUsed * gasPrice
  return formatWeiToEther(cost, 6)
}

/**
 * Add network to MetaMask
 */
export async function addNetwork(params: {
  chainId: number
  chainName: string
  rpcUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls?: string[]
}) {
  if (!window.ethereum) {
    throw new Error("No Ethereum wallet detected")
  }

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${params.chainId.toString(16)}`,
          chainName: params.chainName,
          rpcUrls: params.rpcUrls,
          nativeCurrency: params.nativeCurrency,
          blockExplorerUrls: params.blockExplorerUrls,
        },
      ],
    })
  } catch (error) {
    console.error("Failed to add network:", error)
    throw error
  }
}
