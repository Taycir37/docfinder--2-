"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CalendarIcon, Clock, CheckCircle, User, LogOut } from "lucide-react"
import { fr } from "date-fns/locale"
import { format } from "date-fns"

// Données fictives pour les médecins
const doctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologie",
    address: "15 rue de la Paix, Paris",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Neurologie",
    address: "8 avenue Victor Hugo, Lyon",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Marie Lefevre",
    specialty: "Ophtalmologie",
    address: "22 boulevard Gambetta, Marseille",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Jean Moreau",
    specialty: "Dentiste",
    address: "5 rue des Lilas, Bordeaux",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Dr. Claire Petit",
    specialty: "Pédiatrie",
    address: "12 rue du Commerce, Toulouse",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Dr. Pierre Durand",
    specialty: "Orthopédiste",
    address: "3 place Bellecour, Lyon",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Générer des créneaux horaires fictifs
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      // Rendre aléatoirement certains créneaux indisponibles
      const available = Math.random() > 0.3
      slots.push({
        time: `${hour}:${minute === 0 ? "00" : minute}`,
        available,
      })
    }
  }
  return slots
}

interface AppointmentPageProps {
  doctorId: number
  onBackToDoctor: () => void
  onBackToHome: () => void
  user: { name: string; email: string } | null
  onLogout: () => void
}

export function AppointmentPage({ doctorId, onBackToDoctor, onBackToHome, user, onLogout }: AppointmentPageProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeSlots] = useState(generateTimeSlots())
  const [step, setStep] = useState<"select-date" | "enter-details" | "confirmation">("select-date")
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    reason: "",
  })

  // Trouver le médecin correspondant à l'ID
  const doctor = doctors.find((d) => d.id === doctorId)

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Médecin non trouvé.</p>
          <Button onClick={onBackToHome} className="mt-4">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    )
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleContinue = () => {
    if (step === "select-date" && selectedTime) {
      setStep("enter-details")
    } else if (step === "enter-details") {
      setStep("confirmation")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={step === "select-date" ? onBackToDoctor : () => setStep("select-date")}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              {step === "select-date" ? "Retour au profil" : "Retour"}
            </Button>
            <h1 className="text-xl font-bold text-docfinder-primary">DocFinder</h1>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Prendre rendez-vous avec {doctor.name}</h1>

          {step === "select-date" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Sélectionnez une date et un horaire</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={fr}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      {date ? (
                        <>
                          <h3 className="font-semibold mb-4">
                            Créneaux disponibles pour le {format(date, "dd MMMM yyyy", { locale: fr })}
                          </h3>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {timeSlots.map((slot, index) => (
                              <Button
                                key={index}
                                variant={selectedTime === slot.time ? "default" : "outline"}
                                className={!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                                disabled={!slot.available}
                                onClick={() => handleTimeSelect(slot.time)}
                              >
                                {slot.time}
                              </Button>
                            ))}
                          </div>

                          {selectedTime && (
                            <div className="mt-6">
                              <div className="flex items-center text-blue-600 mb-4">
                                <Clock className="h-5 w-5 mr-2" />
                                <span className="font-medium">
                                  {format(date, "dd MMMM yyyy", { locale: fr })} à {selectedTime}
                                </span>
                              </div>

                              <Button onClick={handleContinue} className="w-full">
                                Continuer
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          Veuillez sélectionner une date pour voir les créneaux disponibles
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {step === "enter-details" && date && selectedTime && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Vos informations</h2>
              </div>

              <div className="mb-4 p-4 bg-blue-50 rounded-md">
                <p className="font-medium">Rendez-vous sélectionné :</p>
                <p className="text-gray-700">
                  {doctor.name} - {doctor.specialty}
                </p>
                <p className="text-gray-700">
                  {format(date, "dd MMMM yyyy", { locale: fr })} à {selectedTime}
                </p>
                <p className="text-gray-700">{doctor.address}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Motif de la consultation (optionnel)</Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Décrivez brièvement le motif de votre consultation"
                    rows={3}
                  />
                </div>

                <Button onClick={handleContinue} className="w-full" disabled={!isFormValid()}>
                  Confirmer le rendez-vous
                </Button>
              </div>
            </div>
          )}

          {step === "confirmation" && date && selectedTime && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-docfinder-primary mb-4">Rendez-vous confirmé !</h2>

              <div className="max-w-md mx-auto mb-8">
                <p className="text-gray-700 mb-6">
                  Votre rendez-vous a été enregistré avec succès. Un email de confirmation a été envoyé à{" "}
                  {formData.email}.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <h3 className="font-semibold mb-4 text-center">Détails du rendez-vous</h3>

                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Médecin :</span> {doctor.name}
                    </p>
                    <p>
                      <span className="font-medium">Spécialité :</span> {doctor.specialty}
                    </p>
                    <p>
                      <span className="font-medium">Date :</span> {format(date, "dd MMMM yyyy", { locale: fr })}
                    </p>
                    <p>
                      <span className="font-medium">Heure :</span> {selectedTime}
                    </p>
                    <p>
                      <span className="font-medium">Adresse :</span> {doctor.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onBackToHome} variant="default">
                  Retour à l'accueil
                </Button>
                <Button onClick={onBackToDoctor} variant="outline">
                  Retour au profil du médecin
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
