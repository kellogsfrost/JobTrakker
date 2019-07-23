const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.json({type: 'success', message: 'You accessed the protected api routes'});
});







//POST - create a job--working
// TODO: add express-jwt middleware to require the token
router.post('/', (req, res) => {
   // TODO: Use the user id in req.user._id to look up
   //  the user.
   User.findById(req.user._id)
   console.log(user._id)
   Job.create({
      location: req.body.location,
      company: req.body.company,
      position: req.body.position,
      phone: req.body.phone,
      email: req.body.email
   }, function (err, job) {
      //user.jobs.push
      //user.save
      res.json(job)
   })
})

module.exports = router;