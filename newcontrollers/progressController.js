// controllers/progressController.js
const Progress = require('../newmodels/Progress');

exports.getUserProgress = async (req, res) => {
    const progress = await Progress.find({ user: req.params.id }).populate('course', 'title');
    if (!progress) return res.status(404).json({ message: 'No progress found for this user' });
    res.status(200).json(progress);
};

exports.updateUserProgress = async (req, res) => {
    const { courseId, courseStatus } = req.body;
    const progress = await Progress.findOneAndUpdate(
        { user: req.params.id, course: courseId },
        { courseStatus },
        { new: true, upsert: true }
    );
    res.status(200).json(progress);
};
