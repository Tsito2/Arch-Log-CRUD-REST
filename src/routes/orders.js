const express = require('express');
const { createOrder, getOrders, getOrdersBySimulationId, updateOrder, deleteOrder } = require('../models/order');
const router = express.Router();

// Route POST : Créer une commande
router.post('/', (req, res) => {
    const { simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy } = req.body;
    createOrder({ simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy }, (err, order) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(order);
    });
});

// Route GET : Obtenir toutes les commandes
router.get('/', (req, res) => {
    getOrders((err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(orders);
    });
});

// Route GET : Obtenir les commandes par ID de simulation
router.get('/simulation/:simulationId', (req, res) => {
    const { simulationId } = req.params;

    getOrdersBySimulationId(simulationId, (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(orders);
    });
});

// Route PUT : Mettre à jour une commande
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy } = req.body;
    updateOrder(id, { simulationId, name, arrivalDateTime, cookStartDateTime, cookEndDateTime, cookBy, deliverStartDateTime, deliverEndDateTime, deliverBy }, (err, updatedOrder) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(updatedOrder);
    });
});

// Route DELETE : Supprimer une commande
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteOrder(id, (err, response) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(response);
    });
});

module.exports = router;
