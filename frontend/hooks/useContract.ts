import { useState, useEffect } from "react"
import { Contract, InterfaceAbi } from "ethers"
import { useWeb3 } from "@/components/web3-provider"

export function useContract(address: string | null, abi: InterfaceAbi) {
  const { signer, provider, isConnected } = useWeb3()
  const [contract, setContract] = useState<Contract | null>(null)

  useEffect(() => {
    if (!address || !abi) {
      setContract(null)
      return
    }

    try {
      if (signer) {
        // Use signer for write operations
        const contractInstance = new Contract(address, abi, signer)
        setContract(contractInstance)
      } else if (provider) {
        // Use provider for read-only operations
        const contractInstance = new Contract(address, abi, provider)
        setContract(contractInstance)
      } else {
        setContract(null)
      }
    } catch (error) {
      console.error("Failed to initialize contract:", error)
      setContract(null)
    }
  }, [address, abi, signer, provider, isConnected])

  return contract
}
