const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


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


module.exports = passport;
