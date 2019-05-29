// const pgp = require('pg-promise')
// // add dotenv variable
// const db = pgp('postgres://username:password@host:port/db_name')
//
//
// // db.any('SELECT * FROM users')
// //   .then((data) => {
// //     console.log('DATA: ', data.value)
// //   })
// //   .catch((err) => {
// //     console.log('Error: ', err)
// //   })

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});



module.exports = pool;
