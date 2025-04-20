"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle } from "lucide-react"

interface AppointmentCalendarProps {
  doctorId: number
}

// Mock available time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    for (const minute of [0, 30]) {
      // Randomly make some slots unavailable
      const available = Math.random() > 0.3
      slots.push({
        time: `${hour}:${minute === 0 ? "00" : minute}`,
        available,
      })
    }
  }
  return slots
}

export function AppointmentCalendar({ doctorId }: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [timeSlots] = useState(generateTimeSlots())

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookAppointment = () => {
    // In a real app, this would send the booking to an API
    setBookingComplete(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              locale={fr}
              disabled={{ before: new Date() }}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            {date ? (
              <>
                <h3 className="font-semibold text-lg mb-4">
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-6 w-full">
                        Réserver le {format(date, "dd/MM/yyyy", { locale: fr })} à {selectedTime}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      {bookingComplete ? (
                        <div className="py-6 text-center">
                          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                          <DialogTitle className="text-xl mb-2">Rendez-vous confirmé !</DialogTitle>
                          <DialogDescription>
                            Votre rendez-vous a été réservé pour le {format(date, "dd MMMM yyyy", { locale: fr })} à{" "}
                            {selectedTime}.
                            <br />
                            <br />
                            Un email de confirmation a été envoyé à votre adresse email.
                          </DialogDescription>
                          <Button className="mt-6" onClick={() => setBookingComplete(false)}>
                            Fermer
                          </Button>
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Réserver un rendez-vous</DialogTitle>
                            <DialogDescription>
                              Veuillez remplir les informations ci-dessous pour confirmer votre rendez-vous.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nom
                              </Label>
                              <Input id="name" className="col-span-3" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input id="email" type="email" className="col-span-3" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                Téléphone
                              </Label>
                              <Input id="phone" type="tel" className="col-span-3" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="reason" className="text-right">
                                Motif
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Sélectionnez un motif" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consultation">Consultation générale</SelectItem>
                                  <SelectItem value="followup">Suivi</SelectItem>
                                  <SelectItem value="emergency">Urgence</SelectItem>
                                  <SelectItem value="other">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="notes" className="text-right">
                                Notes
                              </Label>
                              <Textarea
                                id="notes"
                                placeholder="Informations supplémentaires pour le médecin"
                                className="col-span-3"
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" onClick={handleBookAppointment}>
                              Confirmer le rendez-vous
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
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
  )
}
