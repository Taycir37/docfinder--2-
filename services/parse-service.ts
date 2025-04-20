// Service pour gérer l'initialisation et l'utilisation de Parse
import { demoStorage } from "./demo-storage"

// Type pour l'objet Parse global
declare global {
  interface Window {
    Parse: any
    BACK4APP_APPLICATION_ID?: string
    BACK4APP_JAVASCRIPT_KEY?: string
    BACK4APP_SERVER_URL?: string
  }
}

// État de l'initialisation
let parseInitialized = false
let parseInitializing = false
let parseError: Error | null = null
let isDemoMode = false

// Fonction pour créer un mock de Parse pour le mode démo
export function createParseMock() {
  console.log("Création d'un mock Parse pour le mode démo")

  // Stocker les données en mode démo
  const demoData: Record<string, any[]> = {
    users: [],
    doctors: [],
    appointments: [],
  }

  // Sauvegarder les données dans le stockage local
  const saveToStorage = () => {
    demoStorage.setItem("demoData", JSON.stringify(demoData))
  }

  // Charger les données depuis le stockage local
  const loadFromStorage = () => {
    try {
      const storedData = demoStorage.getItem("demoData")
      if (storedData) {
        const parsed = JSON.parse(storedData)
        Object.assign(demoData, parsed)
      }
    } catch (e) {
      console.error("Erreur lors du chargement des données démo:", e)
    }
  }

  // Charger les données existantes
  loadFromStorage()

  // Créer le mock de Parse
  window.Parse = {
    User: {
      signUp: (username: string, password: string, attrs: Record<string, any> = {}) => {
        const newUser = {
          id: `demo-user-${Date.now()}`,
          username,
          password, // En mode démo, on peut stocker le mot de passe en clair
          ...attrs,
          createdAt: new Date().toISOString(),
        }
        demoData.users.push(newUser)
        saveToStorage()
        console.log("Utilisateur enregistré en mode démo:", newUser)
        return Promise.resolve(newUser)
      },
      logIn: (username: string, password: string) => {
        const user = demoData.users.find((u) => u.username === username && u.password === password)
        if (user) {
          return Promise.resolve(user)
        }
        return Promise.reject(new Error("Identifiants incorrects"))
      },
      current: () => null,
    },
    Object: {
      extend: (className: string) => {
        return () => {
          const obj = {
            className,
            id: "",
            attributes: {},
            set: function (key: string, value: any) {
              this.attributes[key] = value
              return this
            },
            save: function () {
              const newObj = {
                id: `demo-${className}-${Date.now()}`,
                ...this.attributes,
                createdAt: new Date().toISOString(),
              }

              // Stocker dans la collection appropriée
              if (className === "Doctor") {
                demoData.doctors.push(newObj)
              } else if (className === "Appointment") {
                demoData.appointments.push(newObj)
              } else {
                // Collection générique
                if (!demoData[className]) {
                  demoData[className] = []
                }
                demoData[className].push(newObj)
              }

              saveToStorage()
              console.log(`Objet ${className} enregistré en mode démo:`, newObj)
              return Promise.resolve(newObj)
            },
            toJSON: function () {
              return { ...this.attributes, id: this.id }
            },
          }
          return obj
        }
      },
    },
    Query: (className: string) => ({
      className,
      equalTo: function () {
        return this
      },
      find: function () {
        // Retourner les objets de la collection appropriée
        if (this.className === "Doctor") {
          return Promise.resolve(demoData.doctors)
        } else if (this.className === "User") {
          return Promise.resolve(demoData.users)
        } else if (this.className === "Appointment") {
          return Promise.resolve(demoData.appointments)
        } else {
          return Promise.resolve(demoData[this.className] || [])
        }
      },
    }),
    demoMode: true,
    demoData: demoData,
    clearDemoData: () => {
      Object.keys(demoData).forEach((key) => {
        demoData[key] = []
      })
      saveToStorage()
      console.log("Données démo effacées")
    },
  }

  isDemoMode = true
  parseInitialized = true
  parseInitializing = false
  parseError = null

  return true
}

