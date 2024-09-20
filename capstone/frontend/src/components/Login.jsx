import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setUser } from '../redux/reducers/userSlice';
import { TextField, Button, Card, CardContent, Grid, Typography, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import loginImg from './login.jpg'; // Import the image

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData); // API call to login
      const userDetails = res.data.userDetails;
      const token = res.data.token;

      // Dispatch user and token to the Redux store
      dispatch(setUser({ user: userDetails, token }));

      // Store token and user in localStorage manually (if not stored by Redux)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));

      // Navigate based on user role
      if (userDetails.role === 'consumer') {
        navigate('/consumer/dashboard');
      } else if (userDetails.role === 'provider') {
        navigate('/provider/dashboard');
      }
    } catch (err) {
      console.error('Invalid credentials');
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <Card
        style={{
          maxWidth: 600,
          width: '100%',
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#10181B',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Grid container spacing={2}>
          {/* Left Side - Login Form */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  placeholder="Enter your username" // Placeholder for username
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />
                <TextField
                  label="Password"
                  placeholder="Enter your password" // Placeholder for password
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: 'white' }} />
                      </InputAdornment>
                    ),
                    style: { color: 'white' },
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#ff9800', color: 'white', marginTop: '20px' }}
                  fullWidth
                >
                  Login
                </Button>
              </form>
              <Typography style={{ marginTop: '15px', color: 'white', textAlign: 'center' }}>
                Are you a new user?{' '}
                <span
                  style={{ cursor: 'pointer', color: '#ff9800' }}
                  onClick={handleRegister}
                >
                  Register
                </span>
              </Typography>
            </CardContent>
          </Grid>

          {/* Right Side - Image */}
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={loginImg} // Use imported image
              alt="Login visual"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Login;
