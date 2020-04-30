const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const AddHouse = mongoose.model('AddHouse');

router.get('/', (req, res) => {
    res.render("house/addOrEdit", {
        viewTitle: "Inserer la maison"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertHouse(req, res);
    }else{
        updateHouse(req, res);
    }
    
});


function insertHouse(req, res) {
    var addHouse = new AddHouse();
    addHouse.fullName = req.body.fullName;
     addHouse.email = req.body.email;
    addHouse.description = req.body.description;
    addHouse.location = req.body.location;
    addHouse.image = req.body.image;
    addHouse.nbpiece = req.body.nbpiece;
    addHouse.nbchambre = req.body.nbchambre;
    addHouse.disponibility = req.body.disponibility;
    addHouse.component = req.body.component;
    addHouse.like = req.body.like;
    addHouse.comment = req.body.comment;
    addHouse.save((err, doc) => {
        if (!err)
            res.redirect('house/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("house/addOrEdit", {
                    viewTitle: "Inserer l'employer",
                     addHouse: req.body
                });
            }
            else
                console.log('Erreur lors de l insertion de la maison : ' + err);
        }
    });
}

function updateHouse(req, res) {
    AddHouse.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('house/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("house/addOrEdit", {
                    viewTitle: 'Modifier la maison',
                   addHouse: req.body
                });
            }
            else
                console.log('une erreur s est produite lors de la modification : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    AddHouse.find((err, docs) => {
        if (!err) {
            res.render("house/list", {
                list: docs
            });
        }
        else {
            console.log('Erreur dans l affichage de la maison:' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    AddHouse.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("house/addOrEdit", {
                viewTitle: "Update home",
                 addHouse: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    AddHouse.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/house/list');
        }
        else { console.log('Erreur lors de la suppression de la maison :' + err); }
    });
});

module.exports = router;