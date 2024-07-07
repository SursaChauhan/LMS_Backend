
const Course =require('../newmodels/Course')
const Enrollment = require('../newmodels/Enrollment');
const multer = require('multer');
const upload = require('../multer');

exports.getCourses = async (req, res) => {

const page = parseInt(req.query.page) //current page
const limit = parseInt(req.query.limit) //number of items per page
try{
    const skip = (page-1) * limit ;
    const courses = await Course.find().populate('teacher', 'email').skip(skip).limit(limit);

    const totalCourses = await Course.countDocuments();
    const totalPages = Math.ceil(totalCourses / limit)
    res.status(200).json({courses,
        page,
        totalPages}
    );
}catch(error){
    console.error(err);
        res.status(500).json({ message: "Server error" });
}
  

};

exports.getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('teacher', 'username');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
};


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads'); // Destination folder for file uploads
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//     }
//   });
  
//   const upload = multer({ storage });

exports.createCourse = async (req, res) => {

    const { title, description } = req.body;
    console.log(req.body.file,"creating course")
    console.log(req.user);
    console.log(req.file);
    // const course = new Course({ title, description, teacher: req.user.userId });
    // await course.save();
    // res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.params.id,req.body)
    const course = await Course.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
};

exports.deleteCourse = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
};


//enroll students 
exports.enrollStudent = async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
      const newEnrollment = new Enrollment({ student: studentId, course: courseId });
      await newEnrollment.save();
      res.status(201).json(newEnrollment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to enroll student' });
    }
  };