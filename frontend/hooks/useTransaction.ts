import { useState } from "react"
import { ContractTransactionResponse } from "ethers"

interface TransactionState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: Error | null
  txHash: string | null
}

export function useTransaction() {
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    txHash: null,
  })

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null,
    })
  }

  const execute = async (
    transactionFn: () => Promise<ContractTransactionResponse>,
    options?: {
      onSuccess?: (receipt: any) => void
      onError?: (error: Error) => void
    }
  ) => {
    setState({
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null,
    })

    try {
      const tx = await transactionFn()
      
      setState(prev => ({
        ...prev,
        txHash: tx.hash,
      }))

      const receipt = await tx.wait()

      setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        txHash: tx.hash,
      })

      if (options?.onSuccess) {
        options.onSuccess(receipt)
      }

      return receipt
    } catch (error) {
      const err = error as Error
      
      setState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: err,
        txHash: null,
      })

      if (options?.onError) {
        options.onError(err)
      }

      throw error
    }
  }

  return {
    ...state,
    execute,
    reset,
  }
}
