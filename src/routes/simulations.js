const express = require('express');
const { createSimulation, getSimulationsWithPagination, updateSimulation, deleteSimulation } = require('../models/simulation');
const router = express.Router();

// Route POST : Créer une simulation
router.post('/', (req, res) => {
    const { id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration } = req.body;

    // Vérification des champs
    if (!id || !ordersCountMin || !ordersCountMax || !startDateTime || !endDateTime || !duration) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // Créer la simulation
    createSimulation({ id, ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration }, (err, simulation) => {
        if (err) {
            console.error("Error during simulation creation:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json(simulation);
    });
});

// Route GET : Obtenir des simulations avec pagination
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Par défaut, page 1 et 10 éléments par page
    const offset = (page - 1) * limit;

    getSimulationsWithPagination(offset, parseInt(limit), (err, simulations) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(simulations);
    });
});

// Route PUT : Mettre à jour une simulation
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration } = req.body;
    updateSimulation(id, { ordersCountMin, ordersCountMax, startDateTime, endDateTime, duration }, (err, updatedSimulation) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(updatedSimulation);
    });
});

// Route DELETE : Supprimer une simulation
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteSimulation(id, (err, response) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(response);
    });
});

module.exports = router;
