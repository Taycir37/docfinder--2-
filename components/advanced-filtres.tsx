"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Star } from "lucide-react"

interface FilterValues {
  distance: number
  rating: number
  availability: string
  gender: string
}

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterValues) => void
}

export default function AdvancedFilters({ onApplyFilters }: AdvancedFiltersProps) {
  const [distance, setDistance] = useState<number>(11)
  const [rating, setRating] = useState<number>(0)
  const [availability, setAvailability] = useState<string>("")
  const [gender, setGender] = useState<string>("")

  const [distanceOpen, setDistanceOpen] = useState(true)
  const [evaluationOpen, setEvaluationOpen] = useState(true)
  const [availabilityOpen, setAvailabilityOpen] = useState(true)
  const [genderOpen, setGenderOpen] = useState(true)

  const handleApplyFilters = () => {
    onApplyFilters({
      distance,
      rating,
      availability,
      gender,
    })
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Filtres</h2>

        {/* Distance Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setDistanceOpen(!distanceOpen)}
          >
            <h3 className="text-lg font-medium">Distance</h3>
            {distanceOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {distanceOpen && (
            <div className="space-y-4">
              <Slider
                defaultValue={[11]}
                max={20}
                step={1}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                className="bg-gradient-to-r from-purple-400 to-teal-400"
              />
              <div className="flex justify-between">
                <span>0 km</span>
                <span>{distance} km</span>
                <span>20 km</span>
              </div>
            </div>
          )}
        </div>

        {/* Evaluation Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setEvaluationOpen(!evaluationOpen)}
          >
            <h3 className="text-lg font-medium">Évaluation</h3>
            {evaluationOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {evaluationOpen && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroup value={String(rating)} onValueChange={(value) => setRating(Number(value))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4" className="flex items-center">
                      {[1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-5 w-5 text-gray-300" />
                      <span className="ml-2">et plus</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3" className="flex items-center">
                      {[1, 2, 3].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                      <span className="ml-2">et plus</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2" className="flex items-center">
                      {[1, 2].map((i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[3, 4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                      <span className="ml-2">et plus</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1" className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      {[2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300" />
                      ))}
                      <span className="ml-2">et plus</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        {/* Availability Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setAvailabilityOpen(!availabilityOpen)}
          >
            <h3 className="text-lg font-medium">Disponibilité</h3>
            {availabilityOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {availabilityOpen && (
            <RadioGroup value={availability} onValueChange={setAvailability}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="today" id="today" />
                <Label htmlFor="today">Disponible aujourd'hui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tomorrow" id="tomorrow" />
                <Label htmlFor="tomorrow">Disponible demain</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="week" id="week" />
                <Label htmlFor="week">Disponible cette semaine</Label>
              </div>
            </RadioGroup>
          )}
        </div>

        {/* Gender Section */}
        <div className="border-b pb-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setGenderOpen(!genderOpen)}
          >
            <h3 className="text-lg font-medium">Genre du médecin</h3>
            {genderOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {genderOpen && (
            <RadioGroup value={gender} onValueChange={setGender}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="homme" id="homme" />
                <Label htmlFor="homme">Homme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="femme" id="femme" />
                <Label htmlFor="femme">Femme</Label>
              </div>
            </RadioGroup>
          )}
        </div>

        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 mt-4"
          onClick={handleApplyFilters}
        >
          Appliquer
        </Button>
      </CardContent>
    </Card>
  )
}
