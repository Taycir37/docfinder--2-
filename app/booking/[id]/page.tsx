import { AppointmentCalendar } from "@/components/appointment-calendar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BookingPage({ params }: { params: { id: string } }) {
  const doctorId = Number.parseInt(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/doctors/${doctorId}`} className="text-gray-500 hover:text-blue-600">
              Profil du médecin
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Réservation</span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href={`/doctors/${doctorId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au profil
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Prendre rendez-vous</h1>
          <AppointmentCalendar doctorId={doctorId} />
        </div>
      </div>
    </div>
  )
}
