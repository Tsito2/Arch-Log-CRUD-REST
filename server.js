const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ordersRoutes = require('./src/routes/orders');
const simulationsRoutes = require('./src/routes/simulations');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/orders', ordersRoutes);
app.use('/api/simulations', simulationsRoutes);

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
