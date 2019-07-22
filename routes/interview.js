const express = require('express');
const router = express.Router();
const Interview = require('../models/interview');

// Route for new interview
router.post('/interviews', (req, res) => {
    Interview.create({
        date: req.body.date,
        time: req.body.time,
        interviewer: req.body.interviewer,
        notes: req.body.notes
    });
    Interview.create((err, interview) =>{
        res.json(interview);
    });
});

// Route to show all interviews
router.get('/interviews', (req, res) => {
    Interview.find({}, function(err, interview){
        if (err) res.json(err)
        res.json(interview)
    })
})

router.get('/interviews/:id', (req, res) => {
    Interview.findById(req.params.id), function(err, interview){
        if (err) res.json(err)
        res.json(interview)
    }
})

app.put("/interview/:id", (req, res) => {
    Interview.findByIdAndUpdate(req.params.id, {
        date: req.body.date,
        time: req.body.time,
        interviewer: req.body.interviewer,
        notes: req.body.notes
    });
    newPizza.save((err, interview) => {
        res.json(interview)
    })
})

app.delete("/interview/delete", (req, res) => {
    Interview.findByIdAndDelete(req.params.id, function(err){
        if (err) res.json(err);
        res.json({message: "DELETED*!"})
    })
})