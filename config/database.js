require("dotenv").config();

module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  seederStorage: "sequelize",
  port: process.env.MYSQL_PORT,
  logging: false
};


