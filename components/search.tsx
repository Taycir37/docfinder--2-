"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export function Search() {
  const [city, setCity] = useState("")
  const [specialty, setSpecialty] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?city=${encodeURIComponent(city)}&specialty=${encodeURIComponent(specialty)}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-12"
        />
      </div>
      <div className="flex-1">
        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Spécialité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="generaliste">Médecin généraliste</SelectItem>
            <SelectItem value="cardiologue">Cardiologue</SelectItem>
            <SelectItem value="dermatologue">Dermatologue</SelectItem>
            <SelectItem value="pediatre">Pédiatre</SelectItem>
            <SelectItem value="ophtalmologue">Ophtalmologue</SelectItem>
            <SelectItem value="dentiste">Dentiste</SelectItem>
            <SelectItem value="gynécologue">Gynécologue</SelectItem>
            <SelectItem value="orthopediste">Orthopédiste</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
        <SearchIcon className="mr-2 h-5 w-5" />
        Rechercher
      </Button>
    </form>
  )
}
