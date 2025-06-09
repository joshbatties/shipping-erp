"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "./sidebar-context"

interface HeaderProps {
  title: string
  children?: React.ReactNode
}

export function Header({ title, children }: HeaderProps) {
  const { isOpen, toggle } = useSidebar()

  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggle} className="hidden md:flex">
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}
