"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Calendar, ArrowLeft, User, LogOut } from "lucide-react"

// Données fictives pour les médecins
const doctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    address: "15 rue de la Paix, Paris",
    phone: "01 23 45 67 89",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Cardiologue avec plus de 15 ans d'expérience, spécialisée dans les maladies cardiovasculaires. Diplômée de la faculté de médecine de Paris.",
    education: [
      "Doctorat en Médecine, Université Paris Descartes (2005)",
      "Spécialisation en Cardiologie, Hôpital Européen Georges Pompidou (2010)",
    ],
    experience: [
      "Cardiologue, Hôpital de la Pitié-Salpêtrière (2010-2015)",
      "Cardiologue en cabinet privé (depuis 2015)",
    ],
    languages: ["Français", "Anglais", "Espagnol"],
    hours: {
      lundi: "9h00 - 18h00",
      mardi: "9h00 - 18h00",
      mercredi: "9h00 - 12h00",
      jeudi: "9h00 - 18h00",
      vendredi: "9h00 - 17h00",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Neurologie",
    address: "8 avenue Victor Hugo, Lyon",
    phone: "04 56 78 90 12",
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Neurologue spécialisé dans les troubles du sommeil et les maladies neurodégénératives. Plus de 10 ans d'expérience en neurologie clinique.",
    education: [
      "Doctorat en Médecine, Université Claude Bernard Lyon 1 (2008)",
      "Spécialisation en Neurologie, Hôpital Neurologique de Lyon (2013)",
    ],
    experience: ["Neurologue, CHU de Lyon (2013-2018)", "Neurologue en cabinet privé (depuis 2018)"],
    languages: ["Français", "Anglais"],
    hours: {
      lundi: "8h30 - 17h00",
      mardi: "8h30 - 17h00",
      mercredi: "8h30 - 17h00",
      jeudi: "8h30 - 17h00",
      vendredi: "8h30 - 16h00",
      samedi: "9h00 - 12h00",
      dimanche: "Fermé",
    },
  },
  {
    id: 3,
    name: "Dr. Marie Lefevre",
    specialty: "Ophtalmologie",
    address: "22 boulevard Gambetta, Marseille",
    phone: "04 91 23 45 67",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ophtalmologue spécialisée en chirurgie réfractive et cataracte. Utilise les technologies les plus récentes pour le diagnostic et le traitement des maladies oculaires.",
    education: [
      "Doctorat en Médecine, Université Aix-Marseille (2007)",
      "Spécialisation en Ophtalmologie, CHU de Marseille (2012)",
    ],
    experience: ["Ophtalmologue, Hôpital de la Timone (2012-2016)", "Ophtalmologue en cabinet privé (depuis 2016)"],
    languages: ["Français", "Anglais", "Italien"],
    hours: {
      lundi: "9h00 - 18h00",
      mardi: "9h00 - 18h00",
      mercredi: "9h00 - 18h00",
      jeudi: "9h00 - 18h00",
      vendredi: "9h00 - 16h00",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
  },
  {
    id: 4,
    name: "Dr. Jean Moreau",
    specialty: "Dentiste",
    address: "5 rue des Lilas, Bordeaux",
    phone: "05 56 78 90 12",
    rating: 4.6,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Chirurgien-dentiste spécialisé en implantologie et esthétique dentaire. Approche douce et sans douleur pour tous les soins dentaires.",
    education: [
      "Doctorat en Chirurgie Dentaire, Université de Bordeaux (2010)",
      "Formation en Implantologie, New York University (2012)",
    ],
    experience: ["Dentiste, Centre Dentaire de Bordeaux (2010-2015)", "Dentiste en cabinet privé (depuis 2015)"],
    languages: ["Français", "Anglais"],
    hours: {
      lundi: "9h00 - 19h00",
      mardi: "9h00 - 19h00",
      mercredi: "9h00 - 19h00",
      jeudi: "9h00 - 19h00",
      vendredi: "9h00 - 17h00",
      samedi: "9h00 - 12h00",
      dimanche: "Fermé",
    },
  },
  {
    id: 5,
    name: "Dr. Claire Petit",
    specialty: "Pédiatrie",
    address: "12 rue du Commerce, Toulouse",
    phone: "05 61 23 45 67",
    rating: 4.8,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Pédiatre spécialisée dans le développement de l'enfant et l'accompagnement parental. Approche bienveillante et à l'écoute des besoins de l'enfant et de sa famille.",
    education: [
      "Doctorat en Médecine, Université Paul Sabatier Toulouse III (2009)",
      "Spécialisation en Pédiatrie, CHU de Toulouse (2014)",
    ],
    experience: ["Pédiatre, Hôpital des Enfants de Toulouse (2014-2018)", "Pédiatre en cabinet privé (depuis 2018)"],
    languages: ["Français", "Anglais", "Espagnol"],
    hours: {
      lundi: "9h00 - 18h00",
      mardi: "9h00 - 18h00",
      mercredi: "9h00 - 18h00",
      jeudi: "9h00 - 18h00",
      vendredi: "9h00 - 16h00",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
  },
  {
    id: 6,
    name: "Dr. Pierre Durand",
    specialty: "Orthopédiste",
    address: "3 place Bellecour, Lyon",
    phone: "04 78 90 12 34",
    rating: 4.7,
    reviews: 95,
    image: "/placeholder.svg?height=300&width=300",
    bio: "Chirurgien orthopédiste spécialisé dans les pathologies du genou et de la hanche. Expert en chirurgie mini-invasive et prothétique.",
    education: [
      "Doctorat en Médecine, Université Claude Bernard Lyon 1 (2006)",
      "Spécialisation en Chirurgie Orthopédique, Hôpital Édouard Herriot (2012)",
    ],
    experience: [
      "Chirurgien Orthopédiste, Hôpital Lyon Sud (2012-2017)",
      "Chirurgien Orthopédiste en cabinet privé (depuis 2017)",
    ],
    languages: ["Français", "Anglais", "Allemand"],
    hours: {
      lundi: "8h30 - 18h00",
      mardi: "8h30 - 18h00",
      mercredi: "8h30 - 12h00",
      jeudi: "8h30 - 18h00",
      vendredi: "8h30 - 16h00",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
  },
]

interface DoctorDetailsProps {
  doctorId: number
  onBackToHome: () => void
  onBookAppointment: (doctorId: number) => void
  user: { name: string; email: string } | null
  onLogout: () => void
}

export function DoctorDetails({ doctorId, onBackToHome, onBookAppointment, user, onLogout }: DoctorDetailsProps) {
  // Trouver le médecin correspondant à l'ID
  const doctor = doctors.find((d) => d.id === doctorId)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Médecin non trouvé.</p>
          <Button onClick={onBackToHome} className="mt-4">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onBackToHome}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
            <h1 className="text-xl font-bold text-docfinder-primary">DocFinder</h1>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profil du médecin */}
          <div className="bg-gradient-to-r from-docfinder-primary to-docfinder-secondary text-white p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{doctor.name}</h1>
                <p className="text-xl text-blue-100 mb-2">{doctor.specialty}</p>

                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{doctor.rating}</span>
                  <span className="ml-1 text-blue-100">({doctor.reviews} avis)</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-blue-500">Disponible aujourd'hui</Badge>
                </div>
              </div>

              <Button onClick={() => onBookAppointment(doctor.id)} className="md:self-start">
                <Calendar className="h-4 w-4 mr-2" />
                Prendre rendez-vous
              </Button>
            </div>
          </div>

          {/* Contenu du profil */}
          <div className="p-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="schedule">Horaires</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-3">Biographie</h2>
                      <p className="text-gray-700">{doctor.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Formation</h3>
                        <ul className="space-y-2">
                          {doctor.education.map((edu, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></div>
                              <span className="text-gray-700">{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Expérience</h3>
                        <ul className="space-y-2">
                          {doctor.experience.map((exp, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></div>
                              <span className="text-gray-700">{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Langues parlées</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((language, index) => (
                          <Badge key={index} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-4">Informations de contact</h3>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Adresse</h4>
                            <p className="text-gray-600">{doctor.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Téléphone</h4>
                            <p className="text-gray-600">{doctor.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Horaires d'ouverture</h2>

                  <div className="space-y-3">
                    {Object.entries(doctor.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span className="font-medium capitalize">{day}</span>
                        <span className={hours === "Fermé" ? "text-red-500" : "text-green-600"}>{hours}</span>
                      </div>
                    ))}
                  </div>

                  <Button onClick={() => onBookAppointment(doctor.id)} className="mt-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Avis des patients</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{doctor.rating}</span>
                      <span className="ml-1 text-gray-500">({doctor.reviews} avis)</span>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Les avis des patients seront disponibles prochainement.</p>
                    <Button variant="outline">Laisser un avis</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
