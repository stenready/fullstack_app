const { Strategy, ExtractJwt }=require('passport-jwt')
const User=require('../models/User')
const config = require('../config')

const options={ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.secret_key  }


const authoken=(passport) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user=await User.findById(payload.userId)
      if (!user) {
        done(null, false)
      }
      done(null, user)
    } catch (error) {
      console.log("Вы не в системе" + error)
    }
  }))
}

module.exports=authoken