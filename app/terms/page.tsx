import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-docfinder-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Conditions d'utilisation</h1>
          <p className="text-blue-100 mt-2">Dernière mise à jour : 15 mars 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Bienvenue sur DocFinder. Les présentes Conditions d'utilisation régissent votre utilisation de notre site
              web et de nos services. En utilisant notre plateforme, vous acceptez ces conditions dans leur intégralité.
              Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser notre site.
            </p>

            <h2>2. Définitions</h2>
            <p>
              <strong>"DocFinder"</strong>, <strong>"nous"</strong>, <strong>"notre"</strong> ou <strong>"nos"</strong>{" "}
              désigne la société DocFinder SAS.
            </p>
            <p>
              <strong>"Utilisateur"</strong>, <strong>"vous"</strong>, <strong>"votre"</strong> ou{" "}
              <strong>"vos"</strong> désigne toute personne qui accède à notre plateforme.
            </p>
            <p>
              <strong>"Professionnel de santé"</strong> désigne tout médecin ou praticien inscrit sur notre plateforme.
            </p>
            <p>
              <strong>"Patient"</strong> désigne tout utilisateur qui prend rendez-vous avec un professionnel de santé
              via notre plateforme.
            </p>

            <h2>3. Services proposés</h2>
            <p>
              DocFinder est une plateforme qui permet aux patients de trouver des professionnels de santé et de prendre
              rendez-vous en ligne. Nous ne fournissons pas de services médicaux et ne sommes pas responsables des soins
              médicaux fournis par les professionnels de santé.
            </p>

            <h2>4. Inscription et compte</h2>
            <p>
              Pour utiliser certains services de DocFinder, vous devez créer un compte. Vous êtes responsable de
              maintenir la confidentialité de vos informations de connexion et de toutes les activités qui se produisent
              sous votre compte.
            </p>
            <p>
              Vous vous engagez à fournir des informations exactes, actuelles et complètes lors de votre inscription et
              à les maintenir à jour.
            </p>

            <h2>5. Rendez-vous médicaux</h2>
            <p>
              DocFinder facilite la prise de rendez-vous entre patients et professionnels de santé, mais n'est pas
              partie à la relation médicale qui s'établit entre eux.
            </p>
            <p>
              En cas d'annulation ou de modification d'un rendez-vous, veuillez respecter les délais indiqués par le
              professionnel de santé.
            </p>

            <h2>6. Tarifs et paiements</h2>
            <p>
              L'utilisation de base de DocFinder est gratuite pour les patients. Les professionnels de santé peuvent
              être soumis à des frais d'abonnement selon les services souscrits.
            </p>
            <p>
              Les honoraires médicaux sont fixés par les professionnels de santé et sont payés directement à ces
              derniers lors de la consultation.
            </p>

            <h2>7. Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur DocFinder (textes, images, logos, etc.) sont protégés par des droits de
              propriété intellectuelle et appartiennent à DocFinder ou à des tiers ayant autorisé DocFinder à les
              utiliser.
            </p>

            <h2>8. Protection des données personnelles</h2>
            <p>
              Nous accordons une grande importance à la protection de vos données personnelles. Pour plus d'informations
              sur la façon dont nous collectons, utilisons et protégeons vos données, veuillez consulter notre{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>

            <h2>9. Limitation de responsabilité</h2>
            <p>
              DocFinder n'est pas responsable des actes, omissions ou comportements des professionnels de santé
              référencés sur notre plateforme.
            </p>
            <p>
              Nous ne garantissons pas la disponibilité continue de notre service et ne sommes pas responsables des
              interruptions ou erreurs qui pourraient survenir.
            </p>

            <h2>10. Modification des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet
              dès leur publication sur notre site. Nous vous encourageons à consulter régulièrement cette page pour
              rester informé des mises à jour.
            </p>

            <h2>11. Loi applicable et juridiction compétente</h2>
            <p>
              Les présentes conditions sont régies par le droit français. Tout litige relatif à leur interprétation ou à
              leur exécution relève de la compétence des tribunaux français.
            </p>

            <h2>12. Contact</h2>
            <p>
              Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante
              : legal@docfinder.fr
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
