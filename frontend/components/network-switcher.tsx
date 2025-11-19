"use client"

import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Network } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const HEDERA_TESTNET_CHAIN_ID = 296
const HEDERA_MAINNET_CHAIN_ID = 295

const NETWORKS = [
  {
    chainId: 296,
    name: "Hedera Testnet",
    icon: "🌐",
    rpc: "https://testnet.hashio.io/api",
  },
  {
    chainId: 295,
    name: "Hedera Mainnet",
    icon: "🌐",
    rpc: "https://mainnet.hashio.io/api",
  },
]

export function NetworkSwitcher() {
  const { chainId, isConnected, switchNetwork } = useWeb3()

  if (!isConnected) {
    return null
  }

  const currentNetwork = NETWORKS.find(n => n.chainId === chainId)
  const isCorrectNetwork = chainId === HEDERA_TESTNET_CHAIN_ID

  const handleSwitchNetwork = async (targetChainId: number) => {
    try {
      await switchNetwork(targetChainId)
    } catch (error: any) {
      console.error("Failed to switch network:", error)
      alert(error.message || "Failed to switch network. Please switch manually in your wallet.")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={isCorrectNetwork ? "default" : "destructive"} 
          size="sm"
          className="hidden md:flex items-center gap-2"
        >
          {isCorrectNetwork ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Hedera Testnet</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              <span>{currentNetwork?.name || `Chain ${chainId}`}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NETWORKS.map((network) => (
          <DropdownMenuItem
            key={network.chainId}
            onClick={() => handleSwitchNetwork(network.chainId)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span>{network.icon}</span>
                <span>{network.name}</span>
              </div>
              {chainId === network.chainId && (
                <Badge variant="secondary" className="ml-2">Active</Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
