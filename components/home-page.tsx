"use client"

import { useState } from "react"
import { SpecialtiesGrid } from "@/components/specialties-grid"
import { DoctorCard } from "@/components/doctor-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogOut, User } from "lucide-react"

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
  },
]

interface HomePageProps {
  user: { name: string; email: string }
  onViewDoctor: (doctorId: number) => void
  onLogout: () => void
}

export function HomePage({ user, onViewDoctor, onLogout }: HomePageProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrer les médecins en fonction de la spécialité sélectionnée et du terme de recherche
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty
      ? doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      : true
    const matchesSearch = searchTerm
      ? doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.address.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return matchesSpecialty && matchesSearch
  })

  // Gérer la sélection d'une spécialité
  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty === selectedSpecialty ? null : specialty)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-docfinder-primary">DocFinder</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un médecin ou une adresse..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Spécialités */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choisissez une spécialité</h2>
          <SpecialtiesGrid onSpecialtySelect={handleSpecialtySelect} selectedSpecialty={selectedSpecialty} />
        </div>

        {/* Liste des médecins */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedSpecialty ? `Médecins spécialistes en ${selectedSpecialty}` : "Tous les médecins disponibles"}
          </h2>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Aucun médecin trouvé pour cette recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onViewDetails={() => onViewDoctor(doctor.id)} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
