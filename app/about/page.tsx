import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Calendar, Star, Award, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-gradient-elegant text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">À propos de DocFinder</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Notre mission est de faciliter l'accès aux soins de santé en connectant les patients avec les meilleurs
            médecins près de chez eux.
          </p>
        </div>
      </div>

      {/* Notre histoire */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-docfinder-primary">Notre histoire</h2>
            <p className="text-gray-700 mb-4">
              DocFinder a été fondé en 2023 avec une vision claire : transformer la façon dont les patients trouvent et
              prennent rendez-vous avec des professionnels de santé.
            </p>
            <p className="text-gray-700 mb-4">
              Face aux difficultés que rencontrent de nombreux patients pour trouver rapidement un médecin disponible,
              notre équipe a développé une plateforme intuitive qui simplifie cette recherche et permet de prendre
              rendez-vous en quelques clics.
            </p>
            <p className="text-gray-700">
              Aujourd'hui, DocFinder est devenu une référence dans le domaine de la e-santé, connectant des milliers de
              patients avec des médecins qualifiés chaque jour.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elegant">
            <Image src="/interdisciplinary-care-huddle.png" alt="L'équipe DocFinder" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Nos valeurs */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-docfinder-primary">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="p-6 text-center">
                <div className="bg-docfinder-primary/10 text-docfinder-primary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-docfinder-primary">Accessibilité</h3>
                <p className="text-gray-600">
                  Nous croyons que l'accès aux soins de santé devrait être simple et rapide pour tous, quel que soit
                  l'endroit où vous vivez.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="p-6 text-center">
                <div className="bg-docfinder-secondary/10 text-docfinder-secondary h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-docfinder-secondary">Qualité</h3>
                <p className="text-gray-600">
                  Nous sélectionnons rigoureusement les professionnels de santé sur notre plateforme pour garantir des
                  soins de la plus haute qualité.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden group">
              <CardContent className="p-6 text-center">
                <div className="bg-docfinder-accent/10 text-docfinder-accent h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform group-hover:scale-110">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-docfinder-accent">Confidentialité</h3>
                <p className="text-gray-600">
                  La protection de vos données personnelles et médicales est notre priorité absolue. Vos informations
                  restent strictement confidentielles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chiffres clés */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-docfinder-primary">DocFinder en chiffres</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-elegant text-center group hover:shadow-card-hover transition-all duration-300">
            <div className="bg-docfinder-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <Users className="h-10 w-10 text-docfinder-primary" />
            </div>
            <div className="text-4xl font-bold text-docfinder-primary mb-2">3600+</div>
            <div className="text-gray-600">Utilisateurs actifs</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-elegant text-center group hover:shadow-card-hover transition-all duration-300">
            <div className="bg-docfinder-secondary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <CheckCircle className="h-10 w-10 text-docfinder-secondary" />
            </div>
            <div className="text-4xl font-bold text-docfinder-secondary mb-2">150+</div>
            <div className="text-gray-600">Médecins partenaires</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-elegant text-center group hover:shadow-card-hover transition-all duration-300">
            <div className="bg-docfinder-accent/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <Calendar className="h-10 w-10 text-docfinder-accent" />
            </div>
            <div className="text-4xl font-bold text-docfinder-accent mb-2">1200+</div>
            <div className="text-gray-600">Rendez-vous par mois</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-elegant text-center group hover:shadow-card-hover transition-all duration-300">
            <div className="bg-yellow-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform group-hover:scale-110">
              <Star className="h-10 w-10 text-yellow-500" />
            </div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">4.8/5</div>
            <div className="text-gray-600">Note moyenne</div>
          </div>
        </div>
      </div>

      {/* Notre équipe */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-docfinder-primary">Notre équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dupont",
                role: "Fondatrice & CEO",
                bio: "Ancienne médecin, Marie a fondé DocFinder pour résoudre les problèmes d'accès aux soins qu'elle observait au quotidien.",
                image: "/confident-leader.png",
              },
              {
                name: "Thomas Laurent",
                role: "CTO",
                bio: "Expert en technologies de la santé, Thomas supervise le développement technique de notre plateforme.",
                image: "/confident-tech-leader.png",
              },
              {
                name: "Sophie Martin",
                role: "Directrice Médicale",
                bio: "Cardiologue de formation, Sophie assure la qualité des services médicaux proposés sur DocFinder.",
                image: "/confident-female-physician.png",
              },
              {
                name: "Jean Petit",
                role: "Responsable Marketing",
                bio: "Avec plus de 10 ans d'expérience en marketing digital, Jean développe notre stratégie de croissance.",
                image: "/strategic-marketing-professional.png",
              },
              {
                name: "Claire Moreau",
                role: "Responsable Relations Médecins",
                bio: "Claire travaille directement avec notre réseau de médecins pour optimiser leur expérience sur la plateforme.",
                image: "/confident-executive.png",
              },
              {
                name: "Lucas Dubois",
                role: "Responsable Expérience Client",
                bio: "Lucas veille à ce que chaque patient bénéficie d'une expérience exceptionnelle sur DocFinder.",
                image: "/helpful-support-professional.png",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl group"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-docfinder-primary">{member.name}</h3>
                  <Badge className="mb-3 bg-docfinder-secondary/10 text-docfinder-secondary border-none">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-elegant text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez DocFinder aujourd'hui</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Trouvez le médecin idéal près de chez vous et prenez rendez-vous en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-docfinder-primary hover:bg-opacity-90 rounded-full">
              <Link href="/register">Créer un compte</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <Link href="/search">Rechercher un médecin</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
