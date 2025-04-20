"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllDemoData, demoStorage } from "@/services/demo-storage"
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react"

export default function DemoDataPage() {
  const [demoData, setDemoData] = useState<Record<string, any>>({})
  const [activeTab, setActiveTab] = useState<string>("users")
  const [isLoading, setIsLoading] = useState(true)

  // Charger les données démo
  const loadDemoData = () => {
    setIsLoading(true)
    const data = getAllDemoData()
    setDemoData(data)
    setIsLoading(false)
  }

  // Effacer les données démo
  const clearDemoData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer toutes les données démo ?")) {
      demoStorage.clear()
      loadDemoData()
    }
  }

  // Charger les données au chargement de la page
  useEffect(() => {
    loadDemoData()
  }, [])

  // Déterminer les onglets disponibles
  const availableTabs = Object.keys(demoData).filter((key) => Array.isArray(demoData[key]) && demoData[key].length > 0)

  // Si aucun onglet n'est disponible, définir un onglet par défaut
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0])
    }
  }, [availableTabs, activeTab])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Données en Mode Démo</h1>
          <p className="text-gray-600 mb-4">
            Cette page affiche les données stockées localement lorsque l'application fonctionne en mode démo.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={loadDemoData} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="destructive" onClick={clearDemoData} disabled={isLoading}>
            <Trash2 className="h-4 w-4 mr-2" />
            Effacer
          </Button>
        </div>
      </div>

      {Object.keys(demoData).length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center p-4 bg-amber-50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
              <div>
                <h3 className="font-medium text-amber-800">Aucune donnée disponible</h3>
                <p className="text-amber-700">
                  Aucune donnée n'a été enregistrée en mode démo. Essayez de vous inscrire ou de vous connecter en mode
                  démo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              {availableTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize">
                  {tab} ({demoData[tab]?.length || 0})
                </TabsTrigger>
              ))}
            </TabsList>

            {availableTabs.map((tab) => (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{tab}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2 text-left">ID</th>
                            {demoData[tab]?.length > 0 &&
                              Object.keys(demoData[tab][0])
                                .filter((key) => key !== "id" && key !== "password")
                                .map((key) => (
                                  <th key={key} className="border p-2 text-left capitalize">
                                    {key}
                                  </th>
                                ))}
                            <th className="border p-2 text-left">Date de création</th>
                          </tr>
                        </thead>
                        <tbody>
                          {demoData[tab]?.map((item: any, index: number) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="border p-2">{item.id}</td>
                              {Object.keys(item)
                                .filter((key) => key !== "id" && key !== "password")
                                .map((key) => (
                                  <td key={key} className="border p-2">
                                    {typeof item[key] === "object" ? JSON.stringify(item[key]) : String(item[key])}
                                  </td>
                                ))}
                              <td className="border p-2">
                                {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Non disponible"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  )
}
