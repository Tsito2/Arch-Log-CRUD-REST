const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        items: {
            type: DataTypes.JSON, // Store items as JSON (e.g., [{ name: "Pizza", quantity: 2 }])
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return Order;
};
