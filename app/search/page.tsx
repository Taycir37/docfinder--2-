import { Search } from "@/components/search"
import { DoctorsList } from "@/components/doctors-list"
import { Filters } from "@/components/filters"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { city?: string; specialty?: string }
}) {
  const city = searchParams.city || ""
  const specialty = searchParams.specialty || ""

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Recherche de médecins</h1>
          <Search />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <div className="w-full md:w-1/4">
            <Filters />
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {city && specialty
                  ? `Résultats pour ${specialty} à ${city}`
                  : city
                    ? `Médecins à ${city}`
                    : specialty
                      ? `${specialty}s disponibles`
                      : "Tous les médecins disponibles"}
              </h2>
              <p className="text-gray-600">12 médecins trouvés</p>
            </div>

            <DoctorsList city={city} specialty={specialty} />
          </div>
        </div>
      </div>
    </div>
  )
}
