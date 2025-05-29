import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../pictures/logo.png';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/products' },
  { name: 'Location', path: '/location' }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartItemCount(count);
    };
    const updateUserRole = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    updateCartCount();
    updateUserRole();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('storage', updateUserRole);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateUserRole);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="toolbar">
          <Box
            component="a"
            href="/"
            className="logo logo-desktop"
          >
            <img src={logo} alt="ZaHaus Logo" className="logo-image" />
          </Box>

          <Box className="mobile-menu">
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="mobile-menu-dropdown"
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={() => handleNavigate(page.path)}
                  className="mobile-menu-item"
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="a"
            href="/"
            className="logo logo-mobile"
          >
            <img src={logo} alt="ZaHaus Logo" className="logo-image" />
          </Box>

          <Box className="desktop-menu">
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigate(page.path)}
                className="nav-link"
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box className="user-menu">
            {username && userRole === 'admin' && (
              <Button
                color="inherit"
                onClick={() => navigate('/admin/users')}
                className="admin-users-button"
              >
                Users
              </Button>
            )}
            {username && (
              <IconButton 
                color="inherit" 
                onClick={() => navigate('/checkout')}
                className="cart-button"
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
            {username ? (
              <Button 
                color="inherit" 
                onClick={handleLogout}
                className="logout-button"
              >
                Logout
              </Button>
            ) : (
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                className="login-button"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;