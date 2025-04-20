import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sophie Dupont",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "J'ai trouvé un excellent pédiatre pour mon fils grâce à DocFinder. La prise de rendez-vous était simple et rapide. Je recommande vivement ce service !",
    date: "15 février 2025",
  },
  {
    id: 2,
    name: "Marc Lambert",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Après des semaines d'attente pour voir un dermatologue, j'ai pu obtenir un rendez-vous en 2 jours grâce à DocFinder. Le médecin était très compétent et à l'écoute.",
    date: "3 mars 2025",
  },
  {
    id: 3,
    name: "Julie Moreau",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Interface intuitive et service client réactif. J'ai pu facilement changer mon rendez-vous quand j'en ai eu besoin. Seul bémol : peu de médecins disponibles dans ma petite ville.",
    date: "27 février 2025",
  },
]

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{testimonial.text}</p>
            <p className="text-sm text-gray-500">{testimonial.date}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
