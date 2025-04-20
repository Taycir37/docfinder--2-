// Services pour interagir avec Back4App
import { Parse } from "./back4app-config.js"

// Service d'authentification
export const AuthService = {
  // Inscription d'un nouvel utilisateur
  signUp: async (username, email, password, firstName, lastName, phone) => {
    try {
      const user = new Parse.User()
      user.set("username", username)
      user.set("email", email)
      user.set("password", password)
      user.set("firstName", firstName)
      user.set("lastName", lastName)
      user.set("phone", phone)

      await user.signUp()
      return user.toJSON()
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      throw error
    }
  },

  // Connexion d'un utilisateur
  login: async (username, password) => {
    try {
      const user = await Parse.User.logIn(username, password)
      return user.toJSON()
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      throw error
    }
  },

  // Déconnexion de l'utilisateur
  logout: async () => {
    try {
      await Parse.User.logOut()
      return true
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      return false
    }
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: () => {
    const user = Parse.User.current()
    return user ? user.toJSON() : null
  },
}

// Service pour les médecins
export const DoctorService = {
  // Récupérer tous les médecins
  getAllDoctors: async () => {
    try {
      const Doctor = Parse.Object.extend("Doctor")
      const query = new Parse.Query(Doctor)
      query.limit(100) // Limiter à 100 résultats

      const results = await query.find()
      return results.map((doctor) => {
        const data = doctor.toJSON()
        data.id = doctor.id
        return data
      })
    } catch (error) {
      console.error("Erreur lors de la récupération des médecins:", error)
      return []
    }
  },

  // Rechercher des médecins par ville et spécialité
  searchDoctors: async (city, specialty) => {
    try {
      const Doctor = Parse.Object.extend("Doctor")
      const query = new Parse.Query(Doctor)

      if (city) {
        query.equalTo("city", city)
      }

      if (specialty) {
        query.equalTo("specialty", specialty)
      }

      query.limit(100) // Limiter à 100 résultats

      const results = await query.find()
      return results.map((doctor) => {
        const data = doctor.toJSON()
        data.id = doctor.id
        return data
      })
    } catch (error) {
      console.error("Erreur lors de la recherche des médecins:", error)
      return []
    }
  },

  // Récupérer un médecin par son ID
  getDoctorById: async (doctorId) => {
    try {
      const Doctor = Parse.Object.extend("Doctor")
      const query = new Parse.Query(Doctor)

      const doctor = await query.get(doctorId)
      const data = doctor.toJSON()
      data.id = doctor.id
      return data
    } catch (error) {
      console.error("Erreur lors de la récupération du médecin:", error)
      throw error
    }
  },
}

// Service pour les avis
export const ReviewService = {
  // Récupérer les avis d'un médecin
  getDoctorReviews: async (doctorId) => {
    try {
      const Doctor = Parse.Object.extend("Doctor")
      const doctorPointer = new Doctor()
      doctorPointer.id = doctorId

      const Review = Parse.Object.extend("Review")
      const query = new Parse.Query(Review)
      query.equalTo("doctor", doctorPointer)
      query.include("patient") // Inclure les données du patient
      query.descending("createdAt") // Trier par date décroissante

      const results = await query.find()
      return results.map((review) => {
        const data = review.toJSON()
        data.id = review.id

        // Formater les données du patient
        if (data.patient) {
          data.patient = {
            id: data.patient.objectId,
            firstName: data.patient.firstName,
            lastName: data.patient.lastName,
          }
        }

        return data
      })
    } catch (error) {
      console.error("Erreur lors de la récupération des avis:", error)
      return []
    }
  },

  // Ajouter un avis
  addReview: async (doctorId, rating, comment) => {
    try {
      // Vérifier que l'utilisateur est connecté
      const currentUser = Parse.User.current()
      if (!currentUser) {
        throw new Error("Vous devez être connecté pour laisser un avis")
      }

      // Créer un pointeur vers le médecin
      const Doctor = Parse.Object.extend("Doctor")
      const doctorPointer = new Doctor()
      doctorPointer.id = doctorId

      // Créer l'avis
      const Review = Parse.Object.extend("Review")
      const review = new Review()

      review.set("doctor", doctorPointer)
      review.set("patient", currentUser)
      review.set("rating", rating)
      review.set("comment", comment)
      review.set("date", new Date())

      await review.save()

      // Mettre à jour la note moyenne du médecin
      await updateDoctorRating(doctorId)

      return true
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'avis:", error)
      throw error
    }
  },
}

// Service pour les rendez-vous
export const AppointmentService = {
  // Créer un rendez-vous
  createAppointment: async (doctorId, date, time, reason) => {
    try {
      // Vérifier que l'utilisateur est connecté
      const currentUser = Parse.User.current()
      if (!currentUser) {
        throw new Error("Vous devez être connecté pour prendre un rendez-vous")
      }

      // Créer un pointeur vers le médecin
      const Doctor = Parse.Object.extend("Doctor")
      const doctorPointer = new Doctor()
      doctorPointer.id = doctorId

      // Créer le rendez-vous
      const Appointment = Parse.Object.extend("Appointment")
      const appointment = new Appointment()

      appointment.set("doctor", doctorPointer)
      appointment.set("patient", currentUser)
      appointment.set("date", date)
      appointment.set("time", time)
      appointment.set("reason", reason)
      appointment.set("status", "pending") // pending, confirmed, cancelled

      await appointment.save()

      return {
        id: appointment.id,
        date,
        time,
        reason,
        status: "pending",
      }
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error)
      throw error
    }
  },

  // Récupérer les rendez-vous d'un utilisateur
  getUserAppointments: async () => {
    try {
      // Vérifier que l'utilisateur est connecté
      const currentUser = Parse.User.current()
      if (!currentUser) {
        throw new Error("Vous devez être connecté pour voir vos rendez-vous")
      }

      const Appointment = Parse.Object.extend("Appointment")
      const query = new Parse.Query(Appointment)
      query.equalTo("patient", currentUser)
      query.include("doctor") // Inclure les données du médecin
      query.descending("date") // Trier par date décroissante

      const results = await query.find()
      return results.map((appointment) => {
        const data = appointment.toJSON()
        data.id = appointment.id

        // Formater les données du médecin
        if (data.doctor) {
          data.doctor = {
            id: data.doctor.objectId,
            name: data.doctor.name,
            specialty: data.doctor.specialty,
          }
        }

        return data
      })
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error)
      return []
    }
  },
}

// Fonction utilitaire pour mettre à jour la note moyenne d'un médecin
async function updateDoctorRating(doctorId) {
  try {
    // Récupérer tous les avis du médecin
    const Doctor = Parse.Object.extend("Doctor")
    const doctorPointer = new Doctor()
    doctorPointer.id = doctorId

    const Review = Parse.Object.extend("Review")
    const query = new Parse.Query(Review)
    query.equalTo("doctor", doctorPointer)

    const reviews = await query.find()

    // Calculer la note moyenne
    let totalRating = 0
    reviews.forEach((review) => {
      totalRating += review.get("rating")
    })

    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

    // Mettre à jour le médecin
    const doctorQuery = new Parse.Query(Doctor)
    const doctor = await doctorQuery.get(doctorId)

    doctor.set("rating", averageRating)
    doctor.set("reviewCount", reviews.length)

    await doctor.save()

    return true
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la note du médecin:", error)
    return false
  }
}
