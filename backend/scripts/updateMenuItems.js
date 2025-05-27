import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ZaHaus')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const updateMenuItems = async () => {
  try {
    // Update all documents that don't have a stock field
    const result = await MenuItem.updateMany(
      { stock: { $exists: false } },
      { $set: { stock: 0 } }
    );

    console.log(`Updated ${result.modifiedCount} menu items with default stock value`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating menu items:', error);
    process.exit(1);
  }
};

updateMenuItems(); 