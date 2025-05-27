import User from '../models/User.js';

// Check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const username = req.headers.username;
  if (!username) {
    return res.status(401).json({ message: 'Please login' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  req.user = user;
  next();
};

// Check if user has required role
export const hasRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Get user permissions
export const getUserPermissions = async (userId) => {
  try {
    const user = await User.findById(userId).populate('role');
    return user ? user.role.permissions : [];
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    throw error;
  }
}; 