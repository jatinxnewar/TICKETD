import type { ReactNode } from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  /** Trailing slot, typically a "view all" button. Hidden on small screens. */
  action?: ReactNode
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div className="space-y-2">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
        )}
        <h2 className="text-display-sm font-bold">{title}</h2>
        {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="hidden flex-shrink-0 md:block">{action}</div>}
    </div>
  )
}
