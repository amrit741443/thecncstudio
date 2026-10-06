import React, { ComponentType } from "react"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import { ArrowUpRight, LucideProps } from "lucide-react"

type ButtonVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | "link"
  | null
  | undefined

type ButtonSize = "sm" | "default" | "lg"

export interface CollaborateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  /** Optional icon component. Pass `null` or set `showIcon={false}` to hide the icon. */
  icon?: ComponentType<LucideProps> | null
  showIcon?: boolean
}

// Maps sizes to dynamic height, padding, and icon circle positioning
const sizeConfig: Record<
  ButtonSize,
  {
    buttonClass: string
    iconBoxClass: string
    iconSize: number
    hoverRightOffset: string
  }
> = {
  sm: {
    buttonClass: "h-8 text-xs ps-3 pe-9 hover:ps-9 hover:pe-3",
    iconBoxClass: "right-0.5 h-7 w-7",
    iconSize: 14,
    hoverRightOffset: "group-hover:right-[calc(100%-30px)]",
  },
  default: {
    buttonClass: "h-10 text-sm ps-4 pe-12 hover:ps-12 hover:pe-4",
    iconBoxClass: "right-1 h-8 w-8",
    iconSize: 16,
    hoverRightOffset: "group-hover:right-[calc(100%-36px)]",
  },
  lg: {
    buttonClass: "h-12 text-base ps-5 pe-14 hover:ps-14 hover:pe-5",
    iconBoxClass: "right-1 h-10 w-10",
    iconSize: 18,
    hoverRightOffset: "group-hover:right-[calc(100%-44px)]",
  },
}

// Style overrides so the sliding icon circle and text contrast properly per variant
const variantIconStyles: Record<string, { iconBg: string; hoverBg?: string }> =
  {
    default: {
      iconBg: "bg-background text-foreground",
      hoverBg: "hover:bg-primary/90",
    },
    secondary: {
      iconBg: "bg-primary text-primary-foreground",
      hoverBg: "hover:bg-secondary/80",
    },
    outline: {
      iconBg: "bg-primary text-primary-foreground",
      hoverBg: "hover:bg-accent hover:text-accent-foreground",
    },
    ghost: {
      iconBg: "bg-primary text-primary-foreground",
      hoverBg: "hover:bg-accent hover:text-accent-foreground",
    },
    destructive: {
      iconBg: "bg-background text-destructive",
      hoverBg: "hover:bg-destructive/90",
    },
    link: {
      iconBg: "bg-primary text-primary-foreground",
      hoverBg: "no-underline",
    },
  }

export const CollaborateButton = ({
  className,
  label,
  variant = "default",
  size = "default",
  icon: Icon = ArrowUpRight,
  showIcon = true,
  ...props
}: CollaborateButtonProps) => {
  const currentSize = sizeConfig[size] || sizeConfig.default
  const currentVariantStyle =
    variantIconStyles[variant || "default"] ?? variantIconStyles.default!

  const hasIcon = showIcon && Icon !== null

  return (
    <Button
      variant={variant}
      className={cn(
        "group relative w-fit overflow-hidden rounded-full p-1 font-medium transition-all duration-500",
        hasIcon && currentSize.buttonClass,
        hasIcon && currentVariantStyle.hoverBg,
        !hasIcon && "rounded-full px-5", // Fallback padding when icon is hidden
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-500 group-hover:cursor-pointer">
        {label}
      </span>

      {hasIcon && (
        <div
          className={cn(
            "absolute flex items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45",
            currentSize.iconBoxClass,
            currentSize.hoverRightOffset,
            currentVariantStyle.iconBg
          )}
        >
          <Icon size={currentSize.iconSize} />
        </div>
      )}
    </Button>
  )
}
