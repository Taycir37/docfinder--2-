"use client"

import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Accès non autorisé</h1>
        <p className="mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
