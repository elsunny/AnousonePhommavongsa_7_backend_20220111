const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const Comment = sequelize.define ('Comment',{
    // title : {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    message : {
        type: Sequelize.STRING,
        allowNull: false,
    }
});



module.exports = Comment;