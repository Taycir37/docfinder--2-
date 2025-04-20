// Script pour initialiser les données dans Back4App
// À exécuter une seule fois pour créer les classes et ajouter des données de test

// Importation de Parse
const Parse = require("parse/node")

// Configuration de Back4App
const BACK4APP_APPLICATION_ID = "YBahylKUfN5KUJTEx5i78YR7GXmMLF5hbTEnHudl"
const BACK4APP_JAVASCRIPT_KEY = "h2Fz4wXX6C5MQPyhWm7JumYK0eoeUoqjORDSdabs"
const BACK4APP_MASTER_KEY = "VOTRE_MASTER_KEY" // Remplacez par votre Master Key
const BACK4APP_SERVER_URL = "https://parseapi.back4app.com"

// Initialisation de Parse avec la Master Key
Parse.initialize(BACK4APP_APPLICATION_ID, BACK4APP_JAVASCRIPT_KEY, BACK4APP_MASTER_KEY)
Parse.serverURL = BACK4APP_SERVER_URL

// Données de test pour les médecins
const doctors = [
  {
    name: "Dr. Sophie Martin",
    specialty: "Cardiologue",
    city: "Paris",
    address: "15 rue de la Paix, 75001",
    phone: "01 23 45 67 89",
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Cardiologue expérimentée spécialisée dans les maladies cardiovasculaires. Plus de 15 ans d'expérience dans le diagnostic et le traitement des pathologies cardiaques.",
    availability: "Disponible aujourd'hui",
    rating: 4.9,
    reviewCount: 124,
    education: [
      {
        degree: "Doctorat en Médecine",
        institution: "Université Paris Descartes",
        year: "2005",
      },
      {
        degree: "Spécialisation en Cardiologie",
        institution: "Hôpital Européen Georges-Pompidou",
        year: "2010",
      },
    ],
    experience: [
      {
        position: "Cardiologue",
        institution: "Hôpital Pitié-Salpêtrière",
        startYear: "2010",
        endYear: "2018",
        description: "Prise en charge des patients atteints de maladies cardiovasculaires",
      },
      {
        position: "Cardiologue en cabinet privé",
        institution: "Cabinet Médical du Marais",
        startYear: "2018",
        endYear: null,
        description: "Consultations et suivi des patients cardiaques",
      },
    ],
  },
  {
    name: "Dr. Thomas Dubois",
    specialty: "Dermatologue",
    city: "Lyon",
    address: "8 avenue Victor Hugo, 69002",
    phone: "04 56 78 90 12",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Dermatologue spécialisé dans le traitement des maladies de la peau et des affections cutanées. Expert en dermatologie esthétique et médicale.",
    availability: "Disponible demain",
    rating: 4.8,
    reviewCount: 98,
    education: [
      {
        degree: "Doctorat en Médecine",
        institution: "Université Claude Bernard Lyon 1",
        year: "2008",
      },
      {
        degree: "Spécialisation en Dermatologie",
        institution: "Hôpital Édouard Herriot",
        year: "2013",
      },
    ],
    experience: [
      {
        position: "Dermatologue",
        institution: "Centre Hospitalier Lyon Sud",
        startYear: "2013",
        endYear: "2017",
        description: "Traitement des maladies de la peau et des affections cutanées",
      },
      {
        position: "Dermatologue en cabinet privé",
        institution: "Centre Dermatologique de Lyon",
        startYear: "2017",
        endYear: null,
        description: "Consultations et soins dermatologiques",
      },
    ],
  },
  {
    name: "Dr. Marie Lefevre",
    specialty: "Pédiatre",
    city: "Marseille",
    address: "22 boulevard Gambetta, 13001",
    phone: "04 91 23 45 67",
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Pédiatre dévouée avec une approche centrée sur l'enfant et sa famille. Spécialisée dans le développement de l'enfant et les soins pédiatriques préventifs.",
    availability: "Disponible aujourd'hui",
    rating: 4.9,
    reviewCount: 156,
    education: [
      {
        degree: "Doctorat en Médecine",
        institution: "Université Aix-Marseille",
        year: "2007",
      },
      {
        degree: "Spécialisation en Pédiatrie",
        institution: "Hôpital de la Timone",
        year: "2012",
      },
    ],
    experience: [
      {
        position: "Pédiatre",
        institution: "Hôpital Nord",
        startYear: "2012",
        endYear: "2016",
        description: "Soins pédiatriques et suivi du développement des enfants",
      },
      {
        position: "Pédiatre en cabinet privé",
        institution: "Centre Pédiatrique du Vieux-Port",
        startYear: "2016",
        endYear: null,
        description: "Consultations et soins pédiatriques",
      },
    ],
  },
  {
    name: "Dr. Jean Moreau",
    specialty: "Généraliste",
    city: "Bordeaux",
    address: "5 rue des Lilas, 33000",
    phone: "05 56 78 90 12",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Médecin généraliste avec plus de 20 ans d'expérience. Approche holistique de la santé, prenant en compte tous les aspects de la vie du patient.",
    availability: "Disponible demain",
    rating: 4.7,
    reviewCount: 87,
    education: [
      {
        degree: "Doctorat en Médecine",
        institution: "Université de Bordeaux",
        year: "2000",
      },
    ],
    experience: [
      {
        position: "Médecin généraliste",
        institution: "Centre Médical Saint-Michel",
        startYear: "2000",
        endYear: "2010",
        description: "Consultations et suivi médical général",
      },
      {
        position: "Médecin généraliste en cabinet privé",
        institution: "Cabinet Médical des Chartrons",
        startYear: "2010",
        endYear: null,
        description: "Médecine générale et préventive",
      },
    ],
  },
]

