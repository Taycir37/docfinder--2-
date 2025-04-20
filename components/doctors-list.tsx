import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Phone, Calendar } from "lucide-react"

// Mock data - would be fetched from API in real app
const doctors = [
  {
    id: 1,
    name: "Dr. Leila Ben Ali",
    specialty: "Cardiologue",
    rating: 4.9,
    reviews: 124,
    address: "Avenue Habib Bourguiba, Tunis",
    phone: "+216 71 123 456",
    availability: "Disponible aujourd'hui",
    hours: "9h00 - 18h00",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Mohamed Slim",
    specialty: "Dermatologue",
    rating: 4.8,
    reviews: 98,
    address: "Rue Charles de Gaulle, Sfax",
    phone: "+216 74 234 567",
    availability: "Disponible demain",
    hours: "8h30 - 17h30",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Amina Ben Youssef",
    specialty: "Pédiatre",
    rating: 4.9,
    reviews: 156,
    address: "Avenue 7 Novembre, Sousse",
    phone: "+216 73 345 678",
    availability: "Disponible aujourd'hui",
    hours: "9h30 - 19h00",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Ali Mahmoudi",
    specialty: "Généraliste",
    rating: 4.7,
    reviews: 87,
    address: "Rue Ibn Khaldoun, Kairouan",
    phone: "+216 31 456 789",
    availability: "Disponible demain",
    hours: "8h00 - 18h30",
    image: "/placeholder.svg?height=300&width=300",
  },
]
interface DoctorsListProps {
  city?: string
  specialty?: string
}

export function DoctorsList({ city, specialty }: DoctorsListProps) {
  // In a real app, we would filter based on the city and specialty
  // For this demo, we'll just show all doctors

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
              </div>
              <div className="p-6 flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="font-bold text-xl">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>

                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({doctor.reviews} avis)</span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                    <Badge variant="outline" className="text-green-600 border-green-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {doctor.availability}
                    </Badge>
                    <p className="text-sm text-gray-600 mb-2">{doctor.hours}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.address}</span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="outline">
                    <Link href={`/doctors/${doctor.id}`}>Voir le profil</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/booking/${doctor.id}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre rendez-vous
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
