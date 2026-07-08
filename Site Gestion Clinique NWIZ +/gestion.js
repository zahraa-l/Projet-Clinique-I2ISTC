// Données simulées
let patients = [
    {id: 1, nom: "Martin Sophie", cin: "AB123", tel: "0612345678", ville: "Marrakech", sang: "A+", statut: "actif"},
    {id: 2, nom: "Benali Karim", cin: "CD456", tel: "0678912345", ville: "Casablanca", sang: "O-", statut: "urgent"},
    {id: 3, nom: "El Fassi Leila", cin: "EF789", tel: "0654321098", ville: "Rabat", sang: "B+", statut: "actif"}
];

let medecins = [
    {id: 1, nom: "Dr. Khadija Ouazzani", specialite: "Cardiologue", disponibilite: "Disponible"},
    {id: 2, nom: "Dr. Youssef Benali", specialite: "Pédiatre", disponibilite: "En consultation"},
    {id: 3, nom: "Dr. Amina Tazi", specialite: "Dermatologue", disponibilite: "Disponible"},
    {id: 4, nom: "Dr. Mehdi Alaoui", specialite: "Orthopédiste", disponibilite: "Congé"}
];

let rdvs = [
    {id: 1, patient: "Sophie Martin", medecin: "Dr. Khadija Ouazzani", date: "2026-05-10", heure: "10:00", statut: "confirmé"},
    {id: 2, patient: "Karim Benali", medecin: "Dr. Youssef Benali", date: "2026-05-12", heure: "14:30", statut: "attente"}
];

let consultations = [
    {id: 1, patient: "Sophie Martin", medecin: "Dr. Khadija Ouazzani", date: "2026-05-01", diagnostic: "Hypertension artérielle", traitement: "Repos + médicaments"}
];

let factures = [
    {id: 1, patient: "Sophie Martin", montant: 800, statut: "payée", date: "2026-05-01"},
    {id: 2, patient: "Karim Benali", montant: 500, statut: "en attente", date: "2026-05-05"}
];

let associations = [
    {id: 1, nom: "Croissant Rouge Marocain", responsable: "Ali Benjelloun", nbPatients: 15, statut: "Active"},
    {id: 2, nom: "Solidarité Santé", responsable: "Fatima Zahra", nbPatients: 8, statut: "Active"}
];

let patientsSM = [
    {id: 1, patient: "Karim Benali", association: "Croissant Rouge Marocain", taux: "80%", montantRestant: 100}
];

let currentRole = sessionStorage.getItem('userRole') || 'admin';
let currentUser = currentRole === 'admin' ? 'Administrateur' : (currentRole === 'medecin' ? 'Dr. Mohamed Benali' : 'Secrétaire Leila');

// Charger l'application dans l'iframe
function loadGestionApp() {
    const iframe = document.getElementById('gestionApp');
    const iframeDoc = iframe.contentWindow.document;
    
    iframeDoc.open();
    iframeDoc.write(getGestionHTML());
    iframeDoc.close();
}

