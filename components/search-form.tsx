"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const specialties = [
  "Médecin généraliste",
  "Cardiologue",
  "Dermatologue",
  "Gynécologue",
  "Ophtalmologue",
  "Pédiatre",
  "Psychiatre",
  "Dentiste",
  "Orthopédiste",
  "Neurologue",
]

const cities = ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès", "Ariana", "Gafsa", "Monastir", "Nabeul"]

export function SearchForm() {
  const router = useRouter()
  const [city, setCity] = useState("")
  const [specialty, setSpecialty] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city && specialty) {
      router.push(`/search?city=${encodeURIComponent(city)}&specialty=${encodeURIComponent(specialty)}`)
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-4"
    >
      <div className="flex-1 flex items-center border rounded-lg px-3 bg-gray-50 hover:border-docfinder-primary focus-within:border-docfinder-primary focus-within:ring-1 focus-within:ring-docfinder-primary transition-all">
        <MapPin className="h-5 w-5 text-docfinder-primary mr-2" />
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="border-0 bg-transparent focus:ring-0 py-6">
            <SelectValue placeholder="Sélectionnez une ville" />
          </SelectTrigger>
          <SelectContent className="border-docfinder-primary">
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex items-center border rounded-lg px-3 bg-gray-50 hover:border-docfinder-primary focus-within:border-docfinder-primary focus-within:ring-1 focus-within:ring-docfinder-primary transition-all">
        <Search className="h-5 w-5 text-docfinder-primary mr-2" />
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="border-0 bg-transparent focus:ring-0 py-6">
            <SelectValue placeholder="Sélectionnez une spécialité" />
          </SelectTrigger>
          <SelectContent className="border-docfinder-primary">
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="bg-gradient-elegant hover:opacity-90 text-white py-6 px-8 rounded-lg">
        Rechercher
      </Button>
    </form>
  )
}
