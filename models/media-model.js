const Sequelize = require('sequelize');
const sequelize = require('../config/database');


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

