const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// création de la table pour les utilisateurs
const User = sequelize.define('User', {
    pseudo : {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email : {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false,
    },
    password : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    image : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    role : {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'guest',
    }
});

module.exports = User;