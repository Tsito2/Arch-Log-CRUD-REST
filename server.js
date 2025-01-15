const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./src/routes/orders');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Cette ligne permet de parser les données JSON dans les requêtes

// Routes
app.use('/api/orders', orderRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
