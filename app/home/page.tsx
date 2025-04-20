import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SearchForm } from "@/components/search-form"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturedDoctors } from "@/components/featured-doctors"
import { Testimonials } from "@/components/testimonials"
import { Specialties } from "@/components/specialties"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-elegant opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/doctor.png')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Trouvez le médecin idéal près de chez vous
              </h1>
              <p className="text-xl opacity-90 mb-8">
                DocFinder vous permet de trouver facilement des médecins disponibles dans votre région et de prendre
                rendez-vous en ligne en quelques clics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-docfinder-primary hover:bg-opacity-90 rounded-full">
                  <Link href="/search">Rechercher un médecin</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white bg-opacity-25 text-white font-semibold border-2 border-white hover:bg-opacity-40 rounded-full"
                >
                  <Link href="/register">Créer un compte</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl transform rotate-1">
                <Image src="doctor.png" alt="Consultation médicale" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-elegant p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-docfinder-primary">
            Trouvez un médecin près de chez vous
          </h2>
          <SearchForm />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-docfinder-primary">Comment ça marche</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Trouvez le médecin idéal et prenez rendez-vous en quelques étapes simples
        </p>
        <HowItWorks />
      </section>

      {/* Specialties Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-docfinder-primary">Nos spécialités médicales</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Explorez notre large éventail de spécialités médicales pour trouver le professionnel dont vous avez besoin
          </p>
          <Specialties />
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-elegant hover:opacity-90 rounded-full">
              <Link href="/search">Voir toutes les spécialités</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-docfinder-primary">Médecins recommandés</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Des professionnels de santé hautement qualifiés et recommandés par nos utilisateurs
        </p>
        <FeaturedDoctors />
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-docfinder-primary text-docfinder-primary hover:bg-docfinder-primary hover:text-white rounded-full"
          >
            <Link href="/search">Voir tous les médecins</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-soft py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-docfinder-primary">Ce que disent nos utilisateurs</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Découvrez les expériences de nos utilisateurs avec DocFinder
          </p>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-elegant text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à trouver votre médecin idéal ?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Rejoignez des milliers de patients qui ont déjà trouvé leur médecin grâce à DocFinder.
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
      </section>
    </div>
  )
}
