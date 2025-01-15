const db = require('../config'); // Assure-toi que le chemin est correct ici

const createSimulation = ({ id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration }, callback) => {
    if (!id || !ordersCountMin || !ordersCountMax || !startDateTime || !endDateTime || !duration) {
        return callback(new Error("Tous les champs sont requis."));
    }

    const query = "INSERT INTO simulation (id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration], (err, result) => {
        if (err) {
            console.error("Error during simulation creation:", err);
            return callback(err);
        }
        callback(null, { id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration });
    });
};

// Fonction pour obtenir des simulations avec pagination
const getSimulationsWithPagination = (offset, limit, callback) => {
    const query = "SELECT * FROM simulation ORDER BY createdDateTime DESC LIMIT ? OFFSET ?";
    db.query(query, [limit, offset], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fonction pour mettre à jour une simulation
const updateSimulation = (id, { ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration }, callback) => {
    const query = "UPDATE simulation SET ordersCountMin = ?, ordersCountMax = ?, startDateTime = ?, endDateTime = ?, duration = ? WHERE id = ?";
    db.query(query, [ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration, id], (err, result) => {
        if (err) return callback(err);
        callback(null, { id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration });
    });
};

// Fonction pour supprimer une simulation
const deleteSimulation = (id, callback) => {
    const query = "DELETE FROM simulation WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return callback(err);
        callback(null, { message: "Simulation supprimée avec succès." });
    });
};

module.exports = {
    createSimulation,
    getSimulationsWithPagination,
    updateSimulation,
    deleteSimulation,
};
