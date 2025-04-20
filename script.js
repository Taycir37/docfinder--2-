// script.js - Script principal pour DocFinder
import { initializeParse } from "./back4app-config.js"
import { AuthService, DoctorService, ReviewService, AppointmentService } from "./services.js"

document.addEventListener("DOMContentLoaded", async () => {
  // Initialiser Parse
  await initializeParse()

  // Vérifier si l'utilisateur est connecté
  checkUserAuthentication()

  // Mobile Menu Toggle
  setupMobileMenu()

  // Formulaire de recherche
  setupSearchForm()

  // Charger les médecins recommandés sur la page d'accueil
  if (document.querySelector(".featured-doctors")) {
    await loadFeaturedDoctors()
  }

  // Charger les résultats de recherche si on est sur la page de recherche
  if (document.querySelector(".search-results")) {
    await loadSearchResults()
  }

  // Charger le profil du médecin si on est sur la page de profil
  const doctorProfileContainer = document.querySelector(".doctor-profile")
  if (doctorProfileContainer) {
    await loadDoctorProfile()
  }

  // Gérer les formulaires d'authentification
  setupAuthForms()

  // Gérer le formulaire de prise de rendez-vous
  setupBookingForm()

  // Gérer le formulaire d'ajout d'avis
  setupReviewForm()
})

// Vérifier l'authentification de l'utilisateur
function checkUserAuthentication() {
  const currentUser = AuthService.getCurrentUser()
  const authButtons = document.querySelector(".auth-buttons")

  if (currentUser && authButtons) {
    // L'utilisateur est connecté, afficher son nom et un bouton de déconnexion
    authButtons.innerHTML = `
      <div class="user-menu">
        <button class="btn btn-outline user-menu-btn">
          <i class="fas fa-user"></i> ${currentUser.firstName}
        </button>
        <div class="user-dropdown">
          <a href="profile.html">Mon profil</a>
          <a href="appointments.html">Mes rendez-vous</a>
          <a href="#" id="logoutBtn">Déconnexion</a>
        </div>
      </div>
    `

    // Ajouter l'événement de déconnexion
    document.getElementById("logoutBtn").addEventListener("click", async (e) => {
      e.preventDefault()
      const success = await AuthService.logout()
      if (success) {
        window.location.href = "index.html"
      }
    })

    // Toggle du menu utilisateur
    const userMenuBtn = document.querySelector(".user-menu-btn")
    const userDropdown = document.querySelector(".user-dropdown")

    if (userMenuBtn && userDropdown) {
      userMenuBtn.addEventListener("click", () => {
        userDropdown.classList.toggle("active")
      })

      // Fermer le menu si on clique ailleurs
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu")) {
          userDropdown.classList.remove("active")
        }
      })
    }
  }
}

// Configuration du menu mobile
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Change icon based on menu state
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }
}

// Configuration du formulaire de recherche
function setupSearchForm() {
  const searchForm = document.getElementById("searchForm")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const city = document.getElementById("citySelect").value
      const specialty = document.getElementById("specialtySelect").value

      if (city && specialty) {
        window.location.href = `search.html?city=${encodeURIComponent(city)}&specialty=${encodeURIComponent(specialty)}`
      } else {
        alert("Veuillez sélectionner une ville et une spécialité")
      }
    })
  }
}

