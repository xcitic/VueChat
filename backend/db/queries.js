const db = require('./postgres');

const getUsers = (request, response) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.send(results)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error
    }
    res.send(results)
  })
}

const getUserByEmail = (request, email, response) => {
  db.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
    if (error) {
      throw error
    }
    return result;
  })
}

const createUser = (request, response) => {
  // INSERT MIDDLEWARE TO AVOID SQL injection
  const { name, email } = request.body
  db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User successfully created`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  db.query('UPDATE users SET name = $1, email = $2, WHERE id = $3', [name, email, id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).send(result)
  })
}


const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send('User successfully deleted')
  })
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser 
}
