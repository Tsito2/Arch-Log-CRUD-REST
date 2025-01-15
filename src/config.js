const mysql = require('mysql2');
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier ..env

// Connexion MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connecte à la base de données
db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à MySQL:", err.message);
        process.exit(1); // Arrête l'application si la connexion échoue
    } else {
        console.log("Connexion à MySQL réussie !");
    }
});

module.exports = db; // Exporte la connexion
