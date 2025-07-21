import connectDB from '../backend/config/db.js';
import MenuItem from '../backend/models/MenuItem.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;

  // Get all menu items
  if (method === 'GET' && url.endsWith('/menu')) {
    try {
      const menuItems = await MenuItem.find().sort({ createdAt: -1 });
      return res.json(menuItems);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching menu items' });
    }
  }

  // Upload photo (not supported on Vercel)
  if (method === 'POST' && url.endsWith('/menu/upload')) {
    return res.status(501).json({ message: 'File uploads are not supported on Vercel serverless functions. Please use a cloud storage provider.' });
  }

  // Create menu item (admin only, auth stubbed)
  if (method === 'POST' && url.endsWith('/menu')) {
    // TODO: Add authentication/authorization logic
    try {
      const menuItem = await MenuItem.create({
        ...req.body,
        stock: parseInt(req.body.stock) || 0
      });
      return res.status(201).json(menuItem);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating menu item' });
    }
  }

  // Update menu item
  if (method === 'PUT' && url.match(/\/menu\/.+/)) {
    // TODO: Add authentication/authorization logic
    try {
      const id = url.split('/menu/')[1];
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
  }

  // Update stock
  if (method === 'PATCH' && url.match(/\/menu\/.+\/stock/)) {
    // TODO: Add authentication/authorization logic
    try {
      const id = url.split('/menu/')[1].split('/stock')[0];
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
  }

  // Delete menu item
  if (method === 'DELETE' && url.match(/\/menu\/.+/)) {
    // TODO: Add authentication/authorization logic
    try {
      const id = url.split('/menu/')[1];
      const menuItem = await MenuItem.findByIdAndDelete(id);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      return res.json({ message: 'Menu item deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting menu item' });
    }
  }

  res.status(404).json({ message: 'Not found' });
} 