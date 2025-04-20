"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays, startOfWeek } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Generate mock availability data
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      const available = Math.random() > 0.3 // 70% chance of being available
      slots.push({ time, available })
    }
  }
  return slots
}

const generateWeekAvailability = () => {
  const today = new Date()
  const startDay = startOfWeek(today, { weekStartsOn: 1 }) // Start from Monday
  const week = []

  for (let i = 0; i < 7; i++) {
    const date = addDays(startDay, i)
    const dayName = format(date, "EEEE", { locale: fr })
    const dayNumber = format(date, "d", { locale: fr })
    const month = format(date, "MMMM", { locale: fr })
    const formattedDate = format(date, "yyyy-MM-dd")

    // Weekend days have fewer slots
    const isWeekend = i >= 5
    const slots = isWeekend
      ? generateTimeSlots().slice(0, 8) // Fewer slots on weekends
      : generateTimeSlots()

    week.push({
      dayName,
      dayNumber,
      month,
      formattedDate,
      slots,
    })
  }

  return week
}

export function DoctorAvailability({ doctorId }: { doctorId: number }) {
  const router = useRouter()
  const [weekAvailability] = useState(generateWeekAvailability())
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string
    time: string
    dayName: string
    dayNumber: string
    month: string
  } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  })

  const handleSlotSelect = (date: string, time: string, dayName: string, dayNumber: string, month: string) => {
    setSelectedSlot({
      date,
      time,
      dayName,
      dayNumber,
      month,
    })
    setIsDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log("Appointment booked:", {
      doctorId,
      ...selectedSlot,
      ...appointmentDetails,
    })

    // Redirect to confirmation page
    router.push(`/doctors/${doctorId}/appointment/confirmation`)
  }

  const isFormValid = () => {
    const { name, email, phone } = appointmentDetails
    return name.trim() !== "" && email.trim() !== "" && phone.trim() !== ""
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Disponibilités</h2>
        <p className="text-gray-600 mb-6">
          Sélectionnez une date et un horaire pour prendre rendez-vous avec le médecin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekAvailability.map((day) => (
            <Card key={day.formattedDate} className="overflow-hidden">
              <div className="bg-gray-100 p-3 text-center border-b">
                <div className="font-medium">{day.dayName}</div>
                <div>
                  {day.dayNumber} {day.month}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {day.slots.map((slot) => (
                    <Button
                      key={`${day.formattedDate}-${slot.time}`}
                      variant={slot.available ? "outline" : "ghost"}
                      className={`w-full justify-start ${
                        slot.available
                          ? "hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      disabled={!slot.available}
                      onClick={() =>
                        slot.available &&
                        handleSlotSelect(day.formattedDate, slot.time, day.dayName, day.dayNumber, day.month)
                      }
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Prendre rendez-vous</DialogTitle>
            <DialogDescription>
              {selectedSlot && (
                <div className="mt-2 flex items-center text-teal-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {selectedSlot.dayName} {selectedSlot.dayNumber} {selectedSlot.month} à {selectedSlot.time}
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                value={appointmentDetails.name}
                onChange={handleInputChange}
                placeholder="Entrez votre nom complet"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={appointmentDetails.email}
                onChange={handleInputChange}
                placeholder="Entrez votre email"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                value={appointmentDetails.phone}
                onChange={handleInputChange}
                placeholder="Entrez votre numéro de téléphone"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reason">Motif de la consultation (optionnel)</Label>
              <Textarea
                id="reason"
                name="reason"
                value={appointmentDetails.reason}
                onChange={handleInputChange}
                placeholder="Décrivez brièvement le motif de votre consultation"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
              Confirmer le rendez-vous
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
