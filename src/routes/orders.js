const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../models/order');
const { addItemsToOrder } = require('../models/order-items'); // Importation du modèle pour ajouter des items
const router = express.Router();

// Route POST : Créer une commande
router.post('/', (req, res) => {
    console.log(req.body); // Débogage : affiche le corps de la requête pour vérifier les données reçues
    const { customerName, items, status } = req.body;

    createOrder({ customerName, items, status }, (err, order) => {
        if (err) return res.status(500).json({ error: err.message });

        // Si des items sont présents, on les ajoute à la commande
        if (items && items.length > 0) {
            addItemsToOrder(order.id, items, (err, response) => {
                if (err) return res.status(500).json({ error: err.message });
                // Retourne la commande avec les items ajoutés
                res.status(201).json({
                    message: 'Commande créée avec succès et items ajoutés.',
                    order,
                    items: response
                });
            });
        } else {
            // Si aucun item n'est passé, on renvoie simplement la commande
            res.status(201).json(order);
        }
    });
});

// Route GET : Obtenir toutes les commandes
router.get('/', (req, res) => {
    getOrders((err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(orders);
    });
});

// Route PUT : Mettre à jour une commande
router.put('/:id', (req, res) => {
    console.log(req.body); // Débogage : affiche le corps de la requête pour vérifier les données reçues
    const { id } = req.params;
    const { customerName, items, status } = req.body;

    updateOrder(id, { customerName, items, status }, (err, updatedOrder) => {
        if (err) return res.status(500).json({ error: err.message });

        // Si des items sont présents et qu'on veut les mettre à jour
        if (items && items.length > 0) {
            addItemsToOrder(updatedOrder.id, items, (err, response) => {
                if (err) return res.status(500).json({ error: err.message });
                // Retourne la commande mise à jour avec les items
                res.status(200).json({
                    message: 'Commande mise à jour avec succès et items ajoutés.',
                    order: updatedOrder,
                    items: response
                });
            });
        } else {
            // Si aucun item n'est passé, on renvoie simplement la commande mise à jour
            res.status(200).json(updatedOrder);
        }
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
