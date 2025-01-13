const app = require('./src/app');
const { sequelize } = require('./src/models');
const PORT = process.env.PORT || 3000;

// Synchronize Sequelize with the database
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
