require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'seu host',
  user: process.env.MYSQL_USER || 'seu user',
  password: process.env.MYSQL_PASSWORD || 'sua senha',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;