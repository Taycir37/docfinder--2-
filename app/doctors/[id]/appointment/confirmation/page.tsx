import Link from "next/link"
import { CheckCircle, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-20 w-20 rounded-full bg-docfinder-accent flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-docfinder-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-docfinder-primary mb-4">Rendez-vous confirmé !</h2>

        <p className="text-lg text-gray-600 mb-8">
          Votre rendez-vous a été enregistré avec succès. Vous recevrez bientôt un email de confirmation avec tous les
          détails.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-teal-600 mr-2" />
            <span className="text-lg font-medium">Détails du rendez-vous</span>
          </div>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Médecin:</span> Dr. Leila Ben Ali
            </p>
            <p>
              <span className="font-medium">Date:</span> Lundi 15 mai 2023
            </p>
            <p>
              <span className="font-medium">Heure:</span> 14:30
            </p>
            <p>
              <span className="font-medium">Adresse:</span> Avenue Habib Bourguiba, Tunis
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href={`/doctors/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au profil du médecin
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
