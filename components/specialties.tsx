import Link from "next/link"
import { Heart, Brain, Eye, SmileIcon as Tooth, Baby, Bone, Stethoscope, UserCircle } from "lucide-react"

const specialties = [
  {
    id: "cardiologue",
    name: "Cardiologie",
    icon: Heart,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "neurologue",
    name: "Neurologie",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "ophtalmologue",
    name: "Ophtalmologie",
    icon: Eye,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "dentiste",
    name: "Dentiste",
    icon: Tooth,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "pediatre",
    name: "Pédiatrie",
    icon: Baby,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "orthopediste",
    name: "Orthopédie",
    icon: Bone,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "generaliste",
    name: "Médecine générale",
    icon: Stethoscope,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "all",
    name: "Toutes les spécialités",
    icon: UserCircle,
    color: "bg-gray-100 text-gray-600",
  },
]

export function Specialties() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {specialties.map((specialty) => (
        <Link href={`/search?specialty=${specialty.id}`} key={specialty.id} className="group">
          <div className="flex flex-col items-center p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300">
            <div
              className={`p-4 rounded-full ${specialty.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <specialty.icon className="h-8 w-8" />
            </div>
            <h3 className="font-medium text-center">{specialty.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
