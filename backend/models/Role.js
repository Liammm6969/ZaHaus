import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  permissions: [{
    type: String,
    required: true,
    enum: [
      'create:product',
      'read:product',
      'update:product',
      'delete:product',
      'manage:users'
    ]
  }]
}, {
  timestamps: true
});

export default mongoose.model('Role', roleSchema); 