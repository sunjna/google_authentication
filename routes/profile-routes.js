const router = require('express').Router();
const authCheck = (req,res,next)=>{
 if(!req.user)
 {
     res.send("Please Login Again!")
     //res.redirect('/auth/login')
 }
 else{
     next();
 }
}
router.get('/profile',authCheck,(req,res)=>{
    res.send('You are loggin in the profile page as '+ req.user.userName)
})
module.exports = router