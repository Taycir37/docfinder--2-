"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Calendar, MessageSquare, Settings, LogOut } from "lucide-react"

const navItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Médecins",
    href: "/admin/doctors",
    icon: Users,
  },
  {
    title: "Rendez-vous",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Avis",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">DocFinder Admin</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center p-3 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors",
                  pathname === item.href && "bg-blue-50 text-blue-600 font-medium",
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center p-3 w-full rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
