// Ouverture du modal de connexion
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Fermeture du modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Fermer en cliquant en dehors du modal
window.onclick = function(event) {
    let modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Vérifier si l'utilisateur est déjà connecté
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    document.getElementById('accueilPage').style.display = 'none';
    document.getElementById('gestionApp').style.display = 'block';
    if (typeof loadGestionApp === 'function') {
        loadGestionApp();
    }
}

// Traitement du formulaire de connexion
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('loginRole').value;
    const email = document.getElementById('loginEmail').value;
    
    // Sauvegarde dans sessionStorage
    sessionStorage.setItem('userRole', role);
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Fermer le modal
    closeLoginModal();
    
    // Afficher l'application de gestion
    document.getElementById('accueilPage').style.display = 'none';
    document.getElementById('gestionApp').style.display = 'block';
    
    // Charger l'application
    if (typeof loadGestionApp === 'function') {
        loadGestionApp();
    }
});