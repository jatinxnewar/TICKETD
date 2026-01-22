"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Loader2, ExternalLink, Wallet, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventTitle: string
  ticketType: string
  price: string
  onSuccess: (txHash: string, tokenId: string) => void
}

export function TransactionModal({
  open,
  onOpenChange,
  eventTitle,
  ticketType,
  price,
  onSuccess,
}: TransactionModalProps) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'confirming' | 'processing' | 'success' | 'error'>('idle')
  const [txHash, setTxHash] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (open && status === 'idle') {
      handlePurchase()
    }
  }, [open])

  const handlePurchase = async () => {
    try {
      // Step 1: Connect to MetaMask
      setStatus('connecting')
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check if MetaMask is installed
      if (typeof window !== 'undefined' && !(window as any).ethereum) {
        setError('MetaMask is not installed. Please install MetaMask to continue.')
        setStatus('error')
        return
      }

      // Step 2: Request MetaMask confirmation
      setStatus('confirming')
      
      // Simulate MetaMask popup
      const accounts = await (window as any).ethereum.request({ 
        method: 'eth_requestAccounts' 
      }).catch(() => {
        throw new Error('User rejected the request')
      })

      await new Promise(resolve => setTimeout(resolve, 2000))

      // Step 3: Process transaction
      setStatus('processing')
      
      // Simulate blockchain transaction
      const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66)
      const mockTokenId = '#' + Math.floor(Math.random() * 10000)
      
      setTxHash(mockTxHash)
      setTokenId(mockTokenId)

      await new Promise(resolve => setTimeout(resolve, 3000))

      // Step 4: Success
      setStatus('success')
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess(mockTxHash, mockTokenId)
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Transaction failed. Please try again.')
      setStatus('error')
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'connecting':
      case 'confirming':
      case 'processing':
        return <Loader2 className="h-12 w-12 text-primary animate-spin" />
      case 'success':
        return <CheckCircle2 className="h-12 w-12 text-green-500" />
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-500" />
      default:
        return <Wallet className="h-12 w-12 text-primary" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting to MetaMask...'
      case 'confirming':
        return 'Waiting for confirmation...'
      case 'processing':
        return 'Processing transaction...'
      case 'success':
        return 'Transaction successful!'
      case 'error':
        return 'Transaction failed'
      default:
        return 'Initializing...'
    }
  }

  const getStatusDescription = () => {
    switch (status) {
      case 'connecting':
        return 'Opening MetaMask wallet connection'
      case 'confirming':
        return 'Please confirm the transaction in MetaMask'
      case 'processing':
        return 'Your ticket NFT is being minted on the blockchain'
      case 'success':
        return 'Your ticket has been successfully minted and added to your wallet'
      case 'error':
        return error
      default:
        return ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
          <DialogDescription>
            Confirm your ticket purchase on the blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Icon */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-primary/10 rounded-full">
              {getStatusIcon()}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{getStatusText()}</h3>
              <p className="text-sm text-muted-foreground mt-1">{getStatusDescription()}</p>
            </div>
          </div>

          {/* Transaction Details */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Event</span>
                <span className="font-medium">{eventTitle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ticket Type</span>
                <span className="font-medium">{ticketType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-bold text-primary">₹{price}</span>
              </div>
              {tokenId && (
                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="text-muted-foreground">Token ID</span>
                  <Badge variant="secondary">{tokenId}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Steps */}
          {status !== 'error' && (
            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm ${
                ['connecting', 'confirming', 'processing', 'success'].includes(status) 
                  ? 'text-foreground' 
                  : 'text-muted-foreground'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  ['connecting', 'confirming', 'processing', 'success'].includes(status)
                    ? 'bg-primary'
                    : 'bg-muted-foreground'
                }`} />
                <span>Connect wallet</span>
                {['confirming', 'processing', 'success'].includes(status) && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                )}
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                ['confirming', 'processing', 'success'].includes(status)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  ['confirming', 'processing', 'success'].includes(status)
                    ? 'bg-primary'
                    : 'bg-muted-foreground'
                }`} />
                <span>Confirm transaction</span>
                {['processing', 'success'].includes(status) && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                )}
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                ['processing', 'success'].includes(status)
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  ['processing', 'success'].includes(status)
                    ? 'bg-primary'
                    : 'bg-muted-foreground'
                }`} />
                <span>Mint NFT ticket</span>
                {status === 'success' && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />
                )}
              </div>
            </div>
          )}

          {/* Transaction Hash */}
          {txHash && status === 'success' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Hash</label>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <code className="text-xs flex-1 truncate">{txHash}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {status === 'success' && (
              <>
                <Button
                  className="flex-1"
                  onClick={() => {
                    onOpenChange(false)
                    window.location.href = '/dashboard'
                  }}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  View in Wallet
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
              </>
            )}
            {status === 'error' && (
              <>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setStatus('idle')
                    setError('')
                    handlePurchase()
                  }}
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </>
            )}
            {['connecting', 'confirming', 'processing'].includes(status) && (
              <Button
                className="w-full"
                disabled
              >
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
