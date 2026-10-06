"use client"

import type { ReactElement } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import {
  LucideIcon,
  CircleUserRound,
  CreditCard,
  ReceiptText,
  Settings,
  LogOut,
  User,
  LogIn,
} from "lucide-react"
import Link from "next/link"

type Props = {
  trigger: ReactElement
  defaultOpen?: boolean
  align?: "start" | "center" | "end"
}

type MenuItem = {
  label: string
  icon: LucideIcon
  destructive?: boolean
}

const PROFILE_ITEMS: MenuItem[] = [
  { label: "My Profile", icon: CircleUserRound },
  { label: "My Subscription", icon: CreditCard },
  { label: "My Invoice", icon: ReceiptText },
]

const SETTINGS_ITEMS: MenuItem[] = [
  { label: "Account Settings", icon: Settings },
]

const AUTH_ITEMS = [
  {
    label: "Sign In",
    icon: LogIn,
  },
  {
    label: "Sign up",
  },
]

const LOGOUT_ITEM: MenuItem = {
  label: "Signout",
  icon: LogOut,
  destructive: true,
}

const itemClass =
  "p-2 text-sm font-medium text-popover-foreground cursor-pointer gap-2"

const Dropdown = ({ trigger, defaultOpen, align = "center" }: Props) => {
  let user = null
  return (
    <div className="flex items-start justify-center">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger className="cursor-pointer">
          {trigger}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={"end"}
          className="w-3xs font-heading duration-400 data-open:fade-in-0 data-open:slide-in-from-bottom-20! data-closed:fade-out-0 data-closed:slide-out-to-bottom-20 data-closed:zoom-out-100"
        >
          <DropdownMenuGroup>
            {/* User Info */}
            {!user && (
              <>
                {AUTH_ITEMS.map(({ label }) => (
                  <DropdownMenuItem
                    key={label}
                    className={itemClass}
                    render={<Link href={"#"}>{label}</Link>}
                  ></DropdownMenuItem>
                ))}
              </>
            )}

            {user && (
              <DropdownMenuLabel className="flex items-center gap-3 px-4 py-3">
                <div className="relative">
                  <Avatar className="size-10">
                    <AvatarImage
                      src="https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                      alt="David McMichael"
                    />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <span className="absolute right-0 bottom-0 size-2 rounded-full bg-green-600 ring-2 ring-card" />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-popover-foreground">
                    David McMichael
                  </span>
                  <span className="text-sm text-muted-foreground">
                    david@shadcnspace.com
                  </span>
                </div>
              </DropdownMenuLabel>
            )}

            {user && (
              <div className="">
                <DropdownMenuSeparator />
                {/* Main Links */}
                {PROFILE_ITEMS.map(({ label, icon: Icon }) => (
                  <DropdownMenuItem key={label} className={itemClass}>
                    <Icon size={20} />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Settings */}
                <DropdownMenuGroup>
                  {SETTINGS_ITEMS.map(({ label, icon: Icon }) => (
                    <DropdownMenuItem key={label} className={itemClass}>
                      <Icon size={20} />
                      <span>{label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem variant="destructive" className={itemClass}>
                  <LOGOUT_ITEM.icon size={20} />
                  <span>{LOGOUT_ITEM.label}</span>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const AuthButton = () => {
  return (
    <Dropdown
      align="center"
      trigger={
        <div className="rounded-full">
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src="" />
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      }
    />
  )
}

export default AuthButton
