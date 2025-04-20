"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologue",
    city: "Paris",
    address: "15 Rue de la Paix, 75002 Paris",
    phone: "01 23 45 67 89",
    hours: "Lun-Ven: 9h-18h",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Dermatologue",
    city: "Lyon",
    address: "8 Avenue Jean Jaurès, 69007 Lyon",
    phone: "04 56 78 90 12",
    hours: "Lun-Ven: 8h30-17h",
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Claire Leroy",
    specialty: "Pédiatre",
    city: "Marseille",
    address: "22 Boulevard Michelet, 13008 Marseille",
    phone: "04 91 23 45 67",
    hours: "Lun-Sam: 9h-19h",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Pierre Blanc",
    specialty: "Médecin généraliste",
    city: "Paris",
    address: "45 Rue de Rivoli, 75004 Paris",
    phone: "01 34 56 78 90",
    hours: "Lun-Ven: 8h-19h, Sam: 9h-12h",
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Dr. Marie Rousseau",
    specialty: "Ophtalmologue",
    city: "Lyon",
    address: "12 Rue de la République, 69002 Lyon",
    phone: "04 12 34 56 78",
    hours: "Lun-Ven: 9h-17h30",
    rating: 4.5,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Dr. Jean Moreau",
    specialty: "Dentiste",
    city: "Paris",
    address: "3 Avenue des Champs-Élysées, 75008 Paris",
    phone: "01 45 67 89 01",
    hours: "Lun-Ven: 9h-18h30",
    rating: 4.4,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function SearchResults({
  city,
  specialty,
}: {
  city: string
  specialty: string
}) {
  const [doctors, setDoctors] = useState<typeof mockDoctors>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    setLoading(true)
    setTimeout(() => {
      let filteredDoctors = [...mockDoctors]

      if (city) {
        filteredDoctors = filteredDoctors.filter((doctor) => doctor.city.toLowerCase() === city.toLowerCase())
      }

      if (specialty) {
        filteredDoctors = filteredDoctors.filter((doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase())
      }

      setDoctors(filteredDoctors)
      setLoading(false)
    }, 1000)
  }, [city, specialty])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-40 w-40 rounded-md" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Aucun résultat trouvé</h3>
        <p className="text-gray-600 mb-6">
          Nous n'avons pas trouvé de médecins correspondant à vos critères de recherche. Essayez de modifier vos filtres
          ou d'élargir votre recherche.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {doctors.length} résultat{doctors.length > 1 ? "s" : ""} trouvé{doctors.length > 1 ? "s" : ""}
        </h2>
        <select className="border rounded-md px-3 py-2 bg-white">
          <option value="relevance">Pertinence</option>
          <option value="rating">Évaluation</option>
          <option value="distance">Distance</option>
          <option value="availability">Disponibilité</option>
        </select>
      </div>

      {doctors.map((doctor) => (
        <Card key={doctor.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-48 bg-gray-100">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                    <p className="text-teal-600 font-medium mb-4">{doctor.specialty}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{doctor.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{doctor.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Badge className="mb-4 bg-docfinder-primary hover:bg-docfinder-secondary">
                      <Star className="h-3.5 w-3.5 mr-1 fill-current" />
                      <span>{doctor.rating}</span>
                      <span className="text-xs ml-1">({doctor.reviews})</span>
                    </Badge>

                    <div className="flex space-x-3">
                      <Button asChild size="sm">
                        <Link href={`/doctors/${doctor.id}`}>Voir profil</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-docfinder-primary text-docfinder-primary hover:bg-blue-50"
                      >
                        <Link href={`/doctors/${doctor.id}/appointment`}>Rendez-vous</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
