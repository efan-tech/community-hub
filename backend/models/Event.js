const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['going', 'maybe', 'not-going'],
    required: true
  },
  respondedAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Arts',
      'Catholic / Faith',
      'Praise & Worship',
      'Tech & Innovation',
      'Sports',
      'Hackathons',
      'Cultural',
      'General'
    ]
  },
  location: { type: String, default: 'Campus' },
  date: { type: String, required: true },
  image: { type: String, default: '' },
  author: {
    name: { type: String, required: true },
    handle: { type: String },
    avatar: { type: String }
  },
  rsvps: [rsvpSchema],
  joinedCount: { type: Number, default: 0 },
  comments: [{
    user: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
