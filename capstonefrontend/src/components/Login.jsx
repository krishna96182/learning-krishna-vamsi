import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setUser } from '../redux/reducers/userSlice';
import { TextField, Button, Card, CardContent, Grid, Typography, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import loginImg from '../assets/login.jpg'; // Import the image
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
    .min(6, 'Username must be at least 6 characters long')
    .max(30, 'Username must be less than 30 characters long')
    .required('Username is required'),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be less than 30 characters long')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await login(values); // API call to login
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
      setErrors({ submit: 'Invalid username or password' });
    } finally {
      setSubmitting(false);
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
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Username"
                      placeholder="Enter your username"
                      value={values.username}
                      onChange={handleChange('username')}
                      onBlur={handleBlur('username')} // Trigger validation on blur
                      fullWidth
                      margin="normal"
                      required
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
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
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')} // Trigger validation on blur
                      fullWidth
                      margin="normal"
                      required
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
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
                    {errors.submit && <Typography color="error">{errors.submit}</Typography>}
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: '#ff9800', color: 'white', marginTop: '20px' }}
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                  </form>
                )}
              </Formik>
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
              src={loginImg}
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