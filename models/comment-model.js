const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// création de la table pour les commentaires
const Comment = sequelize.define ('Comment',{
    message : {
        type: Sequelize.STRING,
        allowNull: false,
    }
});



module.exports = Comment;