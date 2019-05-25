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
});

// setup socket.io
const socketIO = require('socket.io')(server)

socketIO.on('connection', socket => {
  console.log(socket.id)
  // when receive SEND_MESSAGE from frontend, emit MESSAGE back
  socket.on('SEND_MESSAGE', data => {
    socketIO.emit('MESSAGE', data)
  })
})
