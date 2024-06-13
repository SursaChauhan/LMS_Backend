// routes/progressRoutes.js
const express = require('express');
const progressController = require('../newcontrollers/progressController');
const { auth } = require('../newmiddlewares/authMiddleware');

const router = express.Router();

router.get('/users/:id/progress', auth, progressController.getUserProgress);
router.post('/users/:id/progress', auth, progressController.updateUserProgress);

module.exports = router;
