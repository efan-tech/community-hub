const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Submit feedback or an idea
router.post('/', async (req, res) => {
  try {
    const { name, type, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: 'Name and message are required.',
      });
    }

    const feedback = await Feedback.create({
      name,
      type,
      message,
    });

    res.status(201).json({
      message: 'Thank you for your contribution!',
      feedback,
    });
  } catch (error) {
    console.error('Error saving feedback:', error);

    res.status(500).json({
      message: 'Failed to save feedback.',
    });
  }
});

module.exports = router;