import connectDB from '../backend/config/db.js';
import MenuItem from '../backend/models/MenuItem.js';
import { isAuthenticated, hasRole } from '../backend/middleware/auth.js';
import upload from '../backend/middleware/upload.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url, query } = req;
  // GET all menu items
  if (method === 'GET' && url.endsWith('/api/menu')) {
    try {
      const menuItems = await MenuItem.find().sort({ createdAt: -1 });
      return res.json(menuItems);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching menu items' });
    }
  }
  // POST upload photo (admin only)
  if (method === 'POST' && url.endsWith('/upload')) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        upload.single('photo')(req, res, () => {
          if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }
          return res.json({ photoUrl: `/uploads/${req.file.filename}` });
        });
      });
    });
    return;
  }
  // POST create menu item (admin only)
  if (method === 'POST' && url.endsWith('/api/menu')) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const menuItem = await MenuItem.create({
            ...req.body,
            stock: parseInt(req.body.stock) || 0
          });
          return res.status(201).json(menuItem);
        } catch (error) {
          return res.status(500).json({ message: 'Error creating menu item' });
        }
      });
    });
    return;
  }
  // PUT update menu item (admin only)
  if (method === 'PUT' && url.match(/\/api\/menu\/[\w-]+$/)) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const id = url.split('/').pop();
          const menuItem = await MenuItem.findByIdAndUpdate(
            id,
            { ...req.body, stock: parseInt(req.body.stock) || 0 },
            { new: true }
          );
          if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
          }
          return res.json(menuItem);
        } catch (error) {
          return res.status(500).json({ message: 'Error updating menu item' });
        }
      });
    });
    return;
  }
  // PATCH update stock (admin only)
  if (method === 'PATCH' && url.match(/\/api\/menu\/[\w-]+\/stock$/)) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const id = url.split('/')[3];
          const stock = parseInt(req.body.stock);
          if (stock < 0) {
            return res.status(400).json({ message: 'Stock cannot be negative' });
          }
          const menuItem = await MenuItem.findByIdAndUpdate(
            id,
            { stock },
            { new: true }
          );
          if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
          }
          return res.json(menuItem);
        } catch (error) {
          return res.status(500).json({ message: 'Error updating stock' });
        }
      });
    });
    return;
  }
  // DELETE menu item (admin only)
  if (method === 'DELETE' && url.match(/\/api\/menu\/[\w-]+$/)) {
    await isAuthenticated(req, res, async () => {
      await hasRole(['admin'])(req, res, async () => {
        try {
          const id = url.split('/').pop();
          const menuItem = await MenuItem.findByIdAndDelete(id);
          if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
          }
          return res.json({ message: 'Menu item deleted' });
        } catch (error) {
          return res.status(500).json({ message: 'Error deleting menu item' });
        }
      });
    });
    return;
  }
  res.status(404).json({ message: 'Not found' });
} 