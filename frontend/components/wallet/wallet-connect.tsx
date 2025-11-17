"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Wallet, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function WalletConnect() {
  const { account, isConnected, connectWallet, disconnectWallet, balance, chainId } = useWeb3()

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} className="flex items-center space-x-2">
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </Button>
    )
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum"
      case 137:
        return "Polygon"
      case 5:
        return "Goerli"
      default:
        return "Unknown"
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
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">Connected Wallet</p>
          <p className="text-xs text-muted-foreground">{formatAddress(account!)}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <div className="flex justify-between items-center">
            <span className="text-sm">Balance:</span>
            <span className="text-sm font-medium">{balance} ETH</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm">Network:</span>
            <Badge variant="secondary" className="text-xs">
              {chainId ? getChainName(chainId) : "Unknown"}
            </Badge>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
