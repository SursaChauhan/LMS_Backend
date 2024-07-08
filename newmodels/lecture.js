const mongoose= require('mongoose');

const LectureSchema = new mongoose.Schema({
    title: {type:String,required:true},
    video :{type :String, required: true},
    course :{type :mongoose.Schema.Types.ObjectId,ref:'Course', required:true}
})

module.exports = mongoose.model('Lecture',LectureSchema);