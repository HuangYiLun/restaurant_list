const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // passport localStrategy 設定
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email is not registered' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'The password is not correct' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}