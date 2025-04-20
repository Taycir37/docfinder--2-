"use client"

import { useEffect } from "react"

export default function Back4AppInit() {
  useEffect(() => {
    // Charger le script back4app-config.js
    const script = document.createElement("script")
    script.src = "/back4app-config.js"
    script.async = true
    script.onload = () => {
      console.log("Script Back4App chargé")
      // Initialiser Parse
      if (window.initializeParse) {
        window
          .initializeParse()
          .then(() => {
            console.log("Parse initialisé avec succès")
          })
          .catch((error) => {
            console.error("Erreur lors de l'initialisation de Parse:", error)
          })
      }
    }
    document.body.appendChild(script)

    return () => {
      // Nettoyer le script lors du démontage du composant
      document.body.removeChild(script)
    }
  }, [])

  return null
}
