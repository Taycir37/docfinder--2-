"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock, User, Phone, Loader2, AlertTriangle, Info, RefreshCw } from "lucide-react"
import { initializeParse, isParseInitialized, isInDemoMode, resetParse, getParseError } from "@/services/parse-service"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [parseReady, setParseReady] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // Initialiser Parse
  useEffect(() => {
    if (typeof window === "undefined") return

    const initialize = async () => {
      try {
        setIsInitializing(true)
        setError("")

        // Initialiser Parse
        await initializeParse()

        // Mettre à jour l'état
        setParseReady(isParseInitialized())
        setIsDemoMode(isInDemoMode())

        // Vérifier s'il y a une erreur
        const parseError = getParseError()
        if (parseError) {
          setError(parseError.message)
        }
      } catch (err) {
        console.error("Erreur lors de l'initialisation:", err)
        setError(err instanceof Error ? err.message : "Erreur d'initialisation inconnue")
      } finally {
        setIsInitializing(false)
      }
    }

    initialize()
  }, [])

  // Fonction pour réessayer l'initialisation
  const handleRetryInitialization = async () => {
    if (typeof window === "undefined") return

    try {
      setIsInitializing(true)
      setError("")

      // Réinitialiser Parse
      await resetParse()

      // Mettre à jour l'état
      setParseReady(isParseInitialized())
      setIsDemoMode(isInDemoMode())

      // Vérifier s'il y a une erreur
      const parseError = getParseError()
      if (parseError) {
        setError(parseError.message)
      }
    } catch (err) {
      console.error("Erreur lors de la réinitialisation:", err)
      setError(err instanceof Error ? err.message : "Erreur de réinitialisation inconnue")
    } finally {
      setIsInitializing(false)
    }
  }

  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const [doctorForm, setDoctorForm] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setPatientForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePatientCheckboxChange = (checked: boolean) => {
    setPatientForm((prev) => ({
      ...prev,
      terms: checked,
    }))
  }

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    setDoctorForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDoctorCheckboxChange = (checked: boolean) => {
    setDoctorForm((prev) => ({
      ...prev,
      terms: checked,
    }))
  }

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (patientForm.password !== patientForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    if (!patientForm.terms) {
      setError("Vous devez accepter les conditions d'utilisation.")
      return
    }

    setIsLoading(true)

    try {
      // Vérifier si Parse est disponible
      if (!window.Parse) {
        throw new Error("Back4App n'est pas disponible. Veuillez rafraîchir la page et réessayer.")
      }

      // Définir les propriétés de l'utilisateur
      const userAttributes = {
        username: patientForm.email,
        email: patientForm.email,
        password: patientForm.password,
        firstName: patientForm.firstName,
        lastName: patientForm.lastName,
        phone: patientForm.phone,
        userType: "patient",
      }

      // Enregistrer l'utilisateur
      const user = await window.Parse.User.signUp(userAttributes.username, userAttributes.password, {
        email: userAttributes.email,
        firstName: userAttributes.firstName,
        lastName: userAttributes.lastName,
        phone: userAttributes.phone,
        userType: "patient",
      })

      console.log("Utilisateur patient enregistré avec succès:", user)

      // Si en mode démo, afficher un message spécial
      if (isDemoMode) {
        alert("Mode démo : Inscription simulée avec succès ! Vos coordonnées ont été enregistrées localement.")
      } else {
        alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.")
      }

      // Rediriger vers la page de connexion
      router.push("/login")
    } catch (err: any) {
      console.error("Erreur lors de l'inscription :", err)
      setError(err.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (doctorForm.password !== doctorForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    if (!doctorForm.terms) {
      setError("Vous devez accepter les conditions d'utilisation.")
      return
    }

    setIsLoading(true)

    try {
      // Vérifier si Parse est disponible
      if (!window.Parse) {
        throw new Error("Back4App n'est pas disponible. Veuillez rafraîchir la page et réessayer.")
      }

      // Créer un nouvel utilisateur dans Back4App
      const userAttributes = {
        username: doctorForm.email,
        email: doctorForm.email,
        password: doctorForm.password,
        firstName: doctorForm.firstName,
        lastName: doctorForm.lastName,
        phone: doctorForm.phone,
        specialty: doctorForm.specialty,
        userType: "doctor",
      }

      // Enregistrer l'utilisateur
      const user = await window.Parse.User.signUp(userAttributes.username, userAttributes.password, {
        email: userAttributes.email,
        firstName: userAttributes.firstName,
        lastName: userAttributes.lastName,
        phone: userAttributes.phone,
        specialty: userAttributes.specialty,
        userType: "doctor",
      })

      console.log("Utilisateur médecin enregistré avec succès:", user)

      // Créer une entrée dans la classe Doctor
      const Doctor = window.Parse.Object.extend("Doctor")
      const doctor = new Doctor()
      doctor.set("user", user) // Relation avec l'utilisateur
      doctor.set("name", `Dr. ${doctorForm.firstName} ${doctorForm.lastName}`)
      doctor.set("specialty", doctorForm.specialty)
      doctor.set("phone", doctorForm.phone)
      doctor.set("email", doctorForm.email)

      const savedDoctor = await doctor.save()
      console.log("Profil médecin créé avec succès:", savedDoctor)

      // Si en mode démo, afficher un message spécial
      if (isDemoMode) {
        alert("Mode démo : Inscription médecin simulée avec succès ! Vos coordonnées ont été enregistrées localement.")
      } else {
        alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.")
      }

      // Rediriger vers la page de connexion
      router.push("/login")
    } catch (err: any) {
      console.error("Erreur lors de l'inscription :", err)
      setError(err.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 bg-gradient-soft">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-docfinder-primary mb-2">Créer un compte</h1>
            <p className="text-gray-600">
              Rejoignez DocFinder pour trouver facilement des médecins et prendre rendez-vous.
            </p>
          </div>

          {/* Afficher un message si en mode démo */}
          {isDemoMode && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                <div>
                  <h3 className="font-medium text-amber-800 mb-2">Mode démo activé</h3>
                  <p className="text-amber-700 mb-3">
                    L'application fonctionne actuellement en mode démo sans connexion à la base de données.
                    L'inscription et la connexion sont simulées.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200"
                    onClick={handleRetryInitialization}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer la connexion
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Afficher un indicateur de chargement */}
          {isInitializing && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 text-blue-500 mr-2 animate-spin" />
                <p className="text-blue-700">Initialisation de la connexion à la base de données...</p>
              </div>
            </div>
          )}

          {/* Afficher les erreurs */}
          {error && !isInitializing && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                <div>
                  <p className="text-red-700">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 bg-red-100 border-red-300 text-red-800 hover:bg-red-200"
                    onClick={handleRetryInitialization}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réessayer
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "patient" | "doctor")}>
            <TabsList className="grid grid-cols-2 mb-8 bg-white/50 p-1 rounded-full">
              <TabsTrigger
                value="patient"
                className="rounded-full data-[state=active]:bg-docfinder-primary data-[state=active]:text-white"
              >
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="rounded-full data-[state=active]:bg-docfinder-primary data-[state=active]:text-white"
              >
                Médecin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <Card className="border-none shadow-elegant rounded-xl overflow-hidden">
                <CardContent className="pt-6">
                  <form onSubmit={handlePatientSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-firstName">Prénom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                          <Input
                            id="patient-firstName"
                            name="firstName"
                            value={patientForm.firstName}
                            onChange={handlePatientChange}
                            placeholder="Votre prénom"
                            className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-lastName">Nom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                          <Input
                            id="patient-lastName"
                            name="lastName"
                            value={patientForm.lastName}
                            onChange={handlePatientChange}
                            placeholder="Votre nom"
                            className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="patient-email"
                          name="email"
                          type="email"
                          value={patientForm.email}
                          onChange={handlePatientChange}
                          placeholder="votre@email.com"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="patient-phone"
                          name="phone"
                          type="tel"
                          value={patientForm.phone}
                          onChange={handlePatientChange}
                          placeholder="Votre numéro de téléphone"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="patient-password"
                          name="password"
                          type="password"
                          value={patientForm.password}
                          onChange={handlePatientChange}
                          placeholder="••••••••"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="patient-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={patientForm.confirmPassword}
                          onChange={handlePatientChange}
                          placeholder="••••••••"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="patient-terms"
                        checked={patientForm.terms}
                        onCheckedChange={handlePatientCheckboxChange}
                        className="text-docfinder-primary focus:ring-docfinder-primary"
                      />
                      <label
                        htmlFor="patient-terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J'accepte les{" "}
                        <Link href="/terms" className="text-docfinder-primary hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-docfinder-primary hover:underline">
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-elegant hover:opacity-90 rounded-full"
                      disabled={isLoading || isInitializing}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : isDemoMode ? (
                        "Simuler l'inscription"
                      ) : (
                        "Créer un compte"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor">
              <Card className="border-none shadow-elegant rounded-xl overflow-hidden">
                <CardContent className="pt-6">
                  <form onSubmit={handleDoctorSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-firstName">Prénom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                          <Input
                            id="doctor-firstName"
                            name="firstName"
                            value={doctorForm.firstName}
                            onChange={handleDoctorChange}
                            placeholder="Votre prénom"
                            className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-lastName">Nom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                          <Input
                            id="doctor-lastName"
                            name="lastName"
                            value={doctorForm.lastName}
                            onChange={handleDoctorChange}
                            placeholder="Votre nom"
                            className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-specialty">Spécialité</Label>
                      <Input
                        id="doctor-specialty"
                        name="specialty"
                        value={doctorForm.specialty}
                        onChange={handleDoctorChange}
                        placeholder="Votre spécialité médicale"
                        className="rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="doctor-email"
                          name="email"
                          type="email"
                          value={doctorForm.email}
                          onChange={handleDoctorChange}
                          placeholder="votre@email.com"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-phone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="doctor-phone"
                          name="phone"
                          type="tel"
                          value={doctorForm.phone}
                          onChange={handleDoctorChange}
                          placeholder="Votre numéro de téléphone"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="doctor-password"
                          name="password"
                          type="password"
                          value={doctorForm.password}
                          onChange={handleDoctorChange}
                          placeholder="••••••••"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-confirmPassword">Confirmer le mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-docfinder-primary h-4 w-4" />
                        <Input
                          id="doctor-confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={doctorForm.confirmPassword}
                          onChange={handleDoctorChange}
                          placeholder="••••••••"
                          className="pl-10 rounded-lg border-gray-300 focus:border-docfinder-primary focus:ring-docfinder-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="doctor-terms"
                        checked={doctorForm.terms}
                        onCheckedChange={handleDoctorCheckboxChange}
                        className="text-docfinder-primary focus:ring-docfinder-primary"
                      />
                      <label
                        htmlFor="doctor-terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J'accepte les{" "}
                        <Link href="/terms" className="text-docfinder-primary hover:underline">
                          conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-docfinder-primary hover:underline">
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-elegant hover:opacity-90 rounded-full"
                      disabled={isLoading || isInitializing}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : isDemoMode ? (
                        "Simuler l'inscription"
                      ) : (
                        "Créer un compte"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-docfinder-primary hover:underline font-medium">
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-elegant relative">
        <div className="absolute inset-0 bg-[url('/doctor-consultation.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez la communauté DocFinder</h2>
            <p className="text-white/80 mb-8">
              Que vous soyez patient à la recherche d'un médecin ou professionnel de santé souhaitant développer votre
              patientèle, DocFinder vous offre une solution simple et efficace.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                <div className="text-3xl font-bold">3600+</div>
                <div className="text-white/80">Utilisateurs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-white/80">Médecins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
