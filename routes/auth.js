const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Route for signup
router.post('/signup', (req, res) => {
    // see if the email is alreadt in the db
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            //if yes return an error
            res.json({ type: 'error', message: 'Email already exists' })
        } else {
            //if no, create the user in the db
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            user.save((err, user) => {
                if (err) {
                    res.json({ type: 'error', message: 'Database error creating user', err })
                } else {
                    // sign a token (this is the login step)
                    var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        expiresIn: "1d"
                    });
                    // res.json the token (the browser needs to store the token)
                    res.status(200).json({ type: 'success', user: user.toObject(), token })
                }
            })
        }

    })
})

//Route for login
router.post('/login', (req, res) => {
    // find user in db by email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            // if there is no user, return error
            res.json({ type: 'error', message: 'Account not found' })
        } else {
            //if user, check authentication
            if (user.authenticated(req.body.password)) {
                //if authenticated, sign a token (login)
                var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });
                // return the token to be saved by the browser
                res.json({ type: 'success', user: user.toObject(), token })
            } else {
                res.json({ type: 'error', message: 'Authentication failure' })
            }
        }
    })
})

//Route for validating tokens
router.post('/me/from/token', (req, res) => {
    //make sure they sent us a token to check
    var token = req.body.token;
    if (!token) {
        // if no token, return an error
        res.json({ type: 'error', message: 'You must submit a valid token' });
    } else {
        // if a token, verify it 
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // if token invalid, return an error
                res.json({ type: 'error', message: 'Invalid token. Please login again.' });
            } else {
                // if token is valid, look up user in the db
                User.findById(user._id, (err, user) => {
                    if (err) {
                        // if user doesn't exist, return an error
                        res.json({ type: 'error', message: 'Database error furing validation' })
                    } else {
                        // if user does exist, send back user and token

                        // Right here, we could sign a new token or we could just
                        // return the existing one.

                        // var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        //     expiresIn: "1d"
                        // });
                        res.json({ type: 'success', user: user.toObject(), token })
                    }
                })

            }
        })
    }

})
//GET - all users-working
router.get('/', (req, res) => {
    // console.log("hello?");
    User.find({}, function (err, users) {
        if (err) res.json(err)
        res.json(users)
    })
})
//GET - get/show one job-working
router.get('/:uid', (req, res) => {
    User.findById({ _id: req.params.uid }, function (err, user) {
        if (err) res.json(err)
        res.json(user)
    })
})

module.exports = router;