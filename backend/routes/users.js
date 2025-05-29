import express from 'express';
import User from '../models/User.js';
import { isAuthenticated, hasRole } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user role (admin only)
router.patch('/:id/role', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'staff', 'customer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, select: '-password' }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
});

// Delete user (admin only)
router.delete('/:id', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;
