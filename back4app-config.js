// Import Parse
import Parse from "parse"

// Variables pour stocker la configuration
let BACK4APP_APPLICATION_ID = null
let BACK4APP_JAVASCRIPT_KEY = null
let BACK4APP_SERVER_URL = null

// Fonction pour récupérer la configuration depuis Netlify Function
async function fetchConfig() {
  try {
    const response = await fetch("/.netlify/functions/get-config")
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la configuration")
    }
    const config = await response.json()

    BACK4APP_APPLICATION_ID = config.appId
    BACK4APP_JAVASCRIPT_KEY = config.jsKey
    BACK4APP_SERVER_URL = config.serverURL

    // Initialiser Parse avec les valeurs récupérées
    Parse.initialize(BACK4APP_APPLICATION_ID, BACK4APP_JAVASCRIPT_KEY)
    Parse.serverURL = BACK4APP_SERVER_URL
    console.log("Back4App connecté avec succès!")

    // Déclencher un événement pour signaler que Parse est initialisé
    const event = new CustomEvent("parseInitialized")
    document.dispatchEvent(event)

    return true
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Parse:", error)

    // Fallback sur les valeurs par défaut en cas d'erreur
    BACK4APP_APPLICATION_ID = "YBahylKUfN5KUJTEx5i78YR7GXmMLF5hbTEnHudl"
    BACK4APP_JAVASCRIPT_KEY = "h2Fz4wXX6C5MQPyhWm7JumYK0eoeUoqjORDSdabs"
    BACK4APP_SERVER_URL = "https://parseapi.back4app.com"

    Parse.initialize(BACK4APP_APPLICATION_ID, BACK4APP_JAVASCRIPT_KEY)
    Parse.serverURL = BACK4APP_SERVER_URL
    console.log("Back4App connecté avec les valeurs par défaut")

    const event = new CustomEvent("parseInitialized")
    document.dispatchEvent(event)

    return false
  }
}

// Fonction d'initialisation de Parse (version simplifiée pour compatibilité)
function initializeParse() {
  if (BACK4APP_APPLICATION_ID && BACK4APP_JAVASCRIPT_KEY && BACK4APP_SERVER_URL) {
    Parse.initialize(BACK4APP_APPLICATION_ID, BACK4APP_JAVASCRIPT_KEY)
    Parse.serverURL = BACK4APP_SERVER_URL
    console.log("Back4App déjà initialisé")
    return Promise.resolve(true)
  } else {
    return fetchConfig()
  }
}

// Initialiser Parse automatiquement lorsque le script est chargé
document.addEventListener("DOMContentLoaded", () => {
  fetchConfig()
})

// Exporter les fonctions et objets pour les rendre accessibles globalement
window.Parse = Parse
window.initializeParse = initializeParse

// Exporter les fonctions et objets pour l'import dans d'autres fichiers
export { Parse, initializeParse, fetchConfig }
