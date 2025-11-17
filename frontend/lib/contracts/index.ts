import { Contract } from "ethers"
import { useContract } from "@/hooks/useContract"
import { useTransaction } from "@/hooks/useTransaction"
import { TicketNFT_ABI, Marketplace_ABI } from "./abis"
import { getContractAddresses } from "./addresses"
import { useWeb3 } from "@/components/web3-provider"
import { parseEther } from "ethers"

/**
 * Hook to interact with TicketNFT contract
 */
export function useTicketNFT() {
  const { chainId } = useWeb3()
  const addresses = chainId ? getContractAddresses(chainId) : null
  const contract = useContract(addresses?.ticketNFT || null, TicketNFT_ABI)
  const { execute, isLoading, isSuccess, isError, error, txHash } = useTransaction()

  const createEvent = async (
    name: string,
    symbol: string,
    totalTickets: number,
    priceInEth: string,
    eventDate: number
  ) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.createEvent(
        name,
        symbol,
        totalTickets,
        parseEther(priceInEth),
        eventDate
      )
    })
  }

  const mintTicket = async (eventId: number, to: string, priceInEth: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.mintTicket(eventId, to, {
        value: parseEther(priceInEth),
      })
    })
  }

  const resellTicket = async (tokenId: number, priceInEth: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.resellTicket(tokenId, parseEther(priceInEth))
    })
  }

  const buyResaleTicket = async (tokenId: number, priceInEth: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.buyResaleTicket(tokenId, {
        value: parseEther(priceInEth),
      })
    })
  }

  const transferTicket = async (tokenId: number, to: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.transferTicket(tokenId, to)
    })
  }

  const validateTicket = async (tokenId: number) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.validateTicket(tokenId)
    })
  }

  // Read functions
  const getTicketInfo = async (tokenId: number) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getTicketInfo(tokenId)
  }

  const getEventInfo = async (eventId: number) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getEventInfo(eventId)
  }

  const getUserTickets = async (address: string) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getUserTickets(address)
  }

  const isTicketForSale = async (tokenId: number) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.isTicketForSale(tokenId)
  }

  const getResalePrice = async (tokenId: number) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getResalePrice(tokenId)
  }

  return {
    contract,
    // Write functions
    createEvent,
    mintTicket,
    resellTicket,
    buyResaleTicket,
    transferTicket,
    validateTicket,
    // Read functions
    getTicketInfo,
    getEventInfo,
    getUserTickets,
    isTicketForSale,
    getResalePrice,
    // Transaction state
    isLoading,
    isSuccess,
    isError,
    error,
    txHash,
  }
}

/**
 * Hook to interact with Marketplace contract
 */
export function useMarketplace() {
  const { chainId } = useWeb3()
  const addresses = chainId ? getContractAddresses(chainId) : null
  const contract = useContract(addresses?.marketplace || null, Marketplace_ABI)
  const { execute, isLoading, isSuccess, isError, error, txHash } = useTransaction()

  const createListing = async (tokenId: number, priceInEth: string, durationInDays: number) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.createListing(
        tokenId,
        parseEther(priceInEth),
        durationInDays * 24 * 60 * 60 // Convert days to seconds
      )
    })
  }

  const buyListing = async (listingId: number, priceInEth: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.buyListing(listingId, {
        value: parseEther(priceInEth),
      })
    })
  }

  const cancelListing = async (listingId: number) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.cancelListing(listingId)
    })
  }

  const createAuction = async (
    tokenId: number,
    startPriceInEth: string,
    minIncrementInEth: string,
    durationInDays: number
  ) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.createAuction(
        tokenId,
        parseEther(startPriceInEth),
        parseEther(minIncrementInEth),
        durationInDays * 24 * 60 * 60
      )
    })
  }

  const placeBid = async (auctionId: number, bidInEth: string) => {
    if (!contract) throw new Error("Contract not initialized")

    return execute(async () => {
      return await contract.placeBid(auctionId, {
        value: parseEther(bidInEth),
      })
    })
  }

  // Read functions
  const getListing = async (listingId: number) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getListing(listingId)
  }

  const getActiveListings = async () => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getActiveListings()
  }

  const getUserListings = async (address: string) => {
    if (!contract) throw new Error("Contract not initialized")
    return await contract.getUserListings(address)
  }

  return {
    contract,
    // Write functions
    createListing,
    buyListing,
    cancelListing,
    createAuction,
    placeBid,
    // Read functions
    getListing,
    getActiveListings,
    getUserListings,
    // Transaction state
    isLoading,
    isSuccess,
    isError,
    error,
    txHash,
  }
}
