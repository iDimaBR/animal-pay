const Sequelize = require('sequelize');
const database = require('../config/database');

const Pet = database.define('pets', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    received: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Pet;