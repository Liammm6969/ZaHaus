import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Box,
  Snackbar
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  PhotoCamera as PhotoCameraIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, uploadPhoto, updateStock } from '../services/menuService';
import Navbar from './Navbar';
import '../styles/AllProductMenu.css';

const AllProductMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: '',
    stock: 0
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const items = await getAllMenuItems();
      setMenuItems(items);
    } catch (err) {
      setError('Failed to load menu items');
    }
  };

  const handleOpen = (item = null) => {
    if (item) {
      setSelectedItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        photo: item.photo,
        stock: item.stock
      });
    } else {
      setSelectedItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        photo: '',
        stock: 0
      });
    }
    setOpen(true);
  };

  const handleOpenStockDialog = (item) => {
    setSelectedItem(item);
    setFormData(prev => ({
      ...prev,
      stock: item.stock
    }));
    setStockDialogOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSelectedItem(null);
  };

  const handleCloseStockDialog = () => {
    setStockDialogOpen(false);
    setError('');
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const photoUrl = await uploadPhoto(file);
      setFormData(prev => ({
        ...prev,
        photo: photoUrl
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      };

      if (selectedItem) {
        await updateMenuItem(selectedItem._id, submissionData);
        showSnackbar('Menu item updated successfully');
      } else {
        await createMenuItem(submissionData);
        showSnackbar('Menu item created successfully');
      }
      handleClose();
      loadMenuItems();
    } catch (err) {
      setError(err.message);
      showSnackbar(err.message, 'error');
    }
  };

  const handleUpdateStock = async () => {
    try {
      await updateStock(selectedItem._id, formData.stock);
      handleCloseStockDialog();
      loadMenuItems();
      showSnackbar('Stock updated successfully');
    } catch (err) {
      setError(err.message);
      showSnackbar(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      loadMenuItems();
      showSnackbar('Menu item deleted successfully');
    } catch (err) {
      setError(err.message);
      showSnackbar(err.message, 'error');
    }
  };

  const handleAddToCart = (item) => {
    if (item.stock === 0) {
      showSnackbar('This item is out of stock!', 'error');
      return;
    }

    // Get existing cart from localStorage or initialize empty array
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    
    if (existingItemIndex >= 0) {
      // If item exists, check stock before incrementing
      const currentQuantity = cart[existingItemIndex].quantity || 1;
      if (currentQuantity + 1 > item.stock) {
        showSnackbar('Not enough stock available!', 'error');
        return;
      }
      // If stock is sufficient, increment quantity
      cart[existingItemIndex].quantity = currentQuantity + 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      cart.push({ ...item, quantity: 1 });
    }
    
    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
    showSnackbar('Item added to cart!');
  };

  const handleBuyNow = (item) => {
    if (item.stock === 0) {
      showSnackbar('This item is out of stock!', 'error');
      return;
    }

    const cart = [{ ...item, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('cartUpdated'));
    window.location.href = '/checkout';
  };

  return (
    <div className="all-product-menu-container">
      <Navbar />
      
      <div className="menu-header">
        <div>
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-description">
            Discover our handcrafted pizzas made with fresh ingredients and baked to perfection. 
            Each pizza tells a story of flavor and tradition.
          </p>
        </div>
        {isAdmin && (
          <IconButton
            color="primary"
            onClick={() => handleOpen()}
            sx={{ 
              width: '60px', 
              height: '60px', 
              background: '#f9a825',
              '&:hover': { background: '#f57c00' }
            }}
          >
            <AddIcon sx={{ color: '#fff', fontSize: '2rem' }} />
          </IconButton>
        )}
      </div>

      {error && (
        <Container sx={{ mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      )}

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item-card">
            <img
              className="menu-item-image"
              src={item.photo}
              alt={item.name}
            />
            <div className="menu-item-content">
              {isAdmin && (
                <div className="admin-actions">
                  <IconButton onClick={() => handleOpen(item)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenStockDialog(item)} size="small">
                    <InventoryIcon />
                  </IconButton>
                </div>
              )}
              
              <div className="menu-item-header">
                <h3 className="menu-item-title">{item.name}</h3>
                <span className={`menu-item-stock ${
                  item.stock === 0 ? 'out-of-stock' : 
                  item.stock <= 5 ? 'low-stock' : 'in-stock'
                }`}>
                  {item.stock === 0 ? 'Out of Stock' :
                   item.stock <= 5 ? 'Low Stock' : 'In Stock'}
                </span>
              </div>
              
              <p className="menu-item-description">{item.description}</p>
              <div className="menu-item-price">${item.price}</div>
              
              <div className="menu-item-actions">
                <Button 
                  variant="outlined"
                  className="add-to-cart-btn"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="contained"
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(item)}
                  disabled={item.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Menu Item Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="dialog-title">
          {selectedItem ? 'Edit Menu Item' : 'Add Menu Item'}
        </DialogTitle>
        <DialogContent className="dialog-content">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            className="form-field"
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            className="form-field"
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            className="form-field"
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            className="form-field"
            margin="dense"
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={handleChange}
          />
          
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          <Button
            className="upload-btn"
            variant="outlined"
            component="span"
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            startIcon={<PhotoCameraIcon />}
            fullWidth
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
          
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Preview"
              className="preview-image"
            />
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.photo || !formData.name || !formData.description || !formData.price || formData.stock === undefined || formData.stock < 0}
          >
            {selectedItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Stock Dialog */}
      <Dialog 
        open={stockDialogOpen} 
        onClose={handleCloseStockDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="dialog-title">Update Stock</DialogTitle>
        <DialogContent className="dialog-content">
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            className="form-field"
            margin="dense"
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            value={formData.stock}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleCloseStockDialog}>Cancel</Button>
          <Button 
            onClick={handleUpdateStock}
            variant="contained"
          >
            Update Stock
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            alignItems: 'center',
            '& .MuiAlert-message': { fontSize: '1rem' },
            '& .MuiAlert-icon': { fontSize: '1.5rem' }
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllProductMenu;