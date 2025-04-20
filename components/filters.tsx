"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star } from "lucide-react"

export function Filters() {
  const [distance, setDistance] = useState([5])
  const [rating, setRating] = useState(0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Filtres</h2>

      <Accordion type="multiple" defaultValue={["distance", "rating", "availability", "gender"]}>
        <AccordionItem value="distance">
          <AccordionTrigger>Distance</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <div className="mb-6">
                <Slider value={distance} onValueChange={setDistance} max={20} step={1} />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>0 km</span>
                  <span>{distance[0]} km</span>
                  <span>20 km</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Évaluation</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-2">
              {[4, 3, 2, 1].map((value) => (
                <div key={value} className="flex items-center">
                  <Checkbox
                    id={`rating-${value}`}
                    checked={rating === value}
                    onCheckedChange={() => setRating(value === rating ? 0 : value)}
                  />
                  <label
                    htmlFor={`rating-${value}`}
                    className="ml-2 flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-1">et plus</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Disponibilité</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-2">
              <div className="flex items-center">
                <Checkbox id="availability-today" />
                <label
                  htmlFor="availability-today"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disponible aujourd'hui
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox id="availability-tomorrow" />
                <label
                  htmlFor="availability-tomorrow"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disponible demain
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox id="availability-week" />
                <label
                  htmlFor="availability-week"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disponible cette semaine
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger>Genre du médecin</AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-2">
              <div className="flex items-center">
                <Checkbox id="gender-male" />
                <label
                  htmlFor="gender-male"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Homme
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox id="gender-female" />
                <label
                  htmlFor="gender-female"
                  className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Femme
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-3">
        <Button className="w-full">Appliquer les filtres</Button>
        <Button variant="outline" className="w-full">
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}
