"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Edit, Trash, Eye, Calendar } from "lucide-react"

// Mock data
const doctors = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    specialty: "Cardiologue",
    address: "15 rue de la Paix, Paris",
    phone: "01 23 45 67 89",
    status: "active",
    appointments: 124,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dr. Thomas Dubois",
    specialty: "Dermatologue",
    address: "8 avenue Victor Hugo, Lyon",
    phone: "04 56 78 90 12",
    status: "active",
    appointments: 98,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Dr. Marie Lefevre",
    specialty: "Pédiatre",
    address: "22 boulevard Gambetta, Marseille",
    phone: "04 91 23 45 67",
    status: "active",
    appointments: 156,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Dr. Jean Moreau",
    specialty: "Généraliste",
    address: "5 rue des Lilas, Bordeaux",
    phone: "05 56 78 90 12",
    status: "inactive",
    appointments: 87,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Dr. Claire Petit",
    specialty: "Ophtalmologue",
    address: "12 rue du Commerce, Toulouse",
    phone: "05 61 23 45 67",
    status: "active",
    appointments: 112,
    rating: 4.6,
  },
]

export function DoctorsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un médecin..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Spécialité</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>RDV</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.address}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant={doctor.status === "active" ? "default" : "secondary"}
                    className={doctor.status === "active" ? "bg-green-500" : "bg-gray-500"}
                  >
                    {doctor.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </TableCell>
                <TableCell>{doctor.appointments}</TableCell>
                <TableCell>{doctor.rating}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/doctors/${doctor.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/doctors/${doctor.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/doctors/${doctor.id}/schedule`}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Disponibilités
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
