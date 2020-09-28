// const mysql = require('mysql');
// require('dotenv').config();

// const connection = mysql.createConnection({
//     host : process.env.DEV_DB_HOST,
//     user : process.env.DEV_DB_USER,
//     password: process.env.DEV_DB_PASS,
//     database : process.env.DEV_DB_NAME,
//     port: process.env.DEV_DB_PORT || process.env.PORT
// })

// connection.connect(err => {
//     let message = !err ? 'connected' : 'connection failed';
//     console.log(`mysql : ${message}`)
// })

// module.exports = connection;