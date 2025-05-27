import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ username, password });
    res.status(201).json({
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const username = req.headers.username;
    if (!username) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

export default router; 