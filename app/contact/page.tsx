"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string },
  ) => {
    const { name, value } = "target" in e ? e.target : e
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simuler un envoi de formulaire
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setFormState("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-gradient-elegant text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Vous avez des questions ou besoin d'assistance ? Notre équipe est là pour vous aider.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-docfinder-primary">Nos coordonnées</h2>

            <div className="space-y-6">
              <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-docfinder-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-docfinder-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-docfinder-primary">Adresse</h3>
                      <p className="text-gray-600">123 Avenue de la Santé</p>
                      <p className="text-gray-600">75001 Paris, France</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-docfinder-secondary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-docfinder-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-docfinder-secondary">Email</h3>
                      <p className="text-gray-600">contact@docfinder.fr</p>
                      <p className="text-gray-600">support@docfinder.fr</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-docfinder-accent/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-docfinder-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-docfinder-accent">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                      <p className="text-gray-600">Lun-Ven, 9h-18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-purple-600">Horaires d'ouverture</h3>
                      <p className="text-gray-600">Lundi - Vendredi: 9h00 - 18h00</p>
                      <p className="text-gray-600">Samedi: 9h00 - 12h00</p>
                      <p className="text-gray-600">Dimanche: Fermé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-elegant rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-docfinder-primary">Envoyez-nous un message</h2>

                {formState === "success" ? (
                  <div className="text-center py-8">
                    <div className="bg-docfinder-secondary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                      <CheckCircle className="h-12 w-12 text-docfinder-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-docfinder-secondary">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <Button
                      onClick={() => setFormState("idle")}
                      className="bg-gradient-elegant hover:opacity-90 rounded-full"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          Nom complet
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          className="rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          className="rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700">
                        Sujet
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => handleChange({ name: "subject", value })}
                      >
                        <SelectTrigger className="rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent className="border-docfinder-primary">
                          <SelectItem value="general">Question générale</SelectItem>
                          <SelectItem value="appointment">Problème de rendez-vous</SelectItem>
                          <SelectItem value="account">Problème de compte</SelectItem>
                          <SelectItem value="technical">Problème technique</SelectItem>
                          <SelectItem value="partnership">Partenariat</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Votre message..."
                        rows={6}
                        className="rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-elegant hover:opacity-90 rounded-full"
                      disabled={formState === "submitting"}
                      size="lg"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </Button>

                    {formState === "error" && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                        Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
                      </div>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div className="mt-16 h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Carte Google Maps ici</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-docfinder-primary">Questions fréquentes</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Trouvez rapidement des réponses à vos questions les plus courantes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: "Comment prendre rendez-vous avec un médecin ?",
              answer:
                "Pour prendre rendez-vous, recherchez un médecin, consultez son profil et cliquez sur 'Prendre rendez-vous'. Sélectionnez ensuite une date et un horaire disponible, puis confirmez votre rendez-vous.",
            },
            {
              question: "Comment annuler ou modifier un rendez-vous ?",
              answer:
                "Connectez-vous à votre compte, accédez à la section 'Mes rendez-vous', puis cliquez sur le rendez-vous que vous souhaitez modifier ou annuler. Suivez ensuite les instructions à l'écran.",
            },
            {
              question: "Les consultations sont-elles remboursées par l'Assurance Maladie ?",
              answer:
                "Oui, les consultations prises via DocFinder sont remboursées normalement par l'Assurance Maladie, selon les conditions habituelles de prise en charge.",
            },
            {
              question: "Comment devenir médecin partenaire sur DocFinder ?",
              answer:
                "Pour rejoindre notre réseau de médecins, contactez-nous via le formulaire ci-dessus en sélectionnant 'Partenariat' comme sujet. Notre équipe vous contactera pour vous présenter notre offre.",
            },
          ].map((faq, index) => (
            <Card
              key={index}
              className="border-none shadow-elegant hover:shadow-card-hover transition-all duration-300 rounded-xl overflow-hidden"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-docfinder-primary">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
