import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://William:liammarkpajarillo21@cluster.ptg8k8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));