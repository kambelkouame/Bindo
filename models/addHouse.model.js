const mongoose = require('mongoose');

var addHouseSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    city: {
        type: String
    },
    image: {
        type: String
    },
    nbpiece: {
        type: String
    },
    nbchambre: {
        type: String
    },
    disponibility: {
        type: String
    },
     component:{
        type: String
    },
    like: {
        type: String
    },
    comment: {
        type: String
    }
});

// Custom validation for email
addHouseSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('AddHouse', addHouseSchema);