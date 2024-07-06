// routes/courseRoutes.js
const express = require('express');
const courseController = require('../newcontrollers/courseController');
const { auth, isTeacher } = require('../newmiddlewares/authMiddleware');

const router = express.Router();

router.get('/courses', auth, courseController.getCourses);
router.get('/courses/:id', auth, courseController.getCourseById);
router.post('/courses', auth, isTeacher, courseController.createCourse);
router.put('/courses/:id', auth, isTeacher, courseController.updateCourse);
router.delete('/courses/:id', auth, isTeacher, courseController.deleteCourse);

router.post('/courses/enroll', auth,courseController.enrollStudent);
module.exports = router;
