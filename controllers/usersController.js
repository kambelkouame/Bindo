const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
var cookieParser = require('cookie-parser')


router.get('/register', (req, res) => {
    res.render("connexion/register", {
        viewTitle: "register"
    });
});

router.get('/login', function(req, res, next) {
res.render('connexion/login', { viewTitle: 'login'})
});


router.get('/home', (req, res) => {
    res.render("home/home", {
        viewTitle: "home"
    });
});


router.post('/register', (req, res) => {
    if (req.body._id == '')
        insertUser(req, res);
});


function insertUser(req, res) {
    var user = new User();
    user.fullName = req.body.fullName;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.redirect('/home');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("home/", {
                    viewTitle: "Inserer USER",
                    employee: req.body
                });
            }
            else
                console.log('Erreur lors de la creation de l utilisateur  : ' + err);
        }
    });
}

router.post("/login", function(req, res){

  User.findOne({email: req.body.email,password: req.body.password})

   .then(user => {
      if (user) {
        const infouser = {
        _id: user._id,
        fullName: req.body.fullName,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
        }
 console.log('ii')
 res.render("home/home", {
                    viewTitle: "Inserer USER",
                    user: infouser
                });
       
     res.cookie("info", user)
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
        
});

router.get('/logout', function(req, res, next) {
  //supprimer la variable cookie user
  res.clearCookie("info")
  //retourne la vue connexion
  res.redirect("/login")
});


module.exports = router;