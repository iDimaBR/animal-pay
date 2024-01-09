const Sequelize = require('sequelize');
const database = require('../config/database');

const Payment = database.define('payments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payment_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ref_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Payment;