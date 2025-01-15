const db = require('../config'); // Assure-toi que le chemin est correct ici

// Fonction pour créer une commande
const createOrder = ({ simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy }, callback) => {
    // Log des données pour vérifier la requête
    console.log("Données reçues:", { simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy });

    if (!simulationId || !name || !arrivalDateTime || !cookStartDateTime || !cookEndDateTime || !cookBy || !deliverStartDateTime || !deliverEndDateTime || !deliverBy) {
        return callback(new Error("Tous les champs sont requis."));
    }

    const query = "INSERT INTO orders (simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy], (err, result) => {
        if (err) return callback(err);
        callback(null, { id: result.insertId, simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy });
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
const updateOrder = (id, { simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy }, callback) => {
    const query = "UPDATE orders SET simulationId = ?, name = ?, arrivalDateTime = ?, cookStartDateTime = ?, cookEndDateTime = ?, cookBy = ?, deliverStartDateTime = ?, deliverEndDateTime = ?, deliverBy = ? WHERE id = ?";
    db.query(query, [simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy, id], (err, result) => {
        if (err) return callback(err);
        callback(null, { id, simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy });
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
