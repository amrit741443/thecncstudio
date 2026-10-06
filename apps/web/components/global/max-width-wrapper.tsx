import { cn } from "@repo/ui/lib/utils"
import { ReactNode } from "react"

export const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-7xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  )
}
