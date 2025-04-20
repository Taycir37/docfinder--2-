import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Clock, Calendar, Mail, Globe, Award, Bookmark, ThumbsUp } from "lucide-react"
import { DoctorReviews } from "@/components/doctor-reviews"
import { AppointmentCalendar } from "@/components/appointment-calendar"

// Mock data - would be fetched from API in real app
const doctor = {
  id: 1,
  name: "Dr. Sophie Martin",
  specialty: "Cardiologue",
  rating: 4.9,
  reviews: 124,
  address: "15 rue de la Paix, Paris",
  phone: "01 23 45 67 89",
  email: "dr.martin@docfinder.com",
  website: "www.dr-martin-cardio.fr",
  availability: "Disponible aujourd'hui",
  hours: {
    monday: "9h00 - 18h00",
    tuesday: "9h00 - 18h00",
    wednesday: "9h00 - 12h00",
    thursday: "9h00 - 18h00",
    friday: "9h00 - 17h00",
    saturday: "Fermé",
    sunday: "Fermé",
  },
  education: [
    "Doctorat en Médecine, Université Paris Descartes (2010)",
    "Spécialisation en Cardiologie, Hôpital Européen Georges Pompidou (2015)",
  ],
  experience: [
    "Cardiologue, Hôpital de la Pitié-Salpêtrière (2015-2020)",
    "Cardiologue en cabinet privé (depuis 2020)",
  ],
  languages: ["Français", "Anglais", "Espagnol"],
  services: [
    "Consultation cardiologique",
    "Électrocardiogramme (ECG)",
    "Échocardiographie",
    "Test d'effort",
    "Holter tensionnel et ECG",
  ],
  insurance: ["CPAM", "MGEN", "Harmonie Mutuelle", "Allianz", "AXA"],
  bio: "Spécialiste en cardiologie interventionnelle avec plus de 10 ans d'expérience. Je m'engage à fournir des soins personnalisés et de haute qualité à tous mes patients. Ma pratique se concentre sur la prévention, le diagnostic et le traitement des maladies cardiovasculaires.",
  image: "/placeholder.svg?height=500&width=500",
}

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
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
            <Link href="/search" className="text-gray-500 hover:text-blue-600">
              Recherche
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{doctor.name}</span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Doctor profile header */}
          <div className="bg-gradient-to-r from-docfinder-primary to-docfinder-secondary text-white p-6">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white mx-auto md:mx-0 mb-6 md:mb-0">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
              <div className="md:ml-8 text-center md:text-left">
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
                <p className="text-xl text-blue-100 mb-4">{doctor.specialty}</p>

                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{doctor.rating}</span>
                  <span className="ml-1 text-blue-100">({doctor.reviews} avis)</span>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge className="bg-docfinder-primary hover:bg-docfinder-secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    {doctor.availability}
                  </Badge>
                  <Button size="sm" variant="secondary">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Sauvegarder
                  </Button>
                  <Button size="sm" variant="secondary">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Recommander
                  </Button>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-auto flex flex-col items-center md:items-end">
                <Button size="lg" className="mb-3 w-full md:w-auto">
                  <Calendar className="h-5 w-5 mr-2" />
                  Prendre rendez-vous
                </Button>
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  <Phone className="h-5 w-5 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>

          {/* Doctor profile content */}
          <div className="p-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Biographie</h2>
                      <p className="text-gray-700">{doctor.bio}</p>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-4">Services</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {doctor.services.map((service, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-xl font-bold mb-4">Formation</h2>
                        <ul className="space-y-3">
                          {doctor.education.map((edu, index) => (
                            <li key={index} className="flex">
                              <Award className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold mb-4">Expérience</h2>
                        <ul className="space-y-3">
                          {doctor.experience.map((exp, index) => (
                            <li key={index} className="flex">
                              <Award className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-4">Informations de contact</h3>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Adresse</h4>
                            <p className="text-gray-600">{doctor.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Téléphone</h4>
                            <p className="text-gray-600">{doctor.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Email</h4>
                            <p className="text-gray-600">{doctor.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Site web</h4>
                            <p className="text-gray-600">{doctor.website}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-4">Horaires d'ouverture</h3>

                      <div className="space-y-2">
                        {Object.entries(doctor.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="capitalize">{day}</span>
                            <span className={hours === "Fermé" ? "text-red-500" : "text-green-600"}>{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Langues parlées</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((language) => (
                          <Badge key={language} variant="secondary">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appointments">
                <div className="bg-white rounded-lg">
                  <h2 className="text-xl font-bold mb-6">Prendre rendez-vous</h2>
                  <AppointmentCalendar doctorId={doctor.id} />
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="bg-white rounded-lg">
                  <h2 className="text-xl font-bold mb-6">Avis des patients</h2>
                  <DoctorReviews doctorId={doctor.id} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
