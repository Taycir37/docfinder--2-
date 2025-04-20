import { AdminDashboard } from "@/components/admin/dashboard"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-docfinder-primary to-docfinder-secondary p-6 text-white">
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">
            <AdminDashboard />
          </main>
        </div>
      </div>
    </div>
  )
}