// Charger les médecins recommandés
async function loadFeaturedDoctors() {
  try {
    const doctorsGrid = document.querySelector(".doctors-grid")
    if (!doctorsGrid) return

    // Afficher un indicateur de chargement
    doctorsGrid.innerHTML = '<div class="loading">Chargement des médecins recommandés...</div>'

    // Récupérer les médecins depuis Back4App
    const doctors = await DoctorService.getAllDoctors()

    // Limiter à 4 médecins pour la section "recommandés"
    const featuredDoctors = doctors.slice(0, 4)

    if (featuredDoctors.length === 0) {
      doctorsGrid.innerHTML = '<div class="no-results">Aucun médecin trouvé</div>'
      return
    }

    // Générer le HTML pour chaque médecin
    const doctorsHTML = featuredDoctors
      .map(
        (doctor) => `
      <div class="doctor-card">
        <div class="doctor-image">
          <img src="${doctor.imageUrl || "images/doctor-placeholder.jpg"}" alt="${doctor.name}">
        </div>
        <div class="doctor-info">
          <h3>${doctor.name}</h3>
          <p class="doctor-specialty">${doctor.specialty}</p>
          <div class="doctor-rating">
            <i class="fas fa-star"></i>
            <span>${doctor.rating.toFixed(1)}</span>
            <span class="reviews">(${doctor.reviewCount} avis)</span>
          </div>
          <div class="doctor-location">
            <i class="fas fa-map-marker-alt"></i>
            <span>${doctor.address}, ${doctor.city}</span>
          </div>
          <div class="doctor-availability">
            <i class="fas fa-clock"></i>
            <span class="badge">${doctor.availability}</span>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    doctorsGrid.innerHTML = doctorsHTML
  } catch (error) {
    console.error("Erreur lors du chargement des médecins recommandés", error)
    const doctorsGrid = document.querySelector(".doctors-grid")
    if (doctorsGrid) {
      doctorsGrid.innerHTML = '<div class="error">Une erreur est survenue lors du chargement des médecins</div>'
    }
  }
}

// Charger les résultats de recherche
async function loadSearchResults() {
  try {
    const resultsContainer = document.querySelector(".doctor-results")
    if (!resultsContainer) return

    // Afficher un indicateur de chargement
    resultsContainer.innerHTML = '<div class="loading">Chargement des résultats...</div>'

    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const city = urlParams.get("city")
    const specialty = urlParams.get("specialty")

    // Mettre à jour les sélecteurs de recherche avec les valeurs actuelles
    if (city && document.getElementById("citySelect")) {
      document.getElementById("citySelect").value = city
    }

    if (specialty && document.getElementById("specialtySelect")) {
      document.getElementById("specialtySelect").value = specialty
    }

    // Rechercher les médecins
    const doctors = await DoctorService.searchDoctors(city, specialty)

    // Mettre à jour le compteur de résultats
    const resultsCount = document.querySelector(".results-count")
    if (resultsCount) {
      resultsCount.textContent = `${doctors.length} médecins trouvés`
    }

    if (doctors.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <p>Aucun médecin ne correspond à votre recherche.</p>
          <p>Essayez de modifier vos critères de recherche.</p>
        </div>
      `
      return
    }

    // Générer le HTML pour chaque médecin
    const doctorsHTML = doctors
      .map(
        (doctor) => `
      <div class="doctor-result-card">
        <div class="doctor-result-content">
          <div class="doctor-result-image">
            <img src="${doctor.imageUrl || "images/doctor-placeholder.jpg"}" alt="${doctor.name}">
          </div>
          <div class="doctor-result-info">
            <div class="doctor-result-header">
              <div>
                <h3 class="doctor-result-name">${doctor.name}</h3>
                <p class="doctor-result-specialty">${doctor.specialty}</p>
              </div>
              <div class="doctor-result-rating">
                <i class="fas fa-star"></i>
                <span>${doctor.rating.toFixed(1)}</span>
                <span class="reviews">(${doctor.reviewCount} avis)</span>
              </div>
            </div>
            
            <div class="doctor-result-details">
              <div class="doctor-result-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${doctor.address}, ${doctor.city}</span>
              </div>
              <div class="doctor-result-detail">
                <i class="fas fa-phone"></i>
                <span>${doctor.phone}</span>
              </div>
              <div class="doctor-result-detail">
                <i class="fas fa-clock"></i>
                <span>${doctor.availability}</span>
              </div>
            </div>
            
            <div class="doctor-result-actions">
              <a href="doctor-profile.html?id=${doctor.objectId}" class="btn btn-outline">Voir le profil</a>
              <a href="booking.html?id=${doctor.objectId}" class="btn btn-primary">
                <i class="fas fa-calendar-alt"></i>
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("")

    resultsContainer.innerHTML = doctorsHTML
  } catch (error) {
    console.error("Erreur lors du chargement des résultats de recherche", error)
    const resultsContainer = document.querySelector(".doctor-results")
    if (resultsContainer) {
      resultsContainer.innerHTML = '<div class="error">Une erreur est survenue lors du chargement des résultats</div>'
    }
  }
}

// Charger le profil d'un médecin
async function loadDoctorProfile() {
  try {
    const profileContainer = document.querySelector(".doctor-profile")
    if (!profileContainer) return

    // Afficher un indicateur de chargement
    profileContainer.innerHTML = '<div class="loading">Chargement du profil...</div>'

    // Récupérer l'ID du médecin depuis l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const doctorId = urlParams.get("id")

    if (!doctorId) {
      profileContainer.innerHTML = '<div class="error">Médecin non trouvé</div>'
      return
    }

    // Récupérer les informations du médecin
    const doctor = await DoctorService.getDoctorById(doctorId)

    // Récupérer les avis du médecin
    const reviews = await ReviewService.getDoctorReviews(doctorId)

    // Générer le HTML du profil
    const profileHTML = `
      <div class="doctor-profile-header">
        <div class="doctor-profile-image">
          <img src="${doctor.imageUrl || "images/doctor-placeholder.jpg"}" alt="${doctor.name}">
        </div>
        <div class="doctor-profile-info">
          <h1>${doctor.name}</h1>
          <p class="doctor-profile-specialty">${doctor.specialty}</p>
          <div class="doctor-profile-rating">
            <i class="fas fa-star"></i>
            <span>${doctor.rating.toFixed(1)}</span>
            <span class="reviews">(${doctor.reviewCount} avis)</span>
          </div>
          <div class="doctor-profile-details">
            <div class="doctor-profile-detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>${doctor.address}, ${doctor.city}</span>
            </div>
            <div class="doctor-profile-detail">
              <i class="fas fa-phone"></i>
              <span>${doctor.phone}</span>
            </div>
            <div class="doctor-profile-detail">
              <i class="fas fa-clock"></i>
              <span>${doctor.availability}</span>
            </div>
          </div>
          <div class="doctor-profile-actions">
            <a href="booking.html?id=${doctor.objectId}" class="btn btn-primary">
              <i class="fas fa-calendar-alt"></i>
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>
      
      <div class="doctor-profile-content">
        <div class="doctor-profile-section">
          <h2>À propos</h2>
          <p>${doctor.bio || "Aucune information disponible"}</p>
        </div>
        
        <div class="doctor-profile-section">
          <h2>Formation</h2>
          ${
            doctor.education && doctor.education.length > 0
              ? `<ul class="doctor-profile-list">
                  ${doctor.education
                    .map(
                      (edu) => `
                    <li>
                      <div class="doctor-profile-list-item">
                        <div class="doctor-profile-list-item-header">
                          <h3>${edu.degree}</h3>
                          <span>${edu.year}</span>
                        </div>
                        <p>${edu.institution}</p>
                      </div>
                    </li>
                  `,
                    )
                    .join("")}
                </ul>`
              : "<p>Aucune information disponible</p>"
          }
        </div>
        
        <div class="doctor-profile-section">
          <h2>Expérience</h2>
          ${
            doctor.experience && doctor.experience.length > 0
              ? `<ul class="doctor-profile-list">
                  ${doctor.experience
                    .map(
                      (exp) => `
                    <li>
                      <div class="doctor-profile-list-item">
                        <div class="doctor-profile-list-item-header">
                          <h3>${exp.position}</h3>
                          <span>${exp.startYear} - ${exp.endYear || "Présent"}</span>
                        </div>
                        <p>${exp.institution}</p>
                        <p>${exp.description}</p>
                      </div>
                    </li>
                  `,
                    )
                    .join("")}
                </ul>`
              : "<p>Aucune information disponible</p>"
          }
        </div>
        
        <div class="doctor-profile-section">
          <h2>Avis (${reviews.length})</h2>
          ${
            reviews.length > 0
              ? `<div class="doctor-profile-reviews">
                  ${reviews
                    .map(
                      (review) => `
                    <div class="doctor-profile-review">
                      <div class="doctor-profile-review-header">
                        <div class="doctor-profile-review-author">
                          <i class="fas fa-user-circle"></i>
                          <span>${review.patient.firstName} ${review.patient.lastName.charAt(0)}.</span>
                        </div>
                        <div class="doctor-profile-review-rating">
                          ${Array(5)
                            .fill()
                            .map((_, i) => `<i class="fas fa-star${i < review.rating ? "" : "-o"}"></i>`)
                            .join("")}
                        </div>
                        <div class="doctor-profile-review-date">
                          ${new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div class="doctor-profile-review-content">
                        <p>${review.comment}</p>
                      </div>
                    </div>
                  `,
                    )
                    .join("")}
                </div>
                <div class="doctor-profile-review-form-container">
                  <h3>Laisser un avis</h3>
                  <form id="reviewForm" class="doctor-profile-review-form">
                    <input type="hidden" id="doctorId" value="${doctor.objectId}">
                    <div class="form-group">
                      <label for="rating">Note</label>
                      <div class="rating-input">
                        <i class="far fa-star" data-rating="1"></i>
                        <i class="far fa-star" data-rating="2"></i>
                        <i class="far fa-star" data-rating="3"></i>
                        <i class="far fa-star" data-rating="4"></i>
                        <i class="far fa-star" data-rating="5"></i>
                        <input type="hidden" id="rating" name="rating" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="comment">Commentaire</label>
                      <textarea id="comment" name="comment" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Soumettre</button>
                  </form>
                </div>`
              : `<p>Aucun avis pour le moment</p>
                <div class="doctor-profile-review-form-container">
                  <h3>Soyez le premier à laisser un avis</h3>
                  <form id="reviewForm" class="doctor-profile-review-form">
                    <input type="hidden" id="doctorId" value="${doctor.objectId}">
                    <div class="form-group">
                      <label for="rating">Note</label>
                      <div class="rating-input">
                        <i class="far fa-star" data-rating="1"></i>
                        <i class="far fa-star" data-rating="2"></i>
                        <i class="far fa-star" data-rating="3"></i>
                        <i class="far fa-star" data-rating="4"></i>
                        <i class="far fa-star" data-rating="5"></i>
                        <input type="hidden" id="rating" name="rating" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="comment">Commentaire</label>
                      <textarea id="comment" name="comment" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Soumettre</button>
                  </form>
                </div>`
          }
        </div>
      </div>
    `

    profileContainer.innerHTML = profileHTML

    // Initialiser le système de notation par étoiles
    setupRatingStars()
  } catch (error) {
    console.error("Erreur lors du chargement du profil du médecin", error)
    const profileContainer = document.querySelector(".doctor-profile")
    if (profileContainer) {
      profileContainer.innerHTML = '<div class="error">Une erreur est survenue lors du chargement du profil</div>'
    }
  }
}

// Configuration des formulaires d'authentification
function setupAuthForms() {
  // Formulaire d'inscription
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const firstName = document.getElementById("firstName").value
      const lastName = document.getElementById("lastName").value
      const phone = document.getElementById("phone").value

      // Vérifier que les mots de passe correspondent
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas")
        return
      }

      try {
        const user = await AuthService.signUp(username, email, password, firstName, lastName, phone)
        alert("Inscription réussie! Vous allez être redirigé vers la page d'accueil.")
        window.location.href = "index.html"
      } catch (error) {
        alert(`Erreur lors de l'inscription: ${error.message}`)
      }
    })
  }

  // Formulaire de connexion
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      try {
        const user = await AuthService.login(username, password)
        alert("Connexion réussie! Vous allez être redirigé vers la page d'accueil.")
        window.location.href = "index.html"
      } catch (error) {
        alert(`Erreur lors de la connexion: ${error.message}`)
      }
    })
  }
}

