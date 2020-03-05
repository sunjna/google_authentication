const passport = require('passport')
const googleStratergy = require('passport-google-oauth20')
const User = require('../models/user-models')
const keysConfig = require('../keys/keys-config')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})
passport.use(new googleStratergy({
    //options for google start
    callbackURL: '/auth/callback',
    clientID: keysConfig.google.clientID,
    clientSecret: keysConfig.google.clientSecret
},
(accessToken, refreshToken, profile,done) =>{
    // callback for passport startergy
    console.log("passport function is fired")
    console.log(profile)
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log("user already exists!")
            done(null,currentUser)
        }
        else{
            new User({
                userName: profile.displayName,
                googleId: profile.id
            }).save().then((newUser)=>{
                console.log("new user was created!!"+newUser)
                done(newUser)
            })

        }
    })
    


}))