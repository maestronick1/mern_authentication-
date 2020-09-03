require('dotenv').config()

// This is a passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using the token
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
// const { deserializeUser } = require('passport')
const User = mongoose.model('User')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) =>{
    passport.use(new JwtStrategy(options, (Jwt_payload, done) =>{
        User.findById(jwt_payload.id)
        .then(user =>{
            if(user){
                // if user is found, return null ( for error) and user
                return done(null, user)
            } else {
                // if no user is found
                return done(null, false)
            }
        })
        .catch(error => console.log(error))
    }))
}