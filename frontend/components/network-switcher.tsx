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
import { useToast } from "@/hooks/use-toast"

const HEDERA_TESTNET_CHAIN_ID = 296

const NETWORKS = [
  { chainId: HEDERA_TESTNET_CHAIN_ID, name: "Hedera Testnet" },
  { chainId: 295, name: "Hedera Mainnet" },
]

export function NetworkSwitcher() {
  const { chainId, isConnected, switchNetwork } = useWeb3()
  const { toast } = useToast()

  if (!isConnected) {
    return null
  }

  const currentNetwork = NETWORKS.find(n => n.chainId === chainId)
  const isCorrectNetwork = chainId === HEDERA_TESTNET_CHAIN_ID

  const handleSwitchNetwork = async (targetChainId: number) => {
    try {
      await switchNetwork(targetChainId)
    } catch (error) {
      toast({
        title: "Couldn't switch network",
        description:
          error instanceof Error
            ? error.message
            : "Please switch manually in your wallet.",
        variant: "destructive",
      })
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
            <div className="flex w-full items-center justify-between gap-2">
              <span>{network.name}</span>
              {chainId === network.chainId && <Badge variant="secondary">Active</Badge>}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
