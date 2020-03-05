const express = require ('express')
const authRouter = require ('./routes/auth-routes')
const profileRouter = require ('./routes/profile-routes')
const passportConfig = require('./config/passportconfig')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keysConfig = require('./keys/keys-config')
const app = express();
app.set('view engine','ejs')
app.use(cookieSession({
    keys:[keysConfig.cookieSesion.cookieKey],
    maxAge: 24*60*60*10000
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth',authRouter)
app.use('/',profileRouter)
mongoose.connect('mongodb+srv://'+keysConfig.mongoose.username+':'+keysConfig.mongoose.password+'@cluster0-saq4t.mongodb.net/test?retryWrites=true&w=majority',()=>{
    console.log("connected to mongoose")
})

app.get('/',(req,res,next)=>{
    res.render('home')
})

app.listen(3000,()=>{
    console.log("listening in port 3000")
})