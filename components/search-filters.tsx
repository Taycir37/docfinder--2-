"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

const availabilities = [
  { id: "today", label: "Aujourd'hui" },
  { id: "tomorrow", label: "Demain" },
  { id: "this-week", label: "Cette semaine" },
  { id: "next-week", label: "Semaine prochaine" },
]

const insurances = [
  { id: "securite-sociale", label: "Sécurité Sociale" },
  { id: "mutuelle", label: "Mutuelle" },
  { id: "carte-vitale", label: "Carte Vitale" },
  { id: "tiers-payant", label: "Tiers payant" },
]

export function SearchFilters({
  initialCity = "",
  initialSpecialty = "",
}: {
  initialCity?: string
  initialSpecialty?: string
}) {
  const router = useRouter()
  const [city, setCity] = useState(initialCity)
  const [specialty, setSpecialty] = useState(initialSpecialty)
  const [distance, setDistance] = useState([5])
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>([])
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)

  const handleAvailabilityChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAvailabilities([...selectedAvailabilities, id])
    } else {
      setSelectedAvailabilities(selectedAvailabilities.filter((item) => item !== id))
    }
  }

  const handleInsuranceChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedInsurances([...selectedInsurances, id])
    } else {
      setSelectedInsurances(selectedInsurances.filter((item) => item !== id))
    }
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()
    if (city) params.set("city", city)
    if (specialty) params.set("specialty", specialty)
    if (distance[0] !== 5) params.set("distance", distance[0].toString())
    if (selectedAvailabilities.length > 0) params.set("availability", selectedAvailabilities.join(","))
    if (selectedInsurances.length > 0) params.set("insurance", selectedInsurances.join(","))
    if (minRating > 0) params.set("rating", minRating.toString())

    router.push(`/search?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setCity("")
    setSpecialty("")
    setDistance([5])
    setSelectedAvailabilities([])
    setSelectedInsurances([])
    setMinRating(0)
    router.push("/search")
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Filtres</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="city-select">Ville</Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger id="city-select" className="mt-2">
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="specialty-select">Spécialité</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger id="specialty-select" className="mt-2">
              <SelectValue placeholder="Sélectionnez une spécialité" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Distance maximale: {distance[0]} km</Label>
          <Slider value={distance} onValueChange={setDistance} min={1} max={20} step={1} className="mt-2" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="availability">
            <AccordionTrigger>Disponibilité</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {availabilities.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${item.id}`}
                      checked={selectedAvailabilities.includes(item.id)}
                      onCheckedChange={(checked) => handleAvailabilityChange(item.id, checked as boolean)}
                    />
                    <Label htmlFor={`availability-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="insurance">
            <AccordionTrigger>Moyens de paiement</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {insurances.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`insurance-${item.id}`}
                      checked={selectedInsurances.includes(item.id)}
                      onCheckedChange={(checked) => handleInsuranceChange(item.id, checked as boolean)}
                    />
                    <Label htmlFor={`insurance-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger>Évaluation minimale</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-4 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      minRating >= rating ? "bg-yellow-400" : "bg-gray-200"
                    }`}
                    onClick={() => setMinRating(rating)}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col space-y-3 pt-4">
          <Button onClick={handleApplyFilters} className="bg-teal-600 hover:bg-teal-700">
            Appliquer les filtres
          </Button>
          <Button onClick={handleResetFilters} variant="outline">
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>
  )
}
