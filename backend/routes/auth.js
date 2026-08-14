const express = require('express');
const router = express.Router();

// Mock Register Route
router.post('/register', (req, res) => {
  res.json({ token: 'mock-jwt-token-xyz', message: 'User registered successfully' });
});

// Mock Login Route
router.post('/login', (req, res) => {
  res.json({ token: 'mock-jwt-token-xyz', message: 'Login successful' });
});

module.exports = router;
