const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');
const User = require('../models/user');

// POST - new interview
router.post('/', (req, res) => {
    Interview.create({
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        interviewer: req.body.interviewer,
        notes: req.body.notes
    },
        function (err, interview) {
            res.json(interview)
        })
});

// GET - all interviews
router.get('/', (req, res) => {
    User.findById(req.user._id).populate({
        path: 'jobs',
        populate: {
            path: 'interviews'
        }
    }).exec(function (err, user) {
        let interviews = [];
        user.jobs.forEach(job => {
            interviews = interviews.concat(job.interviews)
        })
        console.log(user, interviews);
        res.json(interviews)
    })
})

// GET - get one interview
router.get('/:id', (req, res) => {
    Interview.findById(req.params.id), function (err, interview) {
        if (err) res.json(err)
        res.json(interview)
    }
})

// PUT - update an interview
router.put("/:id", (req, res) => {
    Interview.findByIdAndUpdate(req.params.id, {
        location: req.body.location,
        date: req.body.date,
        time: req.body.time,
        interviewer: req.body.interviewer,
        notes: req.body.notes
    });
    Interview.save((err, interview) => {
        res.json(interview)
    })
})

// DELETE - delete an interview
router.delete("/:id", (req, res) => {
    Interview.findByIdAndDelete(req.params.id, function (err) {
        if (err) res.json(err);
        res.json({ message: "DELETED*!" })
    })
})

module.exports = router;