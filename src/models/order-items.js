// order-items.js
const db = require('../config'); // Assurez-vous que le chemin vers le fichier config est correct

// Fonction pour ajouter des items dans la commande
const addItemsToOrder = (orderId, items, callback) => {
    if (!items || !Array.isArray(items)) {
        return callback(new Error("Les items doivent être un tableau."));
    }

    const query = "INSERT INTO order_items (order_id, name, quantity) VALUES ?";
    const itemsData = items.map(item => [orderId, item.name, item.quantity]);

    db.query(query, [itemsData], (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Items ajoutés à la commande avec succès' });
    });
};

// Fonction pour obtenir tous les items d'une commande
const getItemsByOrder = (orderId, callback) => {
    const query = "SELECT * FROM order_items WHERE order_id = ?";
    db.query(query, [orderId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = { addItemsToOrder, getItemsByOrder };
