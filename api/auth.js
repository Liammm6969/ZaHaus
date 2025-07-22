import connectDB from '../backend/config/db.js';
import User from '../backend/models/User.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;
  if (method === 'POST' && url.endsWith('/signup')) {
    try {
      const { username, password } = req.body;
      if (await User.findOne({ username })) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const user = await User.create({ username, password });
      return res.status(201).json({
        user: {
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    }
  }
  if (method === 'POST' && url.endsWith('/login')) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.json({
        user: {
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error during login' });
    }
  }
  if (method === 'GET' && url.endsWith('/me')) {
    try {
      const username = req.headers.username;
      if (!username) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({
        user: {
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user' });
    }
  }
  res.status(404).json({ message: 'Not found' });
} 