// Fonction pour initialiser Parse
export async function initializeParse(): Promise<boolean> {
  // Si Parse est déjà initialisé, retourner immédiatement
  if (parseInitialized) {
    return !isDemoMode // Retourne true si ce n'est pas le mode démo
  }

  // Si Parse est en cours d'initialisation, attendre
  if (parseInitializing) {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (!parseInitializing) {
          clearInterval(checkInterval)
          resolve(!isDemoMode)
        }
      }, 100)
    })
  }

  parseInitializing = true
  parseError = null

  try {
    console.log("Initialisation de Parse...")

    // 1. Vérifier si le script Parse est chargé
    if (typeof window.Parse === "undefined") {
      console.log("Chargement du script Parse...")

      // Charger le script Parse
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://npmcdn.com/parse/dist/parse.min.js"
        script.async = true
        script.onload = () => {
          console.log("Script Parse chargé avec succès")
          resolve()
        }
        script.onerror = () => {
          const error = new Error("Impossible de charger le script Parse")
          console.error(error)
          reject(error)
        }
        document.head.appendChild(script)
      })
    }

    // 2. Vérifier si les identifiants sont disponibles
    if (!window.BACK4APP_APPLICATION_ID || !window.BACK4APP_JAVASCRIPT_KEY) {
      console.log("Identifiants Back4App non disponibles, chargement des identifiants statiques...")

      // Charger les identifiants statiques
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "/back4app-credentials.js"
        script.async = true
        script.onload = () => {
          console.log("Identifiants Back4App chargés depuis le fichier statique")
          resolve()
        }
        script.onerror = () => {
          const error = new Error("Impossible de charger les identifiants Back4App")
          console.error(error)
          reject(error)
        }
        document.head.appendChild(script)
      })

      // Attendre un peu pour s'assurer que les variables sont définies
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // 3. Vérifier à nouveau si les identifiants sont disponibles
    if (!window.BACK4APP_APPLICATION_ID || !window.BACK4APP_JAVASCRIPT_KEY) {
      console.error("Identifiants Back4App toujours non disponibles, passage en mode démo")
      return createParseMock()
    }

    // 4. Initialiser Parse avec les identifiants
    window.Parse.initialize(window.BACK4APP_APPLICATION_ID, window.BACK4APP_JAVASCRIPT_KEY)
    window.Parse.serverURL = window.BACK4APP_SERVER_URL || "https://parseapi.back4app.com"

    // 5. Tester la connexion
    try {
      // Tenter une requête simple pour vérifier la connexion
      const TestObject = window.Parse.Object.extend("TestConnection")
      const testObject = new TestObject()
      testObject.set("connected", true)
      await testObject.save()
      console.log("Connexion à Back4App réussie")

      parseInitialized = true
      parseInitializing = false
      isDemoMode = false
      return true
    } catch (error) {
      console.error("Erreur lors du test de connexion à Back4App:", error)
      return createParseMock()
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Parse:", error)
    parseError = error instanceof Error ? error : new Error(String(error))
    parseInitializing = false

    // Passer en mode démo en cas d'erreur
    return createParseMock()
  }
}

// Fonction pour vérifier si Parse est initialisé
export function isParseInitialized(): boolean {
  return parseInitialized
}

// Fonction pour vérifier si Parse est en mode démo
export function isInDemoMode(): boolean {
  return isDemoMode
}

// Fonction pour obtenir l'erreur d'initialisation
export function getParseError(): Error | null {
  return parseError
}

// Fonction pour réinitialiser Parse
export async function resetParse(): Promise<boolean> {
  parseInitialized = false
  parseInitializing = false
  parseError = null
  isDemoMode = false

  return initializeParse()
}

// Initialiser Parse automatiquement
if (typeof window !== "undefined") {
  initializeParse().catch((error) => {
    console.error("Erreur lors de l'initialisation automatique de Parse:", error)
  })
}
