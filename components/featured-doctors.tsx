import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"

const featuredDoctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologue",
    rating: 4.9,
    reviews: 124,
    address: "15 rue de la Paix, Paris",
    availability: "Disponible aujourd'hui",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Dermatologue",
    rating: 4.8,
    reviews: 98,
    address: "8 avenue Victor Hugo, Lyon",
    availability: "Disponible demain",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Marie Lefevre",
    specialty: "Pédiatre",
    rating: 4.9,
    reviews: 156,
    address: "22 boulevard Gambetta, Marseille",
    availability: "Disponible aujourd'hui",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Jean Moreau",
    specialty: "Généraliste",
    rating: 4.7,
    reviews: 87,
    address: "5 rue des Lilas, Bordeaux",
    availability: "Disponible demain",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function FeaturedDoctors() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredDoctors.map((doctor) => (
        <Link href={`/doctors/${doctor.id}`} key={doctor.id}>
          <Card className="h-full hover:shadow-card-hover transition-shadow duration-300 rounded-xl overflow-hidden border-none">
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-docfinder-primary">{doctor.name}</h3>
                <p className="text-docfinder-secondary font-medium">{doctor.specialty}</p>

                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({doctor.reviews} avis)</span>
                </div>

                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 text-docfinder-primary" />
                  <span className="truncate">{doctor.address}</span>
                </div>

                <div className="mt-3 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-docfinder-secondary" />
                  <Badge
                    variant="outline"
                    className="text-docfinder-secondary border-docfinder-secondary bg-docfinder-secondary/10"
                  >
                    {doctor.availability}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
