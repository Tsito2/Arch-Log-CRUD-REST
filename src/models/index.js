const { Sequelize } = require('sequelize');
const config = require('../config');

// Create Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

// Test connection
sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Export sequelize and models
const db = {};
db.sequelize = sequelize;
db.Order = require('./order')(sequelize);

module.exports = db;
