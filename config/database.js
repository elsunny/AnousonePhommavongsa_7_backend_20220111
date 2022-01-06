const Sequelize = require("sequelize");
const dotEnv = require('dotenv');

dotEnv.config({ path:'config/.env' });

/* tout ça je supprime plus besoin?
const sequelize = new Sequelize(
    process.env.DB_NAME,
    "root",
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);
*/

//module.exports = sequelize; 
module.exports = new Sequelize(process.env.DB);
