'use strict'

const cors = require('cors')

// create express instance
const express = require('express')
const app = express()


// package library imports
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


// import configs
const config = require('./config/localServer')

// const DATA = require('./data/database.json')
let users = [
  {
    id: 1,
    name: "Samuel",
    email: "test@test.test",
    password: "password"
  },
  {
    id: 2,
    name: "Jackson",
    email: "admin@admin.admin",
    password: "password"
  }
];

// Bind libraries to the express instance
app.use(cors())
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'chatsession',
  keys: ['keyfromvuefront'],
  maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expires in 7 days
}));



// Authentication
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      }
      else {
        done(null, false, { message: 'Wrong username or password'})
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  let user = users.find(user => {
    return user.id === id
  });

  done(null, user)
})


// Auth middleware
const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('Unauthenticated')
  }
  else {
    return next()
  }
}

// API
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

app.get("/api/logout", (req, res) => {
  req.logout();

  console.log("Successfully logged out")

  return res.send()
});

app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({ user: user })
});


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
