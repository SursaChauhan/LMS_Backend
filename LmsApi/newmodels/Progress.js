// models/Progress.js
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
     courseStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }

});

module.exports = mongoose.model('Progress', ProgressSchema);
