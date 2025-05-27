import express from 'express';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import { isAuthenticated, hasRole } from '../middleware/auth.js';

const router = express.Router();

// Create order and update stock
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    const username = req.headers.username;
    let totalAmount = 0;

    // Check stock and calculate total
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem || menuItem.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${menuItem ? menuItem.name : 'item'}` 
        });
      }
      totalAmount += menuItem.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      user: username,
      items: items.map(item => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount,
      shippingAddress
    });

    // Update stock
    await Promise.all(items.map(item => 
      MenuItem.updateOne(
        { _id: item.menuItem },
        { $inc: { stock: -item.quantity } }
      )
    ));

    res.status(201).json(await Order.findById(order._id).populate('items.menuItem'));
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get user orders
router.get('/my-orders', isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.headers.username })
      .sort({ createdAt: -1 })
      .populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get all orders (admin only)
router.get('/', isAuthenticated, hasRole(['admin']), async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

export default router; 