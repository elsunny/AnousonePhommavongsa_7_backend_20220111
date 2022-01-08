const Sequelize = require("sequelize");
const dotEnv = require('dotenv');

dotEnv.config({ path:'config/.env' });

module.exports = new Sequelize(process.env.DB);
