import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import profileImage from '../assets/profile.png'; // Replace with your image

// Styled Container for the Profile Page
const StyledContainer = styled(Container)({
  backgroundColor: '#f5f5f5', // White smoke background
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Softer shadow
  marginTop: '2rem',
  color: '#000', // Black text
  position: 'relative',
  zIndex: 1,
});

const ProfilePage = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    address: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/consumer/${id}`);
        setUserDetails(response.data);
        setFormData({
          username: response.data.username,
          mobile: response.data.mobile,
          address: response.data.address
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const { password, ...dataToUpdate } = formData;
      await axios.put(`http://localhost:3000/api/auth/consumer/${id}`, dataToUpdate);
      setSnackbarMessage('Profile updated successfully!');
      setSnackbarOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage('Error updating profile.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!userDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <StyledContainer maxWidth="md">
      <Grid container spacing={2}>
        {/* Left Side: Profile Form */}
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Typography variant="h4" sx={{ marginBottom: '1rem', color: '#000' }}>
              {formData.username}
            </Typography>

            {/* Username TextField */}
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              placeholder="Enter Username"
              InputProps={{
                style: { backgroundColor: '#fff', color: '#000' }, // White input with black text
                disableUnderline: false
              }}
              InputLabelProps={{
                style: { color: '#555' }, // Grey label
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light grey border line
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb', // Darker grey border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000', // Black border when focused
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#666', // Grey placeholder text
                  opacity: 1, // Ensure visibility of placeholder
                },
              }}
            />

            {/* Mobile TextField */}
            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              placeholder="Enter Mobile"
              InputProps={{
                style: { backgroundColor: '#fff', color: '#000' }, // White input with black text
                disableUnderline: false
              }}
              InputLabelProps={{
                style: { color: '#555' }, // Grey label
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light grey border line
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb', // Darker grey border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000', // Black border when focused
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#666', // Grey placeholder text
                  opacity: 1, // Ensure visibility of placeholder
                },
              }}
            />

            {/* Address TextField */}
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              placeholder="Enter Address"
              InputProps={{
                style: { backgroundColor: '#fff', color: '#000' }, // White input with black text
                disableUnderline: false
              }}
              InputLabelProps={{
                style: { color: '#555' }, // Grey label
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light grey border line
                  },
                  '&:hover fieldset': {
                    borderColor: '#bbb', // Darker grey border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000', // Black border when focused
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#666', // Grey placeholder text
                  opacity: 1, // Ensure visibility of placeholder
                },
              }}
            />
          </Grid>
          <Button
            variant={isEditing ? "contained" : "outlined"}
            sx={{
              backgroundColor: isEditing ? '#ff8c00' : 'transparent', // Orange button
              color: isEditing ? '#fff' : '#ff8c00',
              borderColor: '#ff8c00',
              width: '100%',
              marginTop: '1rem',
              '&:hover': {
                backgroundColor: isEditing ? '#e07b00' : 'transparent',
                borderColor: '#e07b00',
              }
            }}
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Grid>

        {/* Right Side: Profile Image */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
          <img src={profileImage} alt="Profile" style={{ width: '100%', borderRadius: '8px' }} />
        </Grid>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ProfilePage;
