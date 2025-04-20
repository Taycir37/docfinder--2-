"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"

interface DoctorReviewsProps {
  doctorId: number
}

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: "Marie Dupont",
    date: "15 février 2025",
    rating: 5,
    comment:
      "Excellent médecin, très à l'écoute et professionnel. Le Dr. Martin a pris le temps de m'expliquer en détail mon problème cardiaque et les options de traitement. Je me sens beaucoup mieux après avoir suivi ses conseils.",
    avatar: "/placeholder.svg?height=100&width=100",
    likes: 12,
    replies: 2,
  },
  {
    id: 2,
    name: "Pierre Lefebvre",
    date: "3 janvier 2025",
    rating: 4,
    comment:
      "Très bon médecin, compétent et rassurant. Le seul bémol est le temps d'attente qui peut être long, même avec rendez-vous. Mais la qualité de la consultation vaut l'attente.",
    avatar: "/placeholder.svg?height=100&width=100",
    likes: 8,
    replies: 1,
  },
  {
    id: 3,
    name: "Sophie Martin",
    date: "27 décembre 2024",
    rating: 5,
    comment:
      "Je consulte le Dr. Martin depuis plusieurs années pour mon suivi cardiologique. C'est une excellente spécialiste qui prend vraiment soin de ses patients. Son cabinet est moderne et bien équipé.",
    avatar: "/placeholder.svg?height=100&width=100",
    likes: 15,
    replies: 0,
  },
]

export function DoctorReviews({ doctorId }: DoctorReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmitReview = () => {
    // In a real app, this would send the review to an API
    setShowReviewForm(false)
    setRating(0)
    setComment("")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4.9 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9</span>
            <span className="ml-1 text-gray-500">(124 avis)</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Laisser un avis</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Évaluer Dr. Sophie Martin</DialogTitle>
              <DialogDescription>Partagez votre expérience pour aider d'autres patients.</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Votre note</label>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 cursor-pointer ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium mb-2">
                  Votre commentaire
                </label>
                <Textarea
                  id="comment"
                  placeholder="Partagez votre expérience avec ce médecin..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" onClick={handleSubmitReview}>
                Publier l'avis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-700">{review.comment}</p>

                  <div className="mt-4 flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      <span>Utile ({review.likes})</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>Répondre ({review.replies})</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline">Voir plus d'avis</Button>
      </div>
    </div>
  )
}
