// routes/courseRoutes.js
const express = require('express');
const courseController = require('../newcontrollers/courseController');
const { auth, isTeacher } = require('../newmiddlewares/authMiddleware');
const upload = require('../multer')
const lectureController =require('../newcontrollers/lectureController')

const router = express.Router();

router.get('/lectures', auth, lectureController.getLectures);
// router.get('/lectures/:id', auth, lectureController.getLecturesById);
router.post('/courses/:id', auth, isTeacher,upload.single('file'), lectureController.createLecture);
// router.patch('/lectures/:id', auth, isTeacher, courseController.updateCourse);
// router.delete('/lectures/:id', auth, isTeacher, courseController.deleteCourse);

// router.post('/courses/enroll', auth,courseController.enrollStudent);
module.exports = router;
