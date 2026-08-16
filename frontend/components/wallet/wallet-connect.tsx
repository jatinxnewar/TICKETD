"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Wallet, LogOut, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { shortenAddress } from "@/lib/user"

export function WalletConnect() {
  const { account, isConnected, connectWallet, disconnectWallet, balance, chainId } = useWeb3()
  const [connecting, setConnecting] = useState(false)
  const { toast } = useToast()

  // connectWallet rejects when no wallet is installed or the user cancels the
  // MetaMask prompt; unhandled, that surfaces as a console error and no feedback.
  const handleConnect = async () => {
    setConnecting(true)
    try {
      await connectWallet()
    } catch (error) {
      toast({
        title: "Couldn't connect wallet",
        description:
          error instanceof Error ? error.message : "Please try again from your wallet extension.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  if (!isConnected) {
    return (
      <Button onClick={handleConnect} disabled={connecting} className="flex items-center gap-2">
        {connecting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Wallet className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{connecting ? "Connecting…" : "Connect Wallet"}</span>
        <span className="sm:hidden">{connecting ? "…" : "Connect"}</span>
      </Button>
    )
  }

  const formatAddress = shortenAddress

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum"
      case 137:
        return "Polygon"
      case 5:
        return "Goerli"
      case 11155111:
        return "Sepolia"
      case 80001:
        return "Mumbai"
      case 296:
        return "Hedera Testnet"
      case 295:
        return "Hedera Mainnet"
      default:
        return `Chain ${chainId}`
    }
  }

  const getCurrencySymbol = (chainId: number) => {
    switch (chainId) {
      case 137:
      case 80001:
        return "MATIC"
      case 1:
      case 5:
      case 11155111:
        return "ETH"
      default:
        return "HBAR"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Wallet className="h-4 w-4" />
          <span>{formatAddress(account!)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Connected wallet</p>
          <p className="font-mono text-xs text-muted-foreground">{formatAddress(account!)}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="space-y-2 px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="text-sm font-medium tabular-nums">
              {balance} {chainId ? getCurrencySymbol(chainId) : "HBAR"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network</span>
            <Badge variant="secondary" className="text-xs">
              {chainId ? getChainName(chainId) : "Unknown"}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
