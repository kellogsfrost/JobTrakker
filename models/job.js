const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: {
        type: String
    },
    position: {
        type: String
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    },
    interviews: [{type: mongoose.Schema.Types.ObjectId, ref:'Interview'}],

});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;