"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Phone } from "lucide-react"

interface Doctor {
  id: number
  name: string
  specialty: string
  address: string
  phone: string
  rating: number
  reviews: number
  image: string
}

interface DoctorCardProps {
  doctor: Doctor
  onViewDetails: () => void
}

export function DoctorCard({ doctor, onViewDetails }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-blue-600">{doctor.specialty}</p>

          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({doctor.reviews} avis)</span>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{doctor.address}</span>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
            <span>{doctor.phone}</span>
          </div>

          <Button onClick={onViewDetails} className="w-full mt-4">
            Voir le profil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
