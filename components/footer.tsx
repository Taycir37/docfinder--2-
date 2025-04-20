import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-docfinder-primary-dark to-docfinder-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">DocFinder</h3>
            <p className="mb-4 text-white/80">
              Trouvez le médecin idéal près de chez vous, prenez rendez-vous en ligne et consultez les avis des
              patients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-white/80 hover:text-white transition-colors">
                  Rechercher un médecin
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Spécialités</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/search?specialty=Médecin%20généraliste"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Médecin généraliste
                </Link>
              </li>
              <li>
                <Link href="/search?specialty=Cardiologue" className="text-white/80 hover:text-white transition-colors">
                  Cardiologue
                </Link>
              </li>
              <li>
                <Link
                  href="/search?specialty=Dermatologue"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Dermatologue
                </Link>
              </li>
              <li>
                <Link href="/search?specialty=Pédiatre" className="text-white/80 hover:text-white transition-colors">
                  Pédiatre
                </Link>
              </li>
              <li>
                <Link href="/search?specialty=Dentiste" className="text-white/80 hover:text-white transition-colors">
                  Dentiste
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-docfinder-secondary" />
                <a href="mailto:contact@docfinder.fr" className="text-white/80 hover:text-white transition-colors">
                  contact@docfinder.fr
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-docfinder-secondary" />
                <a href="tel:+33123456789" className="text-white/80 hover:text-white transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-sm text-center">
          <p className="text-white/80">&copy; {new Date().getFullYear()} DocFinder. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
