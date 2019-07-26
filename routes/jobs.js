const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Interview = require('../models/interview');



//GET - all jobs-working
router.get('/', (req, res) => {
   // console.log("hello?");
   Job.find({}, function(err, jobs) {
      if (err) res.json(err)
      res.json(jobs)
   })
})
//GET - get/show one job-working
router.get('/:jid', (req, res) => {
   console.log("Getting job data for", req.params.jid)
   Job.findById({id: req.params.jid}).populate('interviews').exec(function (err, job) {
      if (err) res.json(err)
      console.log(job)
      console.log(err)
      res.json(job)
   })
})
//POST - create a job--working
router.post('/', (req, res) => {
   console.log("Backend post route")
   Job.create({
      location: req.body.location,
      company: req.body.company,
      position: req.body.position,
      phone: req.body.phone,
      email: req.body.email,
   }, function (err, job) {
      res.json(job)
   })
})
//PUT /jobs/:id -- update a job
router.put('/:jid', (req, res) => {
   Job.findByIdAndUpdate(
      req.params.jid,
      {
         $set: {
            location: req.body.location,
            company: req.body.company,
            position: req.body.position,
            phone: req.body.phone,
            email: req.body.email 
         }
      },
      { new: true },
      function (err, job) {
         if (err) res.json(err)
         res.json(job)
      })
})
//GET- get all interviews associated with that job
router.get("/:jid/interviews", (req, res) => {
   Job.findById(req.params.jid).populate('interviews').exec((err, job) => {
      res.status(200).json(job.interviews);
   })
})
//GET -get one interview associated with that job
router.get("/:jid/interviews/:iid", (req, res) => {
   Interview.findById(req.params.iid, (err, interview) => {
      res.status(200).json(interview);
   })
})
//POST- add interview to job???
router.post("/:jid/interviews", (req, res) => {
   Job.findById(req.params.jid, function (err, job) {
      let newInter = new Interview({
         location: req.body.location,
         interviewer: req.body.interviewer,
         date: req.body.date,
         time: req.body.time,
         notes: req.body.notes
      })
      console.log('new interview', newInter);
      
      newInter.save(function(err) {
         console.log('interview after save', newInter)
         job.interviews.push(newInter)
         job.save(function (err) {
            //errr handling
            res.json(job)
         })
         .catch(err => {
            console.log(err)
         })
      })

      // Interview.create({
      //    interviewer: req.body.interviewer,
      //    date: req.body.date,
      //    time: req.body.time,
      //    notes: req.body.notes
      // }, function (err, interview) {
      //    job.interviews.push(interview)
      //    job.save(function (err) {
      //       //errr handling
      //       res.json(job)
      //    })
      // })
   })
})
//DELETE -delete one job
router.delete("/:jid", (req, res) => {
   Job.findByIdAndRemove(req.params.jid, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
});


module.exports = router;