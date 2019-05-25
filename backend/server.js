'use strict'

// create express instance
const express = require('express')
const app = express()


// import configs
const config = require('./app/config')


// setup server instance
const PORT = config.APP_PORT || 3001 || 3002
const server = app.listen(PORT, () => {
  console.log('Server is running on localhost:' + PORT)
})
