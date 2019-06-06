const environment = process.env.NODE_ENV;
const config = ('../knexfile.js')[environment];
module.exports = require('knex')(config);
