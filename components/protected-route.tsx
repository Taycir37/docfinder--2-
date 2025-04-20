"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

type ProtectedRouteProps = {
  children: React.ReactNode
  requiredUserType?: "patient" | "doctor" | "admin"
}

export function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
    } else if (!isLoading && isAuthenticated && requiredUserType) {
      // Vérifier le type d'utilisateur si requis
      if (user?.userType !== requiredUserType) {
        router.push("/unauthorized")
      }
    }
  }, [isLoading, isAuthenticated, user, router, requiredUserType])

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Chargement...</div>
  }

  // Ne pas afficher le contenu si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return null
  }

  // Ne pas afficher le contenu si l'utilisateur n'a pas le type requis
  if (requiredUserType && user?.userType !== requiredUserType) {
    return null
  }

  return <>{children}</>
}
