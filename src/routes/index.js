const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isNotLoggedIn} = require('../lib/auth');
router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('index');
});

router.post('/signin',isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/controlenvases',
    failureRedirect: '/',
    failureFlash: true
  }));
module.exports = router;