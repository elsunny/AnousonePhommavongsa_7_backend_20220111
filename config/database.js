const Sequelize = require("sequelize");
const dotEnv = require('dotenv');

dotEnv.config({ path:'config/.env' });


const sequelize = new Sequelize(
    process.env.DB_NAME,
    "root",
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;