// Fonction pour créer les classes et ajouter les données
async function initializeData() {
  try {
    console.log("Initialisation des données dans Back4App...")

    // Création de la classe Doctor si elle n'existe pas déjà
    if (!(await classExists("Doctor"))) {
      await createClass("Doctor", {
        name: { type: "String", required: true },
        specialty: { type: "String", required: true },
        city: { type: "String", required: true },
        address: { type: "String", required: true },
        phone: { type: "String", required: true },
        imageUrl: { type: "String" },
        bio: { type: "String" },
        availability: { type: "String" },
        rating: { type: "Number", defaultValue: 0 },
        reviewCount: { type: "Number", defaultValue: 0 },
        education: { type: "Array" },
        experience: { type: "Array" },
      })
      console.log("Classe Doctor créée avec succès")
    } else {
      console.log("La classe Doctor existe déjà")
    }

    // Création de la classe Review si elle n'existe pas déjà
    if (!(await classExists("Review"))) {
      await createClass("Review", {
        doctor: { type: "Pointer", targetClass: "Doctor", required: true },
        patient: { type: "Pointer", targetClass: "_User", required: true },
        rating: { type: "Number", required: true },
        comment: { type: "String", required: true },
        date: { type: "Date", required: true },
      })
      console.log("Classe Review créée avec succès")
    } else {
      console.log("La classe Review existe déjà")
    }

    // Création de la classe Appointment si elle n'existe pas déjà
    if (!(await classExists("Appointment"))) {
      await createClass("Appointment", {
        doctor: { type: "Pointer", targetClass: "Doctor", required: true },
        patient: { type: "Pointer", targetClass: "_User", required: true },
        date: { type: "String", required: true },
        time: { type: "String", required: true },
        reason: { type: "String" },
        status: { type: "String", defaultValue: "pending" },
      })
      console.log("Classe Appointment créée avec succès")
    } else {
      console.log("La classe Appointment existe déjà")
    }

    // Ajout des médecins de test
    const Doctor = Parse.Object.extend("Doctor")

    // Vérifier si des médecins existent déjà
    const query = new Parse.Query(Doctor)
    const existingDoctors = await query.find({ useMasterKey: true })

    if (existingDoctors.length === 0) {
      console.log("Ajout des médecins de test...")

      for (const doctorData of doctors) {
        const doctor = new Doctor()

        // Ajouter les données du médecin
        for (const [key, value] of Object.entries(doctorData)) {
          doctor.set(key, value)
        }

        await doctor.save(null, { useMasterKey: true })
        console.log(`Médecin ajouté: ${doctorData.name}`)
      }

      console.log("Tous les médecins ont été ajoutés avec succès")
    } else {
      console.log(`${existingDoctors.length} médecins existent déjà dans la base de données`)
    }

    console.log("Initialisation des données terminée avec succès")
  } catch (error) {
    console.error("Erreur lors de l'initialisation des données:", error)
  }
}

// Fonction pour vérifier si une classe existe
async function classExists(className) {
  try {
    const response = await Parse.Schema.all({ useMasterKey: true })
    return response.some((schema) => schema.className === className)
  } catch (error) {
    console.error(`Erreur lors de la vérification de la classe ${className}:`, error)
    return false
  }
}

// Fonction pour créer une classe
async function createClass(className, fields) {
  try {
    const schema = new Parse.Schema(className)

    // Ajouter les champs
    for (const [fieldName, fieldOptions] of Object.entries(fields)) {
      const { type, required, defaultValue, targetClass } = fieldOptions

      switch (type) {
        case "String":
          schema.addString(fieldName, { required })
          break
        case "Number":
          schema.addNumber(fieldName, { required })
          break
        case "Boolean":
          schema.addBoolean(fieldName, { required })
          break
        case "Date":
          schema.addDate(fieldName, { required })
          break
        case "Array":
          schema.addArray(fieldName, { required })
          break
        case "Object":
          schema.addObject(fieldName, { required })
          break
        case "Pointer":
          schema.addPointer(fieldName, targetClass, { required })
          break
        default:
          schema.addField(fieldName, { type, required })
      }

      // Ajouter une valeur par défaut si spécifiée
      if (defaultValue !== undefined) {
        schema.addField(fieldName, { defaultValue })
      }
    }

    // Sauvegarder le schéma
    await schema.save({ useMasterKey: true })
    return true
  } catch (error) {
    console.error(`Erreur lors de la création de la classe ${className}:`, error)
    return false
  }
}

// Exécuter l'initialisation
initializeData()
  .then(() => {
    console.log("Script d'initialisation terminé")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Erreur lors de l'exécution du script:", error)
    process.exit(1)
  })
