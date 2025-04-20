"use client"

import { useState } from "react"
import { DoctorsList } from "@/components/admin/doctors-list"
import { DoctorForm } from "@/components/admin/doctor-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Mock doctors data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologue",
    city: "Paris",
    address: "15 Rue de la Paix, 75002 Paris",
    phone: "01 23 45 67 89",
    hours: "Lun-Ven: 9h-18h",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Dermatologue",
    city: "Lyon",
    address: "8 Avenue Jean Jaurès, 69007 Lyon",
    phone: "04 56 78 90 12",
    hours: "Lun-Ven: 8h30-17h",
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Claire Leroy",
    specialty: "Pédiatre",
    city: "Marseille",
    address: "22 Boulevard Michelet, 13008 Marseille",
    phone: "04 91 23 45 67",
    hours: "Lun-Sam: 9h-19h",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. Pierre Blanc",
    specialty: "Médecin généraliste",
    city: "Paris",
    address: "45 Rue de Rivoli, 75004 Paris",
    phone: "01 34 56 78 90",
    hours: "Lun-Ven: 8h-19h, Sam: 9h-12h",
    rating: 4.7,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Dr. Marie Rousseau",
    specialty: "Ophtalmologue",
    city: "Lyon",
    address: "12 Rue de la République, 69002 Lyon",
    phone: "04 12 34 56 78",
    hours: "Lun-Ven: 9h-17h30",
    rating: 4.5,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Dr. Jean Moreau",
    specialty: "Dentiste",
    city: "Paris",
    address: "3 Avenue des Champs-Élysées, 75008 Paris",
    phone: "01 45 67 89 01",
    hours: "Lun-Ven: 9h-18h30",
    rating: 4.4,
    reviews: 112,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function AdminDashboard() {
  const [doctors, setDoctors] = useState(mockDoctors)
  const [isAddingDoctor, setIsAddingDoctor] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<(typeof mockDoctors)[0] | null>(null)
  const [activeTab, setActiveTab] = useState("doctors")

  const handleAddDoctor = (newDoctor: Omit<(typeof mockDoctors)[0], "id" | "rating" | "reviews">) => {
    const doctorWithId = {
      ...newDoctor,
      id: doctors.length + 1,
      rating: 0,
      reviews: 0,
    }
    setDoctors([...doctors, doctorWithId])
    setIsAddingDoctor(false)
  }

  const handleUpdateDoctor = (updatedDoctor: (typeof mockDoctors)[0]) => {
    setDoctors(doctors.map((doctor) => (doctor.id === updatedDoctor.id ? updatedDoctor : doctor)))
    setEditingDoctor(null)
  }

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
          <p className="text-blue-100">Gérez les médecins et leurs disponibilités</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="doctors">Médecins</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {activeTab === "doctors" && !isAddingDoctor && !editingDoctor && (
              <Button onClick={() => setIsAddingDoctor(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un médecin
              </Button>
            )}
          </div>

          <TabsContent value="doctors">
            {isAddingDoctor ? (
              <DoctorForm onSubmit={handleAddDoctor} onCancel={() => setIsAddingDoctor(false)} />
            ) : editingDoctor ? (
              <DoctorForm
                doctor={editingDoctor}
                onSubmit={handleUpdateDoctor}
                onCancel={() => setEditingDoctor(null)}
              />
            ) : (
              <DoctorsList doctors={doctors} onEdit={setEditingDoctor} onDelete={handleDeleteDoctor} />
            )}
          </TabsContent>

          <TabsContent value="appointments">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Gestion des rendez-vous à venir prochainement</h3>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Gestion des avis à venir prochainement</h3>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Paramètres du site à venir prochainement</h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
