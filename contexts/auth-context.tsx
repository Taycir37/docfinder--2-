"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  username: string
  email: string
  userType: "patient" | "doctor" | "admin"
  [key: string]: any
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth()
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Fonction utilitaire pour extraire les données utilisateur de l'objet Parse.User
  const extractUserData = (parseUser: any): User => {
    // Si toJSON existe, l'utiliser
    if (parseUser.toJSON && typeof parseUser.toJSON === "function") {
      const userData = parseUser.toJSON()
      return {
        id: userData.objectId,
        username: userData.username,
        email: userData.email,
        userType: userData.userType || "patient",
        ...userData,
      }
    }

    // Sinon, extraire manuellement les données
    // Certaines implémentations de Parse peuvent avoir des getters pour ces propriétés
    const id = parseUser.id || parseUser.objectId
    const username = parseUser.get ? parseUser.get("username") : parseUser.username
    const email = parseUser.get ? parseUser.get("email") : parseUser.email
    const userType = (parseUser.get ? parseUser.get("userType") : parseUser.userType) || "patient"

    // Construire un objet utilisateur avec les données disponibles
    return {
      id,
      username,
      email,
      userType,
      // Ajouter d'autres propriétés si nécessaire
    }
  }

  // Vérifier si l'utilisateur est connecté
  const checkAuth = async (): Promise<boolean> => {
    try {
      // Vérifier si Parse est initialisé
      if (typeof window === "undefined" || !window.Parse) {
        return false
      }

      const currentUser = window.Parse.User.current()
      if (currentUser) {
        // Extraire les données utilisateur
        const userData = extractUserData(currentUser)
        setUser(userData)
        return true
      } else {
        setUser(null)
        return false
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error)
      setUser(null)
      return false
    }
  }

  // Connexion
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Vérifier si Parse est initialisé
      if (!window.Parse) {
        throw new Error("Parse n'est pas initialisé")
      }

      const loggedInUser = await window.Parse.User.logIn(username, password)
      if (loggedInUser) {
        // Extraire les données utilisateur
        const userData = extractUserData(loggedInUser)
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Déconnexion
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)

      // Vérifier si Parse est initialisé
      if (!window.Parse) {
        throw new Error("Parse n'est pas initialisé")
      }

      await window.Parse.User.logOut()
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Erreur de déconnexion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
