"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, ExternalLink, Clock } from "lucide-react"
import { getExplorerUrl, formatTxHash } from "@/lib/web3-utils"

interface TransactionStatusProps {
  status: "pending" | "success" | "error" | "confirming"
  txHash?: string
  chainId?: number
  error?: string
  confirmations?: number
  requiredConfirmations?: number
}

export function TransactionStatus({
  status,
  txHash,
  chainId = 1,
  error,
  confirmations = 0,
  requiredConfirmations = 2,
}: TransactionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Loader2 className="h-5 w-5 animate-spin" />,
          title: "Transaction Pending",
          description: "Waiting for wallet confirmation...",
          variant: "default" as const,
        }
      case "confirming":
        return {
          icon: <Clock className="h-5 w-5 animate-pulse" />,
          title: "Confirming Transaction",
          description: `${confirmations}/${requiredConfirmations} confirmations`,
          variant: "default" as const,
        }
      case "success":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          title: "Transaction Successful",
          description: "Your transaction has been confirmed",
          variant: "default" as const,
        }
      case "error":
        return {
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          title: "Transaction Failed",
          description: error || "The transaction was rejected or failed",
          variant: "destructive" as const,
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Alert variant={config.variant} className="border-2">
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{config.title}</p>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
            {status !== "pending" && txHash && (
              <Badge variant="outline">
                <a
                  href={getExplorerUrl(chainId, "tx", txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  View <ExternalLink className="h-3 w-3" />
                </a>
              </Badge>
            )}
          </div>
          
          {txHash && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">TX:</span>
              <code className="text-xs bg-muted px-2 py-0.5 rounded">
                {formatTxHash(txHash, 8)}
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => navigator.clipboard.writeText(txHash)}
              >
                Copy
              </Button>
            </div>
          )}

          {status === "confirming" && (
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${(confirmations / requiredConfirmations) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Alert>
  )
}
