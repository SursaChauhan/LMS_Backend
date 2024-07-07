// models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String ,required: true},
    file: { type: String ,required:true},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
