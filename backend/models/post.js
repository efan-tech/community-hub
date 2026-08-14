const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text:   { type: String, required: true },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Music & Arts', 'Praise & Worship', 'Tech & Innovation', 'Sports', 'General Ideas'] 
  },
  postType:    { type: String, enum: ['Event', 'Idea'], default: 'Idea' },
  author:      { type: String, required: true },
  comments:    [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
