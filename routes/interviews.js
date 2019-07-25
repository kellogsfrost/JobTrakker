const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');

// POST - new interview
router.post('/', (req, res) => {
    Interview.create({
        date: req.body.date,
        time: req.body.time,
        interviewer: req.body.interviewer,
        notes: req.body.notes
    },
    function (err, interview){
        res.json(interview)
    })
});

// GET - all interviews
router.get('/api/interviews', (req, res) => {
    Interview.find({}, function(err, interview){
        if (err) res.json(err)
        res.json(interview)
    })
})

// GET - get one interview
router.get('/api/interviews/:id', (req, res) => {
    Interview.findById(req.params.id), function(err, interview){
        if (err) res.json(err)
        res.json(interview)
    }
})

// PUT - update an interview
router.put("/api/interviews/:id", (req, res) => {
    Interview.findByIdAndUpdate(req.params.id, {
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
router.delete("api/interviews/delete", (req, res) => {
    Interview.findByIdAndDelete(req.params.id, function(err){
        if (err) res.json(err);
        res.json({message: "DELETED*!"})
    })
})

module.exports = router;