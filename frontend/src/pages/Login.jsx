import { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/Auth.css';
import logo from '../pictures/logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xl" className="auth-container">
      <Box className="auth-box">
        <Box className="auth-logo-container">
          <img src={logo} alt="ZaHaus Logo" className="auth-logo" />
        </Box>
        <Typography component="h1" variant="h4" className="auth-title">
          Welcome Back
        </Typography>
        {error && (
          <Alert severity="error" className="auth-alert">
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} className="auth-form">
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            className="auth-textfield"
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="auth-textfield"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-button"
          >
            Sign In
          </Button>
          <div className="auth-divider">
            <span>Don't have an account?</span>
          </div>
          <Link href="/signup" className="auth-link" style={{ textAlign: 'center' }}>
            Create an account
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 