const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../models/order');
const router = express.Router();

// Créer une commande
router.post('/', (req, res) => {
    console.log(req.body);  // Ajoute ceci pour déboguer et voir ce qui est envoyé dans le corps de la requête
    const { customerName, items, status } = req.body;

    // Vérification des données envoyées
    if (!customerName || !items || !status) {
        return res.status(400).json({ error: "Tous les champs (customerName, items, status) sont requis." });
    }

    createOrder({ customerName, items, status }, (error, order) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(201).json(order);
    });
});

// Obtenir toutes les commandes
router.get('/', (req, res) => {
    getOrders((error, orders) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(orders);
    });
});

// Mettre à jour une commande
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { customerName, items, status } = req.body;

    // Vérification des données envoyées
    if (!customerName || !items || !status) {
        return res.status(400).json({ error: "Tous les champs (customerName, items, status) sont requis." });
    }

    updateOrder(id, { customerName, items, status }, (error, updatedOrder) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(updatedOrder);
    });
});

// Supprimer une commande
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteOrder(id, (error, response) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(response);
    });
});

module.exports = router;
