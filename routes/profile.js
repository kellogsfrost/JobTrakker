const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
const Interview = require('../models/interview');

router.get('/', (req, res) => {
   res.json({ type: 'success', message: 'You accessed the protected api routes' });
});
// //GET- get all jobss associated with that user
router.get("/:id/jobs", (req, res) => {
   User.findById(req.params.id).populate('jobs').exec((err, user) => {
      console.log(user);
      res.status(200).json(user.jobs);
   })
})
// //GET- get all interviews associated with that user
router.get("/:id/interviews", (req, res) => {
   User.findById(req.params.id).populate('interviews').exec((err, user) => {
      res.status(200).json(user.interviews);
   })
})
//GET get/show user
router.get("/:id", (req, res) => {
   User.findById(req.params.id, function(err, user) {
      if(err) res.json (err)
      res.json(user)
   })
})

//PUT update user info 
router.put("/:id", (req, res) => {
   console.log("I am the put route in the back end");
   User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address
   }, (err, user) => {
      res.json(user)
   })
});


//POST - create a job--working
// TODO: add express-jwt middleware to require the token
router.post('/:id/jobs', (req, res) => {
   // TODO: Use the user id in req.user._id to look up
   //  the user.
   console.log(req.params.id)
   User.findById(req.params.id, function (err, user) {
      console.log("THIS IS THE USER:", user)
      Job.create({
         location: req.body.location,
         company: req.body.company,
         position: req.body.position,
         phone: req.body.phone,
         email: req.body.email
      }, function (err, job) {
         console.log(job)
         user.jobs.push(job)
         user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
         })
      })
   })
})
//POST - create a interview--working
router.post('/:id/interviews', (req, res) => {
   console.log(req.params.id)
   User.findById(req.params.id, function (err, user) {
      console.log("THIS IS THE USER:", user)
      Interview.create({
         location: req.body.location,
         interviewer: req.body.interviewer,
         time: req.body.time,
         date: req.body.date,
         notes: req.body.notes
      }, function (err, interview) {
         console.log(interview)
         job.interviews.push(interview)
         job.save(function(err, job){
            if (err) res.json(err)
            res.json(job)
         })
      })
   })
})

module.exports = router;