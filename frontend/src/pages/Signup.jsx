import { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import '../styles/Auth.css';
import logo from '../pictures/logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      await signup(formData.username, formData.password);
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
          Create Account
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
            name="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="username"
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
            value={formData.password}
            onChange={handleChange}
            className="auth-textfield"
          />
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="auth-textfield"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-button"
          >
            Create Account
          </Button>
          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>
          <Link href="/login" className="auth-link" style={{ textAlign: 'center' }}>
            Sign in to your account
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup; 