import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, CardContent, Box, Button, Snackbar, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { updateCartCount, addBookingDetails } from '../redux/actions/cartActions';
import CartIcon from './CartIcon'; // Import the CartIcon component
import bookingImg from './booking.png'; // Import your image here

const BookingComponent = () => {
  const location = useLocation();
  const { provider } = location.state || {};
  const dispatch = useDispatch();
  const [consumerName, setConsumerName] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const consumerDetails = JSON.parse(localStorage.getItem('user'));

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (consumerDetails) {
      setConsumerName(consumerDetails.username);
    }
  }, [consumerDetails]);

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const selectedService = useSelector((state) => state.categories.selectedService);

  const handleBookService = async () => {
    const bookingData = {
      provider: provider?._id,
      consumer: consumerDetails._id,
      category: selectedCategory?._id,
      service: selectedService?._id,
      timeslot: [startDateTime, endDateTime],
    };
    const bookingDataDetails = {
      provider: provider?.username,
      consumer: consumerDetails.username,
      category: selectedCategory?.name,
      service: selectedService?.name,
      timeslot: [startDateTime, endDateTime],
    };

    try {
      const response = await axios.post('http://localhost:3000/api/booking', bookingData);

      if (response.status === 201) {
        dispatch(updateCartCount(1)); // Increment cart count
        dispatch(addBookingDetails(bookingDataDetails));
        setSnackbarMessage('Service successfully booked!');
        setSnackbarOpen(true); // Show snackbar
      }
    } catch (error) {
      console.error('Error booking the service:', error);
      setSnackbarMessage('Failed to book the service. Please try again.');
      setSnackbarOpen(true); // Show snackbar
    }
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: 'whitesmoke',
        height: '140vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Card
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '80%',
          marginTop: '0px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#10181B',
        }}
      >
        {/* Form Section */}
        <div style={{ flex: '0 0 50%', padding: '20px' }}>
          <CartIcon style={{ position: 'absolute', top: 16, right: 16 }} />

          <Typography variant="h5" gutterBottom align="center" style={{ color: 'white' }}>
            Booking Details
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: 2,
            }}
          >
            <Card style={{ backgroundColor: '#1F2A30', color: 'white', padding: '10px', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#ff9800' }}>
                  Provider Name
                </Typography>
                <Typography variant="body2">{provider.username}</Typography>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: '#1F2A30', color: 'white', padding: '10px', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#ff9800' }}>
                  Consumer Name
                </Typography>
                <Typography variant="body2">{consumerName}</Typography>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: '#1F2A30', color: 'white', padding: '10px', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#ff9800' }}>
                  Category
                </Typography>
                <Typography variant="body2">{selectedCategory?.name || 'N/A'}</Typography>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: '#1F2A30', color: 'white', padding: '10px', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#ff9800' }}>
                  Service
                </Typography>
                <Typography variant="body2">{selectedService?.name || 'N/A'}</Typography>
              </CardContent>
            </Card>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Choose Start Date & Time"
      type="datetime-local"
      value={startDateTime}
      onChange={(e) => setStartDateTime(e.target.value)}
      variant="outlined"
      sx={{ mb: 2, backgroundColor: '#1F2A30' }}
      InputLabelProps={{
        style: { color: 'orange' }, // Change label color to white
        shrink: true,
      }}
      InputProps={{
        style: {
          color: 'white',
          backgroundColor: '#1F2A30',
        },
      }}
    />
  </Grid>

  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="Choose End Date & Time"
      type="datetime-local"
      value={endDateTime}
      onChange={(e) => setEndDateTime(e.target.value)}
      variant="outlined"
      sx={{ mb: 2, backgroundColor: '#1F2A30' }}
      InputLabelProps={{
        style: { color: 'orange' }, // Change label color to white
        shrink: true,
      }}
      InputProps={{
        style: {
          color: 'white',
          backgroundColor: '#1F2A30',
        },
      }}
    />
  </Grid>
</Grid>


          <Button
            variant="contained"
            style={{ backgroundColor: '#ff9800', color: 'white', marginTop: '20px' }}
            fullWidth
            onClick={handleBookService}
          >
            Book Service
          </Button>
        </div>

        {/* Image Section */}
        <div
          style={{
            flex: '0 0 50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'orange',
          }}
        >
          <img
            src={bookingImg}
            alt="Booking"
            style={{
              width: '80%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '8px 0 0 8px',
            }}
          />
        </div>
      </Card>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default BookingComponent;
