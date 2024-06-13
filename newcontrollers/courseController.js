// controllers/courseController.js
const Course =require('../newmodels/Course')

exports.getCourses = async (req, res) => {
    const courses = await Course.find().populate('teacher', 'username');
    res.status(200).json(courses);
};

exports.getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('teacher', 'username');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
};

exports.createCourse = async (req, res) => {
    const { title, description } = req.body;
    const course = new Course({ title, description, teacher: req.user.userId });
    await course.save();
    res.status(201).json(course);
};

exports.updateCourse = async (req, res) => {
    const { title, description } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
};

exports.deleteCourse = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
};
