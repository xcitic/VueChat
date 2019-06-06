'use strict'
// core imports
require('dotenv').config()
const express = require('express')


// package library imports
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors = require('cors')

// config imports
const config = require('./config/localServer')

// local imports
const passport = require('./auth/passport')
const authMiddleware = require('./auth/middleware')
const db = require('./db/queries')
// const database = require('./db/postgres')

// create express instance
const app = express()


// Bind libraries to the express instance
app.use(cors())
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'chatsession',
  keys: ['keyfromvuefront'],
  maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expires in 7 days
}));

// express-sessions
// app.use(session({
//   secret: process.env.SECRET_KEY,
//   resave: false,
//   saveUninitialized: true,
// }));

// Authentication
app.use(passport.initialize())
app.use(passport.session())

//API
app.post("/api/login", cors(), (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if(!user) {
      return res.status(400).send([user, "failed to log in", info])
    }

    req.login(user, err => {
      res.send("Successfully logged in")
    });
  })(req, res, next);
});


app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({ user: user })
});

app.get("/api/logout", (req, res) => {
  req.logout();

  console.log("Successfully logged out")

  return res.send()
});

app.get('/api/users', db.getUsers)



// setup server instance
const PORT = config.APP_PORT || 3001 || 3002
const NODE_ENV = config.NODE_ENV || 'development'

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
