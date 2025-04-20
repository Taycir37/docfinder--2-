// Fonction pour initialiser Parse
function initializeParse() {
  try {
    // Vérifier si les identifiants sont disponibles
    if (!window.BACK4APP_APPLICATION_ID || !window.BACK4APP_JAVASCRIPT_KEY) {
      console.error("Identifiants Back4App manquants")

      // Déclencher un événement pour signaler l'échec
      const event = new CustomEvent("parseInitializationFailed", {
        detail: { error: "Identifiants Back4App manquants" },
      })
      document.dispatchEvent(event)

      // Activer le mode démo
      window.PARSE_DEMO_MODE = true
      const demoEvent = new CustomEvent("parseDemoMode")
      document.dispatchEvent(demoEvent)

      return false
    }

    // Charger Parse depuis le CDN si ce n'est pas déjà fait
    if (typeof Parse === "undefined") {
      console.log("Initialisation de Parse avec les identifiants fournis")

      // Initialiser Parse avec les identifiants
      Parse.initialize(window.BACK4APP_APPLICATION_ID, window.BACK4APP_JAVASCRIPT_KEY)
      Parse.serverURL = window.BACK4APP_SERVER_URL

      // Déclencher un événement pour signaler le succès
      const event = new CustomEvent("parseInitialized")
      document.dispatchEvent(event)

      return true
    } else {
      console.log("Parse est déjà initialisé")
      return true
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Parse:", error)

    // Déclencher un événement pour signaler l'échec
    const event = new CustomEvent("parseInitializationFailed", {
      detail: { error: error.message },
    })
    document.dispatchEvent(event)

    // Activer le mode démo
    window.PARSE_DEMO_MODE = true
    const demoEvent = new CustomEvent("parseDemoMode")
    document.dispatchEvent(demoEvent)

    return false
  }
}

// Exposer la fonction d'initialisation
window.initializeParse = initializeParse

// Essayer d'initialiser Parse immédiatement si les identifiants sont disponibles
if (window.BACK4APP_APPLICATION_ID && window.BACK4APP_JAVASCRIPT_KEY) {
  console.log("Tentative d'initialisation automatique de Parse")

  // Vérifier si le SDK Parse est déjà chargé
  if (typeof Parse !== "undefined") {
    initializeParse()
  } else {
    console.log("Le SDK Parse n'est pas encore chargé, chargement depuis le CDN")

    // Charger le SDK Parse depuis le CDN
    const script = document.createElement("script")
    script.src = "https://npmcdn.com/parse/dist/parse.min.js"
    script.async = true
    script.onload = () => {
      console.log("SDK Parse chargé depuis le CDN")
      // Declare Parse variable
      window.Parse = require("parse")
      initializeParse()
    }
    script.onerror = () => {
      console.error("Erreur lors du chargement du SDK Parse")
      window.PARSE_DEMO_MODE = true
      const demoEvent = new CustomEvent("parseDemoMode")
      document.dispatchEvent(demoEvent)
    }
    document.head.appendChild(script)
  }
} else {
  console.warn("Identifiants Back4App non disponibles, mode démo activé")
  window.PARSE_DEMO_MODE = true

  // Déclencher un événement pour signaler le mode démo
  setTimeout(() => {
    const event = new CustomEvent("parseDemoMode")
    document.dispatchEvent(event)
  }, 0)
}
