"use client"

import { Button } from "@repo/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/navigation-menu"
import { cn } from "@repo/ui/lib/utils"
import { ArrowUpRight, Menu } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Search from "./search-command"
import AuthButton from "./user-button"
import { Logo } from "./logo"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { CollaborateButton } from "./cta-button"
import { usePathname } from "next/navigation"

export type NavigationSection = {
  title: string
  href: string
}

const navigationData: NavigationSection[] = [
  { title: "Home", href: "/" },
  { title: "Programs", href: "/programs" },
  { title: "Stories", href: "/stories" },
  { title: "About", href: "about" },
  { title: "Contact", href: "/contact" },
]

export const Navbar = () => {
  const [sticky, setSticky] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  console.log(pathname)
  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 10)
  }, [])

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleScroll, handleResize])

  return (
    <header className="relative w-full py-3.5">
      <MaxWidthWrapper>
        <nav
          className={cn(
            // Always fixed at the top, perfectly centered
            "fixed top-0 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-between gap-3.5 lg:gap-6",

            // Animate structural and style properties smoothly
            "transition-all duration-200 ease-out",

            sticky
              ? "top-4 w-[calc(100%-2rem)] max-w-7xl rounded-full border border-border/40 bg-background/60 p-2.5 shadow-2xl shadow-primary/5 backdrop-blur-lg"
              : "top-0 w-full max-w-7xl border-b border-transparent bg-transparent p-4 shadow-none backdrop-blur-none"
          )}
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Logo className="h-8 w-auto md:h-9" />
            <span className="hidden font-heading text-base font-bold sm:inline-block">
              Thecncstudio
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:block">
            <NavigationMenu className="rounded-full bg-muted/60 p-1">
              <NavigationMenuList className="flex gap-1">
                {navigationData.map((navItem) => (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className={cn(
                        "rounded-full px-3 py-1.5 font-heading text-xs font-medium text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-xs lg:px-4 lg:text-sm",
                        pathname == navItem.href &&
                          "bg-background text-foreground"
                      )}
                    >
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Component - Always Centered in Header Bar */}
          <div className="flex max-w-[140px] flex-1 justify-center sm:max-w-[220px] md:max-w-[260px] lg:flex-initial">
            <Search />
          </div>

          {/* Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTAs */}
            <div className="hidden items-center gap-3 lg:flex">
              <CollaborateButton label="Book a demo" />
              <AuthButton />
            </div>

            {/* Mobile Controls & Radix Sheet */}
            <div className="flex items-center gap-2 lg:hidden">
              <AuthButton />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 shrink-0 rounded-full"
                    >
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  }
                />

                <SheetContent
                  side="right"
                  className="flex w-[280px] flex-col justify-between sm:w-[350px]"
                >
                  <div>
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Logo className="h-8 w-auto md:h-9" />
                        <span className="font-heading text-base font-bold">
                          Thecncstudio
                        </span>
                      </SheetTitle>
                    </SheetHeader>

                    <nav className="mt-6 flex flex-col space-y-1">
                      {navigationData.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="border-t border-border pt-4">
                    <CollaborateButton
                      className="w-full justify-center"
                      label="Book a demo"
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}
