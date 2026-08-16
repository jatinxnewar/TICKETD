"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Loader2, AlertCircle, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatINR } from "@/lib/utils"

type Status = "idle" | "authorising" | "processing" | "issuing" | "success" | "error"

const STEPS: { key: Status; label: string }[] = [
  { key: "authorising", label: "Authorising payment" },
  { key: "processing", label: "Confirming transaction" },
  { key: "issuing", label: "Issuing your ticket" },
]

const COPY: Record<Status, { title: string; description: string }> = {
  idle: { title: "Preparing checkout", description: "Setting things up…" },
  authorising: { title: "Authorising payment", description: "Confirming your payment details." },
  processing: { title: "Confirming transaction", description: "This usually takes a few seconds." },
  issuing: { title: "Issuing your ticket", description: "Registering the ticket to your account." },
  success: { title: "Payment successful", description: "Your ticket has been added to your account." },
  error: { title: "Payment failed", description: "" },
}

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventTitle: string
  ticketType: string
  price: string
  quantity?: number
  /** Rejecting puts the modal into its error state, so callers must not swallow failures. */
  onSuccess: (txHash: string, tokenId: string) => void | Promise<void>
}

export function TransactionModal({
  open,
  onOpenChange,
  eventTitle,
  ticketType,
  price,
  quantity = 1,
  onSuccess,
}: TransactionModalProps) {
  const [status, setStatus] = useState<Status>("idle")
  const [reference, setReference] = useState("")
  const [error, setError] = useState("")
  // Guards against React 18 StrictMode double-invoking the start effect.
  const runningRef = useRef(false)

  const total = (parseFloat(price) || 0) * quantity

  const run = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true

    setError("")
    try {
      setStatus("authorising")
      await wait(900)

      setStatus("processing")
      await wait(1100)

      const txReference = "TXN" + Math.random().toString(36).slice(2, 12).toUpperCase()
      const tokenId = String(Math.floor(Math.random() * 9000) + 1000)
      setReference(txReference)

      setStatus("issuing")
      await wait(700)

      // If the caller's write fails, the purchase did not happen — surface it
      // instead of showing a success screen for a ticket that was never issued.
      await onSuccess(txReference, tokenId)
      setStatus("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setStatus("error")
    } finally {
      runningRef.current = false
    }
  }, [onSuccess])

  useEffect(() => {
    if (open) {
      setStatus("idle")
      setReference("")
      setError("")
      run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const inProgress = status === "authorising" || status === "processing" || status === "issuing"
  const currentIndex = STEPS.findIndex(s => s.key === status)

  return (
    <Dialog
      open={open}
      onOpenChange={next => {
        // Don't let a click-away abandon an in-flight payment.
        if (!next && inProgress) return
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{COPY[status].title}</DialogTitle>
          <DialogDescription>
            {status === "error" ? error || "Something went wrong." : COPY[status].description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex justify-center" role="status" aria-live="polite">
            <span
              className={`rounded-full p-4 ${
                status === "success"
                  ? "bg-success-subtle"
                  : status === "error"
                  ? "bg-destructive/10"
                  : "bg-primary/10"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
              ) : status === "error" ? (
                <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
              ) : (
                <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
              )}
            </span>
            <span className="sr-only">{COPY[status].title}</span>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-2.5 text-sm">
              <Row label="Event" value={eventTitle} />
              <Row label="Ticket" value={`${ticketType}${quantity > 1 ? ` × ${quantity}` : ""}`} />
              <div className="flex items-baseline justify-between border-t pt-2.5">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-primary tabular-nums">{formatINR(total)}</span>
              </div>
              {reference && (
                <div className="flex items-center justify-between border-t pt-2.5">
                  <span className="text-muted-foreground">Reference</span>
                  <Badge variant="secondary" className="font-mono">{reference}</Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {status !== "error" && (
            <ol className="space-y-2">
              {STEPS.map((step, index) => {
                const done = status === "success" || (currentIndex > -1 && index < currentIndex)
                const active = step.key === status
                return (
                  <li
                    key={step.key}
                    className={`flex items-center gap-2 text-sm ${
                      done || active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" aria-hidden="true" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <span className="h-4 w-4 flex items-center justify-center flex-shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      </span>
                    )}
                    {step.label}
                  </li>
                )
              })}
            </ol>
          )}

          {inProgress && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Secured demo checkout — no real payment is taken.
            </p>
          )}

          <div className="flex gap-2">
            {status === "success" && (
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            )}
            {status === "error" && (
              <>
                <Button className="flex-1" onClick={run}>
                  Try again
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </>
            )}
            {inProgress && (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Please wait…
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground flex-shrink-0">{label}</span>
      <span className="font-medium text-right truncate">{value}</span>
    </div>
  )
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
