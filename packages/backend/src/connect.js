
const HOST = '127.0.0.1'; 
const PORT = 3000;

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let nom = document.getElementById("nom").value.trim();
    let mdp = document.getElementById("password").value.trim();

    let nomError = document.getElementById("nomError");
    let passwordError = document.getElementById("passwordError");

    nomError.textContent = "";
    passwordError.textContent = "";

    if (!nom) {
        nomError.textContent = "Le nom est requis !";
        return;
    }

    if (!mdp) {
        passwordError.textContent = "Le mot de passe est requis !";
        return;
    }

    const IP = HOST;
    const port = PORT;
    const url = `http://${IP}:${port}/login`;

    try {
        // Envoi de la requête POST au serveur
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Spécifie que les données envoyées sont en JSON
            },
            body: JSON.stringify({ nom, mdp })  // Conversion des données en JSON
        });

        // Vérification du statut HTTP
        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        // Lecture de la réponse du serveur (qui est en JSON)
        const res = await response.json();

        if (res.code === 201) {
            console.log("Connexion réussie !");
            // Ici tu peux faire une redirection ou afficher un message de succès
            window.location.href = "/ajout.html";  // Redirection vers une autre page
        } else {
            alert(res.message);  // Affiche le message d'erreur du serveur
        }

    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});
