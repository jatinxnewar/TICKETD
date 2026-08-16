"use client"

import Image, { type ImageProps } from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const FALLBACK = "/placeholder.jpg"

type EventImageProps = Omit<ImageProps, "src" | "onError"> & {
  src?: string | null
}

/**
 * Event artwork with a fallback. Remote image hosts do remove photos, and a
 * bare <Image> renders broken-image chrome when that happens. Also fades in on
 * load so grids settle rather than popping.
 */
export function EventImage({ src, alt, className, ...props }: EventImageProps) {
  const [current, setCurrent] = useState(src || FALLBACK)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrent(src || FALLBACK)
    setLoaded(false)
  }, [src])

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => setCurrent(FALLBACK)}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-opacity duration-300",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  )
}
