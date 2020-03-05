const router = require('express').Router()
const passport = require('passport')

router.get('/google',passport.authenticate('google',{scope :['profile']}))

router.get('/logout',(req,res,next)=>{
    req.logOut()
    res.render('home')
})

router.get('/callback',passport.authenticate('google'),(req,res,next)=>{
    res.redirect('/profile')
    //res.send("You loggin in successfully!"+req.user)
})
module.exports = router