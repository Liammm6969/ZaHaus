import connectDB from '../backend/config/db.js';
import Order from '../backend/models/Order.js';
import MenuItem from '../backend/models/MenuItem.js';

export default async function handler(req, res) {
  await connectDB();
  const { method, url } = req;

  // Create order and update stock
  if (method === 'POST' && url.endsWith('/orders')) {
    // TODO: Add authentication logic
    try {
      const { items, shippingAddress } = req.body;
      const username = req.headers.username;
      let totalAmount = 0;
      const orderItems = [];
      for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem || menuItem.stock < item.quantity) {
          return res.status(400).json({ message: `Not enough stock for ${menuItem ? menuItem.name : 'item'}` });
        }
        const itemTotal = menuItem.price * item.quantity;
        totalAmount += itemTotal;
        orderItems.push({
          menuItem: item.menuItem,
          quantity: item.quantity,
          price: menuItem.price
        });
      }
      const order = await Order.create({
        user: username,
        items: orderItems,
        totalAmount,
        shippingAddress
      });
      await Promise.all(items.map(item =>
        MenuItem.updateOne(
          { _id: item.menuItem },
          { $inc: { stock: -item.quantity } }
        )
      ));
      return res.status(201).json(await Order.findById(order._id).populate('items.menuItem'));
    } catch (error) {
      return res.status(500).json({ message: 'Error creating order: ' + error.message });
    }
  }

  // Get user orders
  if (method === 'GET' && url.endsWith('/orders/my-orders')) {
    // TODO: Add authentication logic
    try {
      const orders = await Order.find({ user: req.headers.username })
        .sort({ createdAt: -1 })
        .populate('items.menuItem');
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders' });
    }
  }

  // Get all orders (admin only)
  if (method === 'GET' && url.endsWith('/orders')) {
    // TODO: Add authentication/authorization logic
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate('items.menuItem');
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders' });
    }
  }

  res.status(404).json({ message: 'Not found' });
} 