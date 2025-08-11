"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Web3ContextType {
  account: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  balance: string
  chainId: number | null
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState("0")
  const [chainId, setChainId] = useState<number | null>(null)

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setAccount(accounts[0])

        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0], "latest"],
        })
        setBalance((Number.parseInt(balance, 16) / 1e18).toFixed(4))

        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        })
        setChainId(Number.parseInt(chainId, 16))
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance("0")
    setChainId(null)
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      })
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected: !!account,
        connectWallet,
        disconnectWallet,
        balance,
        chainId,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

declare global {
  interface Window {
    ethereum?: any
  }
}
