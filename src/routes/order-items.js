// routes/order-items.js
const express = require('express');
const { addItemsToOrder, getItemsByOrder } = require('../models/order-items');
const router = express.Router();

// Route POST : Ajouter des items à une commande
router.post('/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { items } = req.body;

    addItemsToOrder(orderId, items, (err, response) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(response);
    });
});

// Route GET : Obtenir les items d'une commande
router.get('/:orderId', (req, res) => {
    const { orderId } = req.params;

    getItemsByOrder(orderId, (err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(items);
    });
});

module.exports = router;
