"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Calendar, Truck, Package, FileCheck, Settings, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSidebar } from "./sidebar-context"

const routes = [
  {
    label: "Dashboard",
    icon: FileText,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Quotes",
    icon: FileText,
    href: "/quotes",
    color: "text-violet-500",
  },
  {
    label: "Bookings",
    icon: Calendar,
    href: "/bookings",
    color: "text-pink-700",
  },
  {
    label: "Shipments",
    icon: Truck,
    href: "/shipments",
    color: "text-orange-500",
  },
  {
    label: "Arrivals",
    icon: Package,
    href: "/arrivals",
    color: "text-emerald-500",
  },
  {
    label: "Invoices",
    icon: FileCheck,
    href: "/invoices",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isOpen } = useSidebar()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r transition-all duration-300 ease-in-out md:relative",
          isOpen ? "w-72" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn("px-6 py-6", !isOpen && "px-2")}>
            <h1 className={cn("text-2xl font-bold", !isOpen && "text-center text-sm")}>
              {isOpen ? "CRM System" : "CRM"}
            </h1>
          </div>
          <div className="flex-1 px-3 py-2">
            <nav className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    pathname === route.href
                      ? "bg-muted text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-primary",
                    !isOpen && "justify-center px-2",
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {isOpen && <span>{route.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                JD
              </div>
              {isOpen && (
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Sales Manager</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

