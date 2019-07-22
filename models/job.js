const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    location: {
        type: String,
        required:[true, 'You must enter a Location']
    },
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
    user: [{type: mongoose.Schema.Types.ObjectId, ref:'user'}]
});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;