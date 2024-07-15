const Course = require('../newmodels/Course');
const Enrollment = require('../newmodels/Enrollment');
const Lecture = require('../newmodels/lecture');
const uploadOnCloudinary = require('../cloudinary');
const mongoose = require('mongoose');

// Utility function for sending error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

exports.getCourses = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    try {
        const [courses, totalCourses] = await Promise.all([
            Course.find().populate('teacher', 'email').skip(skip).limit(limit),
            Course.countDocuments()
        ]);

        const totalPages = Math.ceil(totalCourses / limit);

        res.status(200).json({ courses, page, totalPages });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Server error");
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacher', 'username');
        if (!course) return sendErrorResponse(res, 404, 'Course not found');

        const lectures = await Lecture.find({ course: req.params.id });
        if (!lectures) return sendErrorResponse(res, 404, 'This course does not have lectures yet');

        res.status(200).json({ course, lectures });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, error.message);
    }
};

exports.createCourse = async (req, res) => {
    try {
        const filePath = req.file.path;
        const cloudinaryResult = await uploadOnCloudinary(filePath);

        if (!cloudinaryResult) {
            return sendErrorResponse(res, 500, 'Failed to upload file to Cloudinary');
        }

        const { title, description } = req.body;
        const ImageURl = cloudinaryResult.secure_url;

        const course = new Course({ title, description, ImageURl, teacher: req.user.userId });
        await course.save();

        res.status(201).json(course);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, error.message);
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const filePath = req.file.path
        console.log(filePath);
        console.log("hi from body",req.body)
        const cloudinaryResult = await uploadOnCloudinary(filePath);

        if (!cloudinaryResult) {
            return sendErrorResponse(res, 500, 'Failed to upload file to Cloudinary');
        }

        const { title, description } = req.body;
        const ImageURl = cloudinaryResult.secure_url;

        const course = await Course.findByIdAndUpdate(req.params.id, { title, description ,ImageURl}, { new: true });

        if (!course) return sendErrorResponse(res, 404, 'Course not found');

        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, error.message);
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return sendErrorResponse(res, 404, 'Course not found');

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, error.message);
    }
};

// Enroll students
exports.enrollStudent = async (req, res) => {
    try {
        const courseId = req.params.id;
        const studentId = req.user.userId;
//one user can enroll in each course once only
        const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (existingEnrollment) {
          return res.status(400).json({msg:"Student is already enrolled in this course"});
        }

        const newEnrollment = new Enrollment({ student: studentId, course: courseId });
        await newEnrollment.save();

        // Populate the course field
        const populatedEnrollment = await Enrollment.findById(newEnrollment._id).populate('course');

        res.status(201).json(populatedEnrollment);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Failed to enroll student');
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const studentId = req.user.userId;
        const EnrollmentCourses = await Enrollment.find({ student: studentId }).populate('course');

        res.status(200).json(EnrollmentCourses);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, 'Failed to get course');
    }
};

exports.OwnCourses = async (req, res) => {
    const userId = req.user.userId;
    try {
        // Find all courses where the teacher is the current user
        const courses = await Course.find({ teacher: userId });

        if (!courses || courses.length === 0) {
            return res.status(404).json({msg:"no course found"})
        }

        // Optionally populate additional fields like the teacher's username
        const populatedCourses = await Course.find({ teacher: userId });
        // .populate('teacher', 'username');

        res.status(200).json({ populatedCourses });
    } catch(error) {
        console.error(error);
        sendErrorResponse(res, 500, error.message);
    }
};

exports.EnrolledCoursesByCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const EnrollmentCourses = await Enrollment.find({ course: courseId }).populate('course');

        res.status(200).json(EnrollmentCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg:"Failed to get course" });
    }
};

exports.EnrolledCoursesByCourse = async (req, res) => {
    const courseId = req.query.courseId;
    console.log("courseID line 167",courseId);
    try {
 
        // Get the enrolled courses and count
        const enrolledCourses = await Enrollment.find({ course: courseId }).populate('course');
        const count = await Enrollment.countDocuments({ course: courseId });

        // Return both enrolled courses and count
        res.status(200).json({ enrolledCourses, count });
    } catch (error) {
        console.error(error);
        res.status(500).json({msg:"Failed to get enrolled courses" });
        
    }
};