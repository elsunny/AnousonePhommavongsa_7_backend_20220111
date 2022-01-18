const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// création de la table pour les posts
const Media = sequelize.define('Media', {
    title : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    filename : {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

module.exports = Media;

