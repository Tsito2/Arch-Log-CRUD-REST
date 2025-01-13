const mysql = require('mysql2');
require('dotenv').config();

const connectDB = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root', // Utilisateur MySQL (par défaut 'root' avec WAMP)
        password: '', // Mot de passe MySQL (par défaut vide avec WAMP)
        database: 'restaurant', // Nom de ta base de données
    });

    connection.connect((err) => {
        if (err) {
            console.error("MySQL connection failed:", err);
            process.exit(1);
        } else {
            console.log("MySQL connected");
        }
    });

    return connection;
};

module.exports = { connectDB };
