import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page non trouvée</h2>
        <p className="text-xl text-gray-600 max-w-lg mx-auto mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/search">
              <Search className="mr-2 h-5 w-5" />
              Rechercher un médecin
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Nous contacter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
