import connectDB from '../backend/config/db.js';
import User from '../backend/models/User.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;

  // Get all users (admin only)
  if (method === 'GET' && url.endsWith('/users')) {
    // TODO: Add authentication/authorization logic
    try {
      const users = await User.find({}, '-password');
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
  }

  // Update user role (admin only)
  if (method === 'PATCH' && url.match(/\/users\/.+\/role/)) {
    // TODO: Add authentication/authorization logic
    try {
      const id = url.split('/users/')[1].split('/role')[0];
      const { role } = req.body;
      if (!['admin', 'staff', 'customer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, select: '-password' }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user role' });
    }
  }

  // Delete user (admin only)
  if (method === 'DELETE' && url.match(/\/users\/.+/)) {
    // TODO: Add authentication/authorization logic
    try {
      const id = url.split('/users/')[1];
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ message: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting user' });
    }
  }

  res.status(404).json({ message: 'Not found' });
} 