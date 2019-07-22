const mongoose = require('mongoose');


const interviewSchema = new mongoose.Schema({
   interviewer: {
      type: String,
   },
   date: {
      type: Date,
   },
   time: {
      type: String,
   },
   notes: {
      type: String,
   }
});

var Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;