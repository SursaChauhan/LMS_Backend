
const Course = require('../newmodels/Course')
const Enrollment = require('../newmodels/Enrollment');
const multer = require('multer');
const upload = require('../multer');
const uploadOnCloudinary = require('../cloudinary');


exports.getCourses = async (req, res) => {

    const page = parseInt(req.query.page) || 1; //current page
    const limit = parseInt(req.query.limit) || 2;//number of items per page
    try {
        const skip = (page - 1) * limit;
        const courses = await Course.find().populate('teacher', 'email').skip(skip).limit(limit);

        const totalCourses = await Course.countDocuments();
        const totalPages = Math.ceil(totalCourses / limit)
        res.status(200).json({
            courses,
            page,
            totalPages
        }
        );
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('teacher', 'username');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
};



exports.createCourse = async (req, res) => {
    const filePath = req.file.path
    console.log("from 39", typeof filePath);
    const cloudinaryResult = await uploadOnCloudinary(filePath);

    if (!cloudinaryResult) {
        return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
    }

    console.log(typeof cloudinaryResult.secure_url, cloudinaryResult.secure_url)
    const { title, description } = req.body;
    const ImageURl = cloudinaryResult.secure_url;
    // console.log(req.user);
    // console.log(req.file.path);

    const course = new Course({ title, description, ImageURl, teacher: req.user.userId });
    await course.save();
    res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.params.id, req.body)
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