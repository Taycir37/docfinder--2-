// Tester si nous sommes en mode prévisualisation
(function() {
    const isPreviewMode = () => {
      return (
        window.location.hostname.includes("vusercontent") ||
        window.location.hostname === "localhost" ||
        window.location.hostname.includes("vercel.app")
      );
    };
    
    console.log("Mode prévisualisation:", isPreviewMode() ? "Activé" : "Désactivé");
  })();
  
  // Tester le login
  (async function() {
    try {
      // Fonction de login simplifiée pour le test
      const login = (username: string, password: string) => {
        console.log(`Tentative de connexion avec ${username}/${password}`);
        if (username === 'demo' && password === 'password123') {
          return Promise.resolve({ 
            id: 'demo-id', 
            username: 'demo', 
            email: 'demo@example.com',
            getUsername: () => 'demo',
            getEmail: () => 'demo@example.com'
          });
        }
        return Promise.reject(new Error("Nom d'utilisateur ou mot de passe incorrect"));
      };
      
      console.log("Tentative de connexion...");
      const user = await login("demo", "password123");
      console.log("Connexion réussie:", user);
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  })();