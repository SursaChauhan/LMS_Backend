// routes/courseRoutes.js
const express = require('express');
const courseController = require('../newcontrollers/courseController');
const { auth, isTeacher } = require('../newmiddlewares/authMiddleware');
const upload = require('../multer')

const router = express.Router();
router.get('/enroll', auth,courseController.getEnrolledCourses);
router.post('/enroll/:id',auth,courseController.enrollStudent);
router.get('/ownCourses',auth,courseController.OwnCourses);
router.get('/coursecount',auth,courseController.EnrolledCoursesByCourse)
router.get('/courses', auth, courseController.getCourses);
router.post('/courses', auth, isTeacher,upload.single('file'), courseController.createCourse);
// router.get('/courses/:id', auth, courseController.getCourseById);
router.patch('/courses/:id', auth, isTeacher, courseController.updateCourse);
router.delete('/courses/:id', auth, isTeacher, courseController.deleteCourse);



module.exports = router;