// Générer le HTML de l'application de gestion
function getGestionHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gestion Clinique</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f9;
        }
        
        .app-container {
            display: flex;
            min-height: 100vh;
        }
        
        /* Sidebar */
        .sidebar {
            width: 280px;
            background: #1a2035;
            color: white;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-header {
            padding: 25px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }
        
        .sidebar-header h3 {
            font-size: 22px;
            margin-bottom: 5px;
        }
        
        .sidebar-header small {
            color: #00b894;
        }
        
        .nav-menu {
            list-style: none;
            padding: 20px 0;
        }
        
        .nav-item {
            padding: 14px 25px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .nav-item:hover {
            background: #1a73e8;
        }
        
        .nav-item.active {
            background: #1a73e8;
            border-left: 4px solid #00b894;
        }
        
        .logout-item {
            margin-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #e74c3c;
        }
        
        .logout-item:hover {
            background: #e74c3c;
            color: white;
        }
        
        /* Main Content */
        .main-content {
            flex: 1;
            margin-left: 280px;
            padding: 20px 30px;
        }
        
        .top-header {
            background: white;
            padding: 15px 25px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .page-title {
            font-size: 24px;
            font-weight: 600;
            color: #1a2035;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .user-avatar {
            width: 45px;
            height: 45px;
            background: #1a73e8;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        
        /* Cards */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-3px);
        }
        
        .stat-card h3 {
            font-size: 14px;
            color: #7f8c8d;
            margin: 10px 0 5px;
        }
        
        .stat-card p {
            font-size: 28px;
            font-weight: bold;
            color: #1a2035;
        }
        
        /* Tables */
        .table-container {
            background: white;
            border-radius: 16px;
            padding: 20px;
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background: #1a73e8;
            color: white;
            padding: 12px;
            text-align: left;
        }
        
        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        
        tbody tr:hover {
            background: #f0f7ff;
        }
        
        /* Badges */
        .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .badge-actif { background: #dcfce7; color: #16a34a; }
        .badge-urgent { background: #fee2e2; color: #e74c3c; }
        .badge-attente { background: #fef9c3; color: #ca8a04; }
        .badge-payee { background: #dcfce7; color: #16a34a; }
        
        /* Buttons */
        button, .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: 0.2s;
        }
        
        .btn-primary { background: #1a73e8; color: white; }
        .btn-primary:hover { background: #1557b0; }
        .btn-success { background: #00b894; color: white; }
        .btn-success:hover { background: #00997a; }
        .btn-danger { background: #e74c3c; color: white; }
        
        /* Forms */
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: #1a73e8;
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        /* Doctor Cards */
        .doctor-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .doctor-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .doctor-avatar {
            font-size: 60px;
            margin-bottom: 10px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .sidebar { width: 80px; }
            .sidebar .nav-item span { display: none; }
            .main-content { margin-left: 80px; }
            .stats-grid { grid-template-columns: 1fr; }
            .form-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
<div class="app-container">
    <div class="sidebar">
        <div class="sidebar-header">
            <h3>🏥 Clinique+</h3>
            <small>Gestion Totale</small>
        </div>
        <ul class="nav-menu">
            <li class="nav-item" data-page="dashboard">📊 <span>Dashboard</span></li>
            <li class="nav-item" data-page="patients">👥 <span>Patients</span></li>
            <li class="nav-item" data-page="addPatient">➕ <span>Ajouter Patient</span></li>
            <li class="nav-item" data-page="medecins">👨‍⚕️ <span>Médecins</span></li>
            <li class="nav-item" data-page="rdv">📅 <span>Rendez-vous</span></li>
            <li class="nav-item" data-page="addRdv">📆 <span>Ajouter RDV</span></li>
            <li class="nav-item" data-page="consultations">🩺 <span>Consultations</span></li>
            <li class="nav-item" data-page="facturation">💰 <span>Facturation</span></li>
            <li class="nav-item" data-page="associations">🤝 <span>Associations</span></li>
            <li class="nav-item" data-page="patientsSM">❤️ <span>Patients S.M.</span></li>
            <li class="nav-item" data-page="profil">👤 <span>Profil</span></li>
            <li class="nav-item logout-item" id="logoutBtn">🚪 <span>Déconnexion</span></li>
        </ul>
    </div>
    <div class="main-content">
        <div class="top-header">
            <h2 class="page-title" id="pageTitle">Dashboard</h2>
            <div class="user-info">
                <span id="userName">${currentUser}</span>
                <div class="user-avatar">👤</div>
            </div>
        </div>
        <div id="content"></div>
    </div>
</div>

<script>
    // Données
    let patients = ${JSON.stringify(patients)};
    let medecins = ${JSON.stringify(medecins)};
    let rdvs = ${JSON.stringify(rdvs)};
    let consultations = ${JSON.stringify(consultations)};
    let factures = ${JSON.stringify(factures)};
    let associations = ${JSON.stringify(associations)};
    let patientsSM = ${JSON.stringify(patientsSM)};
    let currentRole = "${currentRole}";
    
    // Navigation
    function showPage(page) {
        let html = '';
        
        switch(page) {
            case 'dashboard':
                const totalPatients = patients.length;
                const totalMedecins = medecins.length;
                const totalRdvs = rdvs.length;
                const caTotal = factures.filter(f => f.statut === 'payée').reduce((a,b) => a + b.montant, 0);
                
                html = \`
                    <div class="stats-grid">
                        <div class="stat-card">📊<h3>Patients</h3><p>\${totalPatients}</p></div>
                        <div class="stat-card">👨‍⚕️<h3>Médecins</h3><p>\${totalMedecins}</p></div>
                        <div class="stat-card">📅<h3>Rendez-vous</h3><p>\${totalRdvs}</p></div>
                        <div class="stat-card">💰<h3>CA Total</h3><p>\${caTotal} DH </p></div>
                    </div>
                    <div class="table-container">
                        <h3>📋 Derniers Rendez-vous</h3>
                        <table>
                            <thead><tr><th>Patient</th><th>Médecin</th><th>Date</th><th>Heure</th><th>Statut</th></tr></thead>
                            <tbody>
                                \${rdvs.map(r => '<tr><td>' + r.patient + '</td><td>' + r.medecin + '</td><td>' + r.date + '</td><td>' + r.heure + '</td><td><span class=\"badge ' + (r.statut === 'confirmé' ? 'badge-actif' : 'badge-attente') + '\">' + r.statut + '</span></td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'patients':
                html = \`
                    <div class="table-container">
                        <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                            <h3>📋 Liste des Patients</h3>
                            <button class="btn-primary" onclick="showPage('addPatient')">➕ Nouveau Patient</button>
                        </div>
                        <table>
                            <thead><tr><th>Nom</th><th>CIN</th><th>Téléphone</th><th>Ville</th><th>Groupe</th><th>Statut</th><th>Actions</th></tr></thead>
                            <tbody>
                                \${patients.map(p => '<tr><td>' + p.nom + '</td><td>' + p.cin + '</td><td>' + p.tel + '</td><td>' + p.ville + '</td><td>' + p.sang + '</td><td><span class=\"badge ' + (p.statut === 'actif' ? 'badge-actif' : 'badge-urgent') + '\">' + p.statut + '</span></td><td><button class=\"btn-primary\" style=\"padding:5px 10px;font-size:12px;\">Modifier</button> <button class=\"btn-danger\" style=\"padding:5px 10px;font-size:12px;\">Supprimer</button></td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'addPatient':
                html = \`
                    <div class="table-container">
                        <h3>➕ Nouveau Patient</h3>
                        <form id="patientForm">
                            <div class="form-grid">
                                <div class="form-group"><label>Nom complet</label><input id="nom" required></div>
                                <div class="form-group"><label>CIN</label><input id="cin"></div>
                                <div class="form-group"><label>Téléphone</label><input id="tel"></div>
                                <div class="form-group"><label>Ville</label><input id="ville"></div>
                                <div class="form-group"><label>Groupe sanguin</label><select id="sang"><option>A+</option><option>A-</option><option>B+</option><option>O+</option></select></div>
                            </div>
                            <div style="text-align:center; margin-top:20px;">
                                <button type="submit" class="btn-success">Enregistrer</button>
                                <button type="button" class="btn-danger" onclick="showPage('patients')">Annuler</button>
                            </div>
                        </form>
                    </div>
                \`;
                setTimeout(() => {
                    document.getElementById('patientForm')?.addEventListener('submit', (e) => {
                        e.preventDefault();
                        patients.push({
                            id: patients.length + 1,
                            nom: document.getElementById('nom').value,
                            cin: document.getElementById('cin').value || 'XXX',
                            tel: document.getElementById('tel').value,
                            ville: document.getElementById('ville').value,
                            sang: document.getElementById('sang').value,
                            statut: 'actif'
                        });
                        alert('Patient ajouté avec succès !');
                        showPage('patients');
                    });
                }, 100);
                break;
                
            case 'medecins':
                html = \`
                    <div class="doctor-grid">
                        \${medecins.map(m => \`
                            <div class="doctor-card">
                                <div class="doctor-avatar">👨‍⚕️</div>
                                <h3>\${m.nom}</h3>
                                <p style="color:#1a73e8;">\${m.specialite}</p>
                                <span class="badge \${m.disponibilite === 'Disponible' ? 'badge-actif' : (m.disponibilite === 'En consultation' ? 'badge-attente' : 'badge-urgent')}">\${m.disponibilite}</span>
                            </div>
                        \`).join('')}
                    </div>
                \`;
                break;
                
            case 'rdv':
                html = \`
                    <div class="table-container">
                        <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
                            <h3>📅 Liste des Rendez-vous</h3>
                            <button class="btn-primary" onclick="showPage('addRdv')">➕ Nouveau RDV</button>
                        </div>
                        <table>
                            <thead><tr><th>Patient</th><th>Médecin</th><th>Date</th><th>Heure</th><th>Statut</th></tr></thead>
                            <tbody>
                                \${rdvs.map(r => '<tr><td>' + r.patient + '</td><td>' + r.medecin + '</td><td>' + r.date + '</td><td>' + r.heure + '</td><td><span class=\"badge ' + (r.statut === 'confirmé' ? 'badge-actif' : 'badge-attente') + '\">' + r.statut + '</span></td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'addRdv':
                html = \`
                    <div class="table-container">
                        <h3>📆 Nouveau Rendez-vous</h3>
                        <form id="rdvForm">
                            <div class="form-group"><label>Patient</label><select id="patient">\${patients.map(p => '<option>' + p.nom + '</option>').join('')}</select></div>
                            <div class="form-group"><label>Médecin</label><select id="medecin">\${medecins.map(m => '<option>' + m.nom + '</option>').join('')}</select></div>
                            <div class="form-group"><label>Date</label><input type="date" id="date"></div>
                            <div class="form-group"><label>Heure</label><input type="time" id="heure"></div>
                            <button type="submit" class="btn-success">Planifier</button>
                        </form>
                    </div>
                \`;
                setTimeout(() => {
                    document.getElementById('rdvForm')?.addEventListener('submit', (e) => {
                        e.preventDefault();
                        rdvs.push({
                            id: rdvs.length + 1,
                            patient: document.getElementById('patient').value,
                            medecin: document.getElementById('medecin').value,
                            date: document.getElementById('date').value,
                            heure: document.getElementById('heure').value,
                            statut: 'confirmé'
                        });
                        alert('RDV ajouté avec succès !');
                        showPage('rdv');
                    });
                }, 100);
                break;
                
            case 'consultations':
                html = \`
                    <div class="table-container">
                        <h3>🩺 Historique des Consultations</h3>
                        <table>
                            <thead><tr><th>Patient</th><th>Médecin</th><th>Date</th><th>Diagnostic</th><th>Traitement</th></tr></thead>
                            <tbody>
                                \${consultations.map(c => '<tr><td>' + c.patient + '</td><td>' + c.medecin + '</td><td>' + c.date + '</td><td>' + c.diagnostic + '</td><td>' + c.traitement + '</td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'facturation':
                const payees = factures.filter(f => f.statut === 'payée').reduce((a,b) => a + b.montant, 0);
                const enAttente = factures.filter(f => f.statut === 'en attente').reduce((a,b) => a + b.montant, 0);
                html = \`
                    <div class="stats-grid">
                        <div class="stat-card">✅<h3>Payées</h3><p>\${payees} DH </p></div>
                        <div class="stat-card">⏳<h3>En attente</h3><p>\${enAttente} DH</p></div>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead><tr><th>Patient</th><th>Date</th><th>Montant</th><th>Statut</th><th>Action</th></tr></thead>
                            <tbody>
                                \${factures.map(f => '<tr><td>' + f.patient + '</td><td>' + f.date + '</td><td>' + f.montant + '€</span></td><td><span class=\"badge ' + (f.statut === 'payée' ? 'badge-actif' : 'badge-attente') + '\">' + f.statut + '</span></span></td><td><button class="btn-primary">Imprimer</button></td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'associations':
                html = \`
                    <div class="doctor-grid">
                        \${associations.map(a => \`
                            <div class="doctor-card">
                                <div class="doctor-avatar">🤝</div>
                                <h3>\${a.nom}</h3>
                                <p>Responsable: \${a.responsable}</p>
                                <p>Patients: \${a.nbPatients}</p>
                                <span class="badge badge-actif">\${a.statut}</span>
                            </div>
                        \`).join('')}
                    </div>
                \`;
                break;
                
            case 'patientsSM':
                html = \`
                    <div class="table-container">
                        <h3>❤️ Patients Sans Moyens</h3>
                        <table>
                            <thead><tr><th>Patient</th><th>Association</th><th>Taux</th><th>Montant restant</th></tr></thead>
                            <tbody>
                                \${patientsSM.map(p => '<tr><td>' + p.patient + '</td><td>' + p.association + '</td><td><span class=\"badge badge-actif\">' + p.taux + '</span></td><td>' + p.montantRestant + '€</span></td></tr>').join('')}
                            </tbody>
                        </table>
                    </div>
                \`;
                break;
                
            case 'profil':
                html = \`
                    <div class="table-container">
                        <h3>👤 Mon Profil</h3>
                        <p><strong>Nom:</strong> \${currentRole === 'admin' ? 'Administrateur' : (currentRole === 'medecin' ? 'Dr. Mohamed Benali' : 'Secrétaire Leila')}</p>
                        <p><strong>Rôle:</strong> \${currentRole === 'admin' ? 'Administrateur' : (currentRole === 'medecin' ? 'Médecin' : 'Secrétaire')}</p>
                        <p><strong>Email:</strong> \${currentRole}@cliniquesante.ma</p>
                        <hr style="margin:20px 0;">
                        <h4>🔒 Changer le mot de passe</h4>
                        <div class="form-group"><input type="password" placeholder="Ancien mot de passe"></div>
                        <div class="form-group"><input type="password" placeholder="Nouveau mot de passe"></div>
                        <button class="btn-primary">Mettre à jour</button>
                    </div>
                \`;
                break;
        }
        
        document.getElementById('content').innerHTML = html;
        document.getElementById('pageTitle').innerText = page === 'dashboard' ? 'Dashboard' : 
                                                      page === 'patients' ? 'Patients' :
                                                      page === 'addPatient' ? 'Ajouter Patient' :
                                                      page === 'medecins' ? 'Médecins' :
                                                      page === 'rdv' ? 'Rendez-vous' :
                                                      page === 'addRdv' ? 'Ajouter RDV' :
                                                      page === 'consultations' ? 'Consultations' :
                                                      page === 'facturation' ? 'Facturation' :
                                                      page === 'associations' ? 'Associations' :
                                                      page === 'patientsSM' ? 'Patients Sans Moyens' : 'Profil';
    }
    
    // Navigation events
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Déconnexion
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userRole');
        window.parent.location.reload();
    });
    
    // Restreindre l'accès selon le rôle
    if(currentRole === 'medecin') {
        const restrictedPages = ['addPatient', 'medecins', 'facturation', 'associations', 'patientsSM'];
        document.querySelectorAll('.nav-item[data-page]').forEach(item => {
            if(restrictedPages.includes(item.getAttribute('data-page'))) {
                item.style.display = 'none';
            }
        });
    } else if(currentRole === 'secretaire') {
        const restrictedPages = ['medecins', 'addPatient', 'associations', 'patientsSM'];
        document.querySelectorAll('.nav-item[data-page]').forEach(item => {
            if(restrictedPages.includes(item.getAttribute('data-page'))) {
                item.style.display = 'none';
            }
        });
    }
    
    // Page par défaut
    showPage('dashboard');
</script>
</body>
</html>
    `;
}