// Service pour gérer le stockage en mode démo

// Fonction pour vérifier si le localStorage est disponible
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// Créer un objet de stockage en mémoire si localStorage n'est pas disponible
const memoryStorage: Record<string, string> = {}

// Exporter les méthodes de stockage
export const demoStorage = {
  setItem: (key: string, value: string): void => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(`docfinder_demo_${key}`, value)
    } else {
      memoryStorage[`docfinder_demo_${key}`] = value
    }
  },

  getItem: (key: string): string | null => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem(`docfinder_demo_${key}`)
    } else {
      return memoryStorage[`docfinder_demo_${key}`] || null
    }
  },

  removeItem: (key: string): void => {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(`docfinder_demo_${key}`)
    } else {
      delete memoryStorage[`docfinder_demo_${key}`]
    }
  },

  clear: (): void => {
    if (isLocalStorageAvailable()) {
      // Supprimer uniquement les clés qui commencent par docfinder_demo_
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("docfinder_demo_")) {
          localStorage.removeItem(key)
        }
      })
    } else {
      Object.keys(memoryStorage).forEach((key) => {
        if (key.startsWith("docfinder_demo_")) {
          delete memoryStorage[key]
        }
      })
    }
  },
}

// Fonction pour vérifier si des données démo existent
export const hasDemoData = (): boolean => {
  return !!demoStorage.getItem("demoData")
}

// Fonction pour obtenir toutes les données démo
export const getAllDemoData = (): Record<string, any> => {
  try {
    const data = demoStorage.getItem("demoData")
    return data ? JSON.parse(data) : {}
  } catch (e) {
    console.error("Erreur lors de la récupération des données démo:", e)
    return {}
  }
}
