import { DoctorForm } from "@/components/admin/doctor-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewDoctorPage() {
  return (
    <div>
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/admin/doctors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Ajouter un nouveau médecin</h1>
        <DoctorForm />
      </div>
    </div>
  )
}
