const db = require('../config'); // Assure-toi que le chemin est correct ici

// Fonction pour créer une commande
const createOrder = ({ customerName, items, status }, callback) => {
    // Validation des champs requis
    if (!customerName || !items || !status) {
        return callback(new Error("Tous les champs (customerName, items, status) sont requis."));
    }

    // Validation que `items` est un tableau
    if (!Array.isArray(items) || items.length === 0) {
        return callback(new Error("Les items doivent être un tableau non vide."));
    }

    // Insertion de la commande dans la table "orders"
    const query = "INSERT INTO orders (customerName, status) VALUES (?, ?)";
    db.query(query, [customerName, status], (err, result) => {
        if (err) return callback(err);

        const orderId = result.insertId;

        // Préparation des items pour l'insertion dans "order_items"
        const itemsQuery = "INSERT INTO order_items (order_id, name, quantity) VALUES ?";

        // Mapping des items pour correspondre à la structure de la base de données
        const itemsData = items.map((item) => [orderId, item.name, item.quantity]);

        // Insertion des items dans la table "order_items"
        db.query(itemsQuery, [itemsData], (err) => {
            if (err) return callback(err);
            callback(null, { id: orderId, customerName, items, status });
        });
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
    if (!items || !Array.isArray(items)) {
        return callback(new Error("Les items doivent être un tableau."));
    }

    const query = "UPDATE orders SET customerName = ?, status = ? WHERE id = ?";
    db.query(query, [customerName, status, id], (err) => {
        if (err) return callback(err);

        const deleteQuery = "DELETE FROM order_items WHERE order_id = ?";
        db.query(deleteQuery, [id], (err) => {
            if (err) return callback(err);

            const insertQuery = "INSERT INTO order_items (order_id, name, quantity) VALUES ?";
            const itemsData = items.map((item) => [id, item.name, item.quantity]);

            db.query(insertQuery, [itemsData], (err) => {
                if (err) return callback(err);
                callback(null, { id, customerName, items, status });
            });
        });
    });
};

// Fonction pour supprimer une commande
const deleteOrder = (id, callback) => {
    const query = "DELETE FROM orders WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return callback(err);
        callback(null, { message: "Commande supprimée avec succès." });
    });
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
