const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new event invite
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// RSVP to an event (Going / Maybe / Can't go)
router.post('/:id/rsvp', async (req, res) => {
  try {
    const { name, status } = req.body;

    if (!name || !['going', 'maybe', 'not-going'].includes(status)) {
      return res.status(400).json({ error: 'Name and valid status are required' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Check if user already RSVP'd
    const existingIndex = event.rsvps.findIndex(r => r.name === name);

    if (existingIndex !== -1) {
      // Update existing RSVP
      event.rsvps[existingIndex].status = status;
      event.rsvps[existingIndex].respondedAt = new Date();
    } else {
      // Add new RSVP
      event.rsvps.push({ name, status });
    }

    // Recalculate how many people said "going"
    event.joinedCount = event.rsvps.filter(r => r.status === 'going').length;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
