import { DoctorsTable } from "@/components/admin/doctors-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDoctorsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des médecins</h1>
        <Button asChild>
          <Link href="/admin/doctors/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter un médecin
          </Link>
        </Button>
      </div>

      <DoctorsTable />
    </div>
  )
}
