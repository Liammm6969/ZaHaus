import connectDB from '../backend/config/db.js';
import User from '../backend/models/User.js';
import { isAuthenticated, hasRole } from '../backend/middleware/auth.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;
  // GET all users (admin only)
  if (method === 'GET' && url.endsWith('/api/users')) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const users = await User.find({}, '-password');
          return res.json(users);
        } catch (error) {
          return res.status(500).json({ message: 'Error fetching users' });
        }
      });
    });
    return;
  }
  // PATCH update user role (admin only)
  if (method === 'PATCH' && url.match(/\/api\/users\/[\w-]+\/role$/)) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const id = url.split('/')[3];
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
      });
    });
    return;
  }
  // DELETE user (admin only)
  if (method === 'DELETE' && url.match(/\/api\/users\/[\w-]+$/)) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const id = url.split('/').pop();
          const user = await User.findByIdAndDelete(id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          return res.json({ message: 'User deleted' });
        } catch (error) {
          return res.status(500).json({ message: 'Error deleting user' });
        }
      });
    });
    return;
  }
  res.status(404).json({ message: 'Not found' });
} 