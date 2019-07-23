const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');

router.get('/', (req, res) => {
   res.json({ type: 'success', message: 'You accessed the protected api routes' });
});



//POST - create a job--working
// TODO: add express-jwt middleware to require the token
router.post('/', (req, res) => {
   // TODO: Use the user id in req.user._id to look up
   //  the user.
   console.log(req.user)
   User.findById(req.user._id, function (err, user) {
      Job.create({
         location: req.body.location,
         company: req.body.company,
         position: req.body.position,
         phone: req.body.phone,
         email: req.body.email
      }, function (err, job) {
         user.jobs.push(job)
         user.save(function(err, user){
            res.json(user)
         })
      })
   })
})

module.exports = router;