const db = require('./postgres');

const getUsers = (request, response) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
  })
}

const createUser = (request, response) => {
  // inject middleware
  const { name, password } = request.body
}

module.exports = {
  getUsers
}
