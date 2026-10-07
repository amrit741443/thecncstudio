import Image from "next/image"
import { cn } from "@repo/ui/lib/utils"

interface LogoProps {
  /** Custom classes for size/margins e.g. "h-8 w-auto" */
  className?: string
  /** Set to true if the logo is above the fold */
  priority?: boolean
}

export const Logo = ({ className = "", priority = true }: LogoProps) => {
  return (
    <div className="relative m-1 size-9 rounded-full bg-primary">
      <Image
        src="/logo/logo-white.png"
        alt="The CNC Studio Logo"
        layout="fill"
        priority={priority}
        className={cn("h-10 w-auto object-contain", className)}
      />
    </div>
  )
}
