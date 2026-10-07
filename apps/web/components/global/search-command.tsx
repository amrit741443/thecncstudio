"use client"

import * as React from "react"
import {
  SearchIcon,
  LayoutDashboardIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  ZapIcon,
  SettingsIcon,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@repo/ui/components/button"
import { Kbd } from "@repo/ui/components/kbd"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@repo/ui/components/command"

export interface CommandSearchItem {
  label: string
  icon?: LucideIcon
  timestamp?: string
  onSelect?: () => void
}

export interface CommandSearchGroup {
  heading: string
  items: CommandSearchItem[]
}

export interface CommandSearchProps {
  buttonLabel?: string
  placeholder?: string
  emptyMessage?: string
  showSeparators?: boolean
  groups?: CommandSearchGroup[]
}

const defaultGroups: CommandSearchGroup[] = [
  {
    heading: "Suggestions",
    items: [
      { label: "Dashboard", icon: LayoutDashboardIcon },
      { label: "Analytics", icon: TrendingUpIcon },
      { label: "Projects", icon: BriefcaseIcon },
      { label: "Integrations", icon: ZapIcon },
      { label: "Settings", icon: SettingsIcon },
    ],
  },
]

const Search = ({
  buttonLabel = "Search...",
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  showSeparators = true,
  groups = defaultGroups,
}: CommandSearchProps) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((open) => !open)
      }
    }

    window.addEventListener("keydown", down)
    return () => window.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex w-full items-center justify-center p-1 sm:p-0">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="relative flex w-full max-w-sm items-center justify-start gap-2 rounded-lg border-slate-200 bg-background text-sm font-normal text-muted-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:w-64"
      >
        <SearchIcon className="h-4 w-4 shrink-0 opacity-60" />
        <span className="inline-block truncate">{buttonLabel}</span>
        <Kbd className="pointer-events-none absolute right-2.5 hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </Kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        // Responsive modal container override to guarantee centering on mobile & desktop
        className="fixed top-[50%] left-[50%] z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-0 shadow-lg duration-200"
      >
        <Command className="rounded-xl border-none shadow-none">
          <CommandInput
            placeholder={placeholder}
            className="h-12 border-none focus:ring-0"
          />
          <CommandList className="max-h-[300px] overflow-y-auto px-1 py-1.5 sm:max-h-[380px]">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </CommandEmpty>
            {groups.map((group, index) => (
              <React.Fragment key={group.heading}>
                {showSeparators && index > 0 && (
                  <CommandSeparator className="my-1" />
                )}
                <CommandGroup heading={group.heading} className="px-1 py-1">
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.label}
                      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                      onSelect={() => {
                        item.onSelect?.()
                        setOpen(false)
                      }}
                    >
                      {item.icon && (
                        <item.icon
                          className={`h-4 w-4 shrink-0 ${
                            item.timestamp ? "text-muted-foreground" : ""
                          }`}
                        />
                      )}
                      <span className="truncate">{item.label}</span>
                      {item.timestamp && (
                        <div
                          className="ml-auto text-xs text-muted-foreground"
                          data-slot="command-shortcut"
                        >
                          <span>{item.timestamp}</span>
                        </div>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

export default Search
