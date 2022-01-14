const Sequelize = require('sequelize');
const sequelize = require('../config/database');

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
    // ajout d'un fichier image pour l'avatar
    // image : {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    // },
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