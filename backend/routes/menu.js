import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { isAuthenticated, hasRole } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Upload photo
router.post('/upload', isAuthenticated, hasRole(['admin']), upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ photoUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Create menu item (admin only)
router.post('/', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const menuItem = await MenuItem.create({
      ...req.body,
      stock: parseInt(req.body.stock) || 0
    });
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item' });
  }
});

// Update menu item (admin only)
router.put('/:id', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body, stock: parseInt(req.body.stock) || 0 },
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

// Update stock (admin only)
router.patch('/:id/stock', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const stock = parseInt(req.body.stock);
    if (stock < 0) {
      return res.status(400).json({ message: 'Stock cannot be negative' });
    }

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock' });
  }
});

// Delete menu item (admin only)
router.delete('/:id', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

export default router; 