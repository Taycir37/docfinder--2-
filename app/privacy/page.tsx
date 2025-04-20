import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-docfinder-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
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
              Chez DocFinder, nous accordons une importance primordiale à la protection de vos données personnelles.
              Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons
              vos informations lorsque vous utilisez notre plateforme.
            </p>

            <h2>2. Données collectées</h2>
            <p>Nous collectons les types de données suivants :</p>
            <ul>
              <li>
                <strong>Données d'identification</strong> : nom, prénom, adresse email, numéro de téléphone.
              </li>
              <li>
                <strong>Données de santé</strong> : uniquement celles que vous choisissez de partager lors de la prise
                de rendez-vous (motif de consultation, antécédents médicaux).
              </li>
              <li>
                <strong>Données de connexion</strong> : adresse IP, type de navigateur, pages visitées.
              </li>
              <li>
                <strong>Données de rendez-vous</strong> : dates, heures et professionnels de santé consultés.
              </li>
            </ul>

            <h2>3. Finalités du traitement</h2>
            <p>Nous utilisons vos données personnelles pour :</p>
            <ul>
              <li>Vous permettre de créer et gérer votre compte DocFinder.</li>
              <li>Faciliter la prise de rendez-vous avec des professionnels de santé.</li>
              <li>Vous envoyer des rappels de rendez-vous et des informations importantes.</li>
              <li>Améliorer nos services et développer de nouvelles fonctionnalités.</li>
              <li>Assurer la sécurité de notre plateforme et prévenir les fraudes.</li>
            </ul>

            <h2>4. Base légale du traitement</h2>
            <p>Nous traitons vos données personnelles sur les bases légales suivantes :</p>
            <ul>
              <li>
                <strong>Exécution du contrat</strong> : pour vous fournir nos services conformément à nos conditions
                d'utilisation.
              </li>
              <li>
                <strong>Consentement</strong> : lorsque vous acceptez explicitement le traitement de vos données, par
                exemple pour recevoir nos communications marketing.
              </li>
              <li>
                <strong>Intérêt légitime</strong> : pour améliorer nos services et assurer la sécurité de notre
                plateforme.
              </li>
              <li>
                <strong>Obligation légale</strong> : lorsque la loi nous y oblige.
              </li>
            </ul>

            <h2>5. Destinataires des données</h2>
            <p>Vos données personnelles peuvent être partagées avec :</p>
            <ul>
              <li>
                <strong>Les professionnels de santé</strong> avec lesquels vous prenez rendez-vous, uniquement pour les
                informations nécessaires à la gestion de votre rendez-vous.
              </li>
              <li>
                <strong>Nos sous-traitants</strong> (hébergeurs, prestataires de services de paiement) qui agissent
                selon nos instructions et garantissent la sécurité de vos données.
              </li>
              <li>
                <strong>Les autorités publiques</strong>, uniquement lorsque la loi l'exige.
              </li>
            </ul>

            <h2>6. Durée de conservation</h2>
            <p>
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour vous fournir nos services ou
              pour respecter nos obligations légales.
            </p>
            <ul>
              <li>
                Les données de votre compte sont conservées tant que votre compte est actif. Vous pouvez demander la
                suppression de votre compte à tout moment.
              </li>
              <li>
                Les données relatives aux rendez-vous sont conservées pendant 5 ans à compter de la date du rendez-vous,
                conformément aux obligations légales en matière de santé.
              </li>
              <li>Les données de connexion sont conservées pendant 1 an.</li>
            </ul>

            <h2>7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              personnelles contre tout accès non autorisé, altération, divulgation ou destruction.
            </p>
            <p>
              Toutes les données de santé sont chiffrées et stockées sur des serveurs sécurisés conformes aux normes de
              sécurité les plus strictes.
            </p>

            <h2>8. Vos droits</h2>
            <p>Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
            <ul>
              <li>
                <strong>Droit d'accès</strong> : vous pouvez obtenir une copie de vos données personnelles que nous
                détenons.
              </li>
              <li>
                <strong>Droit de rectification</strong> : vous pouvez demander la correction de vos données inexactes ou
                incomplètes.
              </li>
              <li>
                <strong>Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données dans
                certaines circonstances.
              </li>
              <li>
                <strong>Droit à la limitation du traitement</strong> : vous pouvez demander la restriction du traitement
                de vos données.
              </li>
              <li>
                <strong>Droit à la portabilité</strong> : vous pouvez recevoir vos données dans un format structuré et
                les transférer à un autre responsable de traitement.
              </li>
              <li>
                <strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données pour des
                raisons tenant à votre situation particulière.
              </li>
            </ul>
            <p>
              Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : privacy@docfinder.fr ou via notre
              formulaire de contact.
            </p>

            <h2>9. Transferts internationaux de données</h2>
            <p>
              Vos données personnelles sont principalement traitées au sein de l'Union européenne. Si nous devons
              transférer vos données en dehors de l'UE, nous nous assurons que des garanties appropriées sont mises en
              place pour protéger vos données conformément à la réglementation applicable.
            </p>

            <h2>10. Cookies et technologies similaires</h2>
            <p>
              Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre
              plateforme. Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre{" "}
              <Link href="/cookies" className="text-blue-600 hover:underline">
                Politique de cookies
              </Link>
              .
            </p>

            <h2>11. Modifications de la politique de confidentialité</h2>
            <p>
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de
              tout changement important par email ou par une notification sur notre plateforme.
            </p>

            <h2>12. Contact</h2>
            <p>
              Si vous avez des questions concernant cette politique de confidentialité ou la façon dont nous traitons
              vos données personnelles, veuillez nous contacter à l'adresse suivante : privacy@docfinder.fr
            </p>
            <p>
              Vous avez également le droit d'introduire une réclamation auprès de la Commission Nationale de
              l'Informatique et des Libertés (CNIL) si vous estimez que le traitement de vos données personnelles
              constitue une violation de la réglementation applicable.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
