const db = require('../config/db');  // Assume db est configuré pour se connecter à MySQL

const createOrder = ({ customerName, items, status }, callback) => {
    // Vérification des données avant l'insertion
    if (!customerName || !items || !status) {
        return callback(new Error("Tous les champs sont requis"));
    }

    const query = "INSERT INTO orders (customerName, items, status) VALUES (?, ?, ?)";
    db.query(query, [customerName, JSON.stringify(items), status], (err, results) => {
        if (err) return callback(err);
        // Retourne l'objet de la commande créé
        callback(null, { id: results.insertId, customerName, items, status });
    });
};

// Fonction pour obtenir toutes les commandes
const getOrders = (callback) => {
    const query = "SELECT * FROM orders";
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fonction pour mettre à jour une commande
const updateOrder = (id, { customerName, items, status }, callback) => {
    const query = "UPDATE orders SET customerName = ?, items = ?, status = ? WHERE id = ?";
    db.query(query, [customerName, JSON.stringify(items), status, id], (err, results) => {
        if (err) return callback(err);
        callback(null, { id, customerName, items, status });
    });
};

// Fonction pour supprimer une commande
const deleteOrder = (id, callback) => {
    const query = "DELETE FROM orders WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, { message: "Commande supprimée avec succès" });
    });
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
