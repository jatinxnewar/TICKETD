"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { BrowserProvider, JsonRpcSigner, ethers, formatEther } from "ethers"

interface Web3ContextType {
  account: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  balance: string
  chainId: number | null
  provider: BrowserProvider | null
  signer: JsonRpcSigner | null
  switchNetwork: (chainId: number) => Promise<void>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState("0")
  const [chainId, setChainId] = useState<number | null>(null)
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)

  const updateBalance = async (address: string, prov: BrowserProvider) => {
    try {
      const balanceWei = await prov.getBalance(address)
      setBalance(parseFloat(formatEther(balanceWei)).toFixed(4))
    } catch (error) {
      console.error("Failed to fetch balance:", error)
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const browserProvider = new BrowserProvider(window.ethereum)
        await browserProvider.send("eth_requestAccounts", [])
        
        const userSigner = await browserProvider.getSigner()
        const address = await userSigner.getAddress()
        const network = await browserProvider.getNetwork()
        
        setProvider(browserProvider)
        setSigner(userSigner)
        setAccount(address)
        setChainId(Number(network.chainId))
        
        await updateBalance(address, browserProvider)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        throw error
      }
    } else {
      throw new Error("No Ethereum wallet detected. Please install MetaMask.")
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance("0")
    setChainId(null)
    setProvider(null)
    setSigner(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet detected")
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
    } catch (error: any) {
      // If the chain has not been added to MetaMask, add it
      if (error.code === 4902) {
        try {
          // Hedera Testnet configuration
          if (targetChainId === 296) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: "Hedera Testnet",
                nativeCurrency: {
                  name: "HBAR",
                  symbol: "HBAR",
                  decimals: 18,
                },
                rpcUrls: ["https://testnet.hashio.io/api"],
                blockExplorerUrls: ["https://hashscan.io/testnet"],
              }],
            })
          }
          // Hedera Mainnet configuration
          else if (targetChainId === 295) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: "Hedera Mainnet",
                nativeCurrency: {
                  name: "HBAR",
                  symbol: "HBAR",
                  decimals: 18,
                },
                rpcUrls: ["https://mainnet.hashio.io/api"],
                blockExplorerUrls: ["https://hashscan.io/mainnet"],
              }],
            })
          } else {
            throw new Error(`Chain ${targetChainId} not configured`)
          }
        } catch (addError) {
          throw new Error(`Failed to add chain ${targetChainId} to wallet`)
        }
      } else {
        throw error
      }
    }
  }

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const browserProvider = new BrowserProvider(window.ethereum)
          const accounts = await browserProvider.listAccounts()
          
          if (accounts.length > 0) {
            const address = accounts[0].address
            const network = await browserProvider.getNetwork()
            const userSigner = await browserProvider.getSigner()
            
            setProvider(browserProvider)
            setSigner(userSigner)
            setAccount(address)
            setChainId(Number(network.chainId))
            
            await updateBalance(address, browserProvider)
          }
        } catch (error) {
          console.error("Failed to initialize wallet:", error)
        }
      }
    }

    init()

    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
          if (provider) {
            await updateBalance(accounts[0], provider)
          }
        }
      })

      window.ethereum.on("chainChanged", (chainIdHex: string) => {
        setChainId(parseInt(chainIdHex, 16))
        window.location.reload()
      })

      return () => {
        window.ethereum.removeListener("accountsChanged", () => {})
        window.ethereum.removeListener("chainChanged", () => {})
      }
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
        provider,
        signer,
        switchNetwork,
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
