"use client"

import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const HEDERA_TESTNET_CHAIN_ID = 296

export function NetworkSwitcher() {
  const { chainId, isConnected, switchNetwork } = useWeb3()

  if (!isConnected) {
    return null
  }

  const isCorrectNetwork = chainId === HEDERA_TESTNET_CHAIN_ID

  if (isCorrectNetwork) {
    return (
      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
        ✓ Hedera Testnet
      </Badge>
    )
  }

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(HEDERA_TESTNET_CHAIN_ID)
    } catch (error: any) {
      console.error("Failed to switch network:", error)
      alert(error.message || "Failed to switch network. Please switch manually in your wallet.")
    }
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Wrong Network</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Please switch to Hedera Testnet (Chain ID: 296)</span>
        <Button 
          onClick={handleSwitchNetwork} 
          size="sm" 
          variant="outline"
          className="ml-4"
        >
          Switch Network
        </Button>
      </AlertDescription>
    </Alert>
  )
}
