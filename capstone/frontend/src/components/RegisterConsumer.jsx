import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { TextField, Button, Box, Typography, Container, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

// Styled components for layout and styling
const CustomButton = styled(Button)({
  backgroundColor: '#ff9800',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#e68900',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#10181B', // Darker background for input fields
    borderRadius: '5px',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
    fontSize: '14px', // Increased label font size
    top: '-6px', // Adjust label position
  },
  '& .MuiOutlinedInput-root': {
    padding: '8px', // Adjust padding to ensure proper spacing
    fontSize: '16px',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px', // Increase padding for better touch target
    color: 'white', // Change text color to white
  },
});

// New Button for switching roles
const SwitchButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#155a9a',
  },
});

const RegisterConsumer = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    role: 'consumer',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: '-50px',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#10181B',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={3}>
              <CustomTextField
                fullWidth
                variant="outlined"
                label="Username"
                placeholder="Enter your username"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Box>
            <Box mb={3}>
              <CustomTextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Box>
            <Box mb={3}>
              <CustomTextField
                fullWidth
                variant="outlined"
                label="Mobile"
                placeholder="Enter your mobile number"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
              />
            </Box>
            <CustomButton fullWidth type="submit">
              Sign Up
            </CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterConsumer;
