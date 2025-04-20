"use client"

import { Heart, Brain, Eye, Smile, Baby, Bone } from "lucide-react"

const specialties = [
  {
    id: "Cardiologie",
    name: "Cardiologie",
    icon: Heart,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
    borderColor: "border-red-200",
  },
  {
    id: "Neurologie",
    name: "Neurologie",
    icon: Brain,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
    borderColor: "border-purple-200",
  },
  {
    id: "Ophtalmologie",
    name: "Ophtalmologie",
    icon: Eye,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-200",
  },
  {
    id: "Dentiste",
    name: "Dentiste",
    icon: Smile,
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-500",
    borderColor: "border-cyan-200",
  },
  {
    id: "Pédiatrie",
    name: "Pédiatrie",
    icon: Baby,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
    borderColor: "border-green-200",
  },
  {
    id: "Orthopédiste",
    name: "Orthopédiste",
    icon: Bone,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-200",
  },
]

interface SpecialtiesGridProps {
  onSpecialtySelect?: (specialty: string) => void
  selectedSpecialty?: string | null
}

export function SpecialtiesGrid({ onSpecialtySelect, selectedSpecialty }: SpecialtiesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {specialties.map((specialty) => (
        <button
          key={specialty.id}
          onClick={() => onSpecialtySelect?.(specialty.id)}
          className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
            selectedSpecialty === specialty.id
              ? `border-2 ${specialty.borderColor} bg-white shadow-md`
              : "border-gray-100 bg-white"
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full ${specialty.bgColor} flex items-center justify-center mb-4`}>
              <specialty.icon className={`w-8 h-8 ${specialty.iconColor}`} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{specialty.name}</h3>
          </div>
        </button>
      ))}
    </div>
  )
}
