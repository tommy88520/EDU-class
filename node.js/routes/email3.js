// Chunk 1
// require('dotenv').config();
const express = require('express');
const sendMail = require('./mail');
const router = express.Router();
const db = require('./../modules/connect-mysql');



// Data parsing
// app.use(express.urlencoded({
//     extended: false
// }));
// app.use(express.json());



// email, subject, text



// Render home page
router.get('/email3', (req, res) => {
    res.locals.pageName = 'email3';
    res.render('email3');
});
router.post('/email3', (req, res) => {
    const { subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});

// Error page
router.get('/error', (req, res) => {
    res.locals.pageName = 'error';
    res.render('error');
});

// Email sent page
router.get('/sent', (req, res) => {
    res.locals.pageName = 'register';
    res.render('emailMessage');

});

module.exports = router;