const passport = require('passport')
const {User} = require('./models')
const { config } = require('./config/config')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret0rKey: config.authentication.jwtSecret
  })
)

module.exports = null