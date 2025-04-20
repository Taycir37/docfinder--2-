import { Search, Calendar, Star } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Recherchez un médecin",
    description:
      "Entrez votre ville et la spécialité recherchée pour trouver les médecins disponibles près de chez vous.",
    icon: Search,
    color: "bg-docfinder-primary/10 text-docfinder-primary",
  },
  {
    id: 2,
    title: "Prenez rendez-vous",
    description: "Choisissez un créneau horaire qui vous convient et réservez votre rendez-vous en quelques clics.",
    icon: Calendar,
    color: "bg-docfinder-secondary/10 text-docfinder-secondary",
  },
  {
    id: 3,
    title: "Évaluez votre expérience",
    description:
      "Après votre consultation, partagez votre expérience pour aider d'autres patients à choisir leur médecin.",
    icon: Star,
    color: "bg-docfinder-accent/10 text-docfinder-accent",
  },
]

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center text-center group">
          <div className={`p-6 rounded-full ${step.color} mb-6 transform transition-transform group-hover:scale-110`}>
            <step.icon className="h-10 w-10" />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-elegant w-full h-full transform transition-all group-hover:shadow-card-hover">
            <h3 className="text-xl font-bold mb-3 text-docfinder-primary">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
          {step.id < steps.length && (
            <div className="hidden md:block absolute transform translate-x-[150%]">
              <svg className="h-8 w-8 text-docfinder-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