// Configuration du formulaire de prise de rendez-vous
function setupBookingForm() {
  const bookingForm = document.getElementById("bookingForm")
  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Vérifier si l'utilisateur est connecté
      const currentUser = AuthService.getCurrentUser()
      if (!currentUser) {
        alert("Vous devez être connecté pour prendre un rendez-vous")
        window.location.href = "login.html?redirect=booking.html" + window.location.search
        return
      }

      const doctorId = document.getElementById("doctorId").value
      const date = document.getElementById("appointmentDate").value
      const time = document.getElementById("appointmentTime").value
      const reason = document.getElementById("appointmentReason").value

      try {
        const appointment = await AppointmentService.createAppointment(doctorId, date, time, reason)
        alert("Rendez-vous pris avec succès! Vous allez être redirigé vers la page de confirmation.")
        window.location.href = `confirmation.html?id=${appointment.id}`
      } catch (error) {
        alert(`Erreur lors de la prise de rendez-vous: ${error.message}`)
      }
    })
  }
}

// Configuration du formulaire d'ajout d'avis
function setupReviewForm() {
  const reviewForm = document.getElementById("reviewForm")
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Vérifier si l'utilisateur est connecté
      const currentUser = AuthService.getCurrentUser()
      if (!currentUser) {
        alert("Vous devez être connecté pour laisser un avis")
        window.location.href = "login.html?redirect=" + window.location.href
        return
      }

      const doctorId = document.getElementById("doctorId").value
      const rating = document.getElementById("rating").value
      const comment = document.getElementById("comment").value

      if (!rating) {
        alert("Veuillez sélectionner une note")
        return
      }

      try {
        await ReviewService.addReview(doctorId, Number.parseInt(rating), comment)
        alert("Avis ajouté avec succès!")
        window.location.reload()
      } catch (error) {
        alert(`Erreur lors de l'ajout de l'avis: ${error.message}`)
      }
    })
  }
}

// Initialiser le système de notation par étoiles
function setupRatingStars() {
  const stars = document.querySelectorAll(".rating-input i")
  const ratingInput = document.getElementById("rating")

  if (!stars.length || !ratingInput) return

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      const rating = Number.parseInt(this.getAttribute("data-rating"))
      highlightStars(rating)
    })

    star.addEventListener("mouseout", () => {
      const currentRating = Number.parseInt(ratingInput.value) || 0
      highlightStars(currentRating)
    })

    star.addEventListener("click", function () {
      const rating = Number.parseInt(this.getAttribute("data-rating"))
      ratingInput.value = rating
      highlightStars(rating)
    })
  })

  function highlightStars(rating) {
    stars.forEach((star) => {
      const starRating = Number.parseInt(star.getAttribute("data-rating"))
      if (starRating <= rating) {
        star.classList.remove("far")
        star.classList.add("fas")
      } else {
        star.classList.remove("fas")
        star.classList.add("far")
      }
    })
  }
}

// Fonction utilitaire pour obtenir les paramètres de l'URL
function getUrlParams() {
  const params = {}
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  for (const [key, value] of urlParams.entries()) {
    params[key] = value
  }

  return params
}
