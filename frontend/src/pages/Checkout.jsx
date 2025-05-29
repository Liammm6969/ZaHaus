import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import Navbar from './Navbar';
import '../styles/CheckoutPage.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [error, setError] = useState('');
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      navigate('/products');
    }
    setCartItems(cart);
    // Initially select all items
    setSelectedItems(new Set(cart.map(item => item._id)));
  }, [navigate]);

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item._id === itemId) {
          const newQuantity = Math.max(1, (item.quantity || 1) + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      return updatedItems;
    });
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      // Remove from selected items
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      return updatedItems;
    });
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      // If all are selected, unselect all
      setSelectedItems(new Set());
    } else {
      // Otherwise, select all
      setSelectedItems(new Set(cartItems.map(item => item._id)));
    }
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item._id))
      .reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createOrder(cartItems.filter(item => selectedItems.has(item._id)), shippingAddress);
      setSuccess(true);
      // Remove checked out items from cart
      const remainingItems = cartItems.filter(item => !selectedItems.has(item._id));
      localStorage.setItem('cart', JSON.stringify(remainingItems));
      
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Redirect to products page after 2 seconds
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const isAddressComplete = () => {
    return shippingAddress.trim() !== '';
  };

  if (success) {
    return (
      <Container>
        <Navbar />
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Alert severity="success">
            Order placed successfully! Redirecting to menu...
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container className="checkout-container" sx={{ py: 4 }}>
      <Navbar />
      <Typography variant="h4" component="h1" gutterBottom className="checkout-header">
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <Typography variant="h6" className="checkout-empty" sx={{ textAlign: 'center', my: 4 }}>
          Your cart is empty
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedItems.size === cartItems.length}
                    indeterminate={selectedItems.size > 0 && selectedItems.size < cartItems.length}
                    onChange={toggleSelectAll}
                  />
                }
                label="Select All Items"
              />
            </Box>
            {cartItems.map((item) => (
              <Card key={item._id} className="checkout-card" sx={{ mb: 2 }}>
                <Grid container>
                  <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Checkbox
                      checked={selectedItems.has(item._id)}
                      onChange={() => toggleItemSelection(item._id)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.photo}
                      alt={item.name}
                      className="checkout-card-media"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${item.price}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          onClick={() => updateQuantity(item._id, -1)}
                          disabled={item.quantity <= 1}
                          className="checkout-qty-btn"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>
                          {item.quantity || 1}
                        </Typography>
                        <IconButton onClick={() => updateQuantity(item._id, 1)} className="checkout-qty-btn">
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => removeItem(item._id)}
                          sx={{ ml: 2 }}
                          className="checkout-remove-btn"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="checkout-summary-card">
              <CardContent>
                <Typography variant="h6" gutterBottom className="checkout-summary-title">
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {cartItems
                    .filter(item => selectedItems.has(item._id))
                    .map((item) => (
                      <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {item.name} x {item.quantity || 1}
                        </Typography>
                        <Typography variant="body2">
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" className="checkout-summary-total">${calculateTotal().toFixed(2)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="checkout-btn"
                  onClick={() => setIsAddressDialogOpen(true)}
                  disabled={selectedItems.size === 0}
                >
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={isAddressDialogOpen} onClose={() => setIsAddressDialogOpen(false)} className="checkout-dialog">
        <DialogTitle>Shipping Address</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Shipping Address"
            fullWidth
            multiline
            rows={3}
            value={shippingAddress}
            onChange={handleAddressChange}
            required
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddressDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={!isAddressComplete() || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Place Order'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkout;