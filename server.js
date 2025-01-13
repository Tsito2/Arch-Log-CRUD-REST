const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Assure-toi que le body est bien parsé en JSON

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Si tu as un mot de passe
    database: 'restaurant'  // Assure-toi d'utiliser la bonne base de données
});

// Vérifie la connexion
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route pour créer une commande
app.post('/api/orders', (req, res) => {
    const { customerName, items, status } = req.body;

    // Ajoute des logs pour vérifier les données
    console.log('Données reçues dans POST /api/orders:', req.body);

    // Vérifie si customerName est vide ou nul
    if (!customerName) {
        return res.status(400).json({ error: "Le champ 'customerName' ne peut pas être vide." });
    }

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Insère la commande dans la table orders
        const orderQuery = 'INSERT INTO orders (customerName, status) VALUES (?, ?)';
        db.query(orderQuery, [customerName, status], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({ error: err.message });
                });
            }

            const orderId = result.insertId;

            // Insère les éléments de la commande dans la table order_items
            const orderItemsQuery = 'INSERT INTO order_items (order_id, name, quantity) VALUES ?';
            const itemsData = items.map(item => [orderId, item.name, item.quantity]);

            db.query(orderItemsQuery, [itemsData], (err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.status(500).json({ error: err.message });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.status(500).json({ error: err.message });
                        });
                    }

                    res.status(201).json({ message: 'Commande créée avec succès.' });
                });
            });
        });
    });
});

// Route pour obtenir toutes les commandes
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, orders) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(orders);
    });
});

// Route pour mettre à jour une commande
app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { customerName, items, status } = req.body;

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const updateOrderQuery = 'UPDATE orders SET customerName = ?, status = ? WHERE id = ?';
        db.query(updateOrderQuery, [customerName, status, id], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({ error: err.message });
                });
            }

            const deleteItemsQuery = 'DELETE FROM order_items WHERE order_id = ?';
            db.query(deleteItemsQuery, [id], (err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.status(500).json({ error: err.message });
                    });
                }

                const orderItemsQuery = 'INSERT INTO order_items (order_id, name, quantity) VALUES ?';
                const itemsData = items.map(item => [id, item.name, item.quantity]);

                db.query(orderItemsQuery, [itemsData], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.status(500).json({ error: err.message });
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                return res.status(500).json({ error: err.message });
                            });
                        }

                        res.status(200).json({ message: 'Commande mise à jour avec succès.' });
                    });
                });
            });
        });
    });
});

// Route pour supprimer une commande
app.delete('/api/orders/:id', (req, res) => {
    const { id } = req.params;

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const deleteItemsQuery = 'DELETE FROM order_items WHERE order_id = ?';
        db.query(deleteItemsQuery, [id], (err) => {
            if (err) {
                return db.rollback(() => {
                    return res.status(500).json({ error: err.message });
                });
            }

            const deleteOrderQuery = 'DELETE FROM orders WHERE id = ?';
            db.query(deleteOrderQuery, [id], (err) => {
                if (err) {
                    return db.rollback(() => {
                        return res.status(500).json({ error: err.message });
                    });
                }

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            return res.status(500).json({ error: err.message });
                        });
                    }

                    res.status(200).json({ message: 'Commande supprimée avec succès.' });
                });
            });
        });
    });
});

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
