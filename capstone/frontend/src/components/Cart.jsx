import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, CardContent, Button, Snackbar, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateConsumerAddress, fetchConsumerDetails } from '../redux/actions/consumerActions';

const Cart = () => {
  const dispatch = useDispatch();
  const bookingDetails = useSelector((state) => state.cart.bookingDetails);
  const consumerAddress = useSelector((state) => state.consumer.address);
  const consumerId = JSON.parse(localStorage.getItem('user'));

  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(consumerAddress || '');
  const navigate = useNavigate();

  const handlePayment = () => {
    // Handle payment logic
    setSnackbarOpen(true);
    setCashOnDelivery(false);
    navigate('/consumer/dashboard');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddressEdit = () => {
    setEditingAddress(true);
  };

  const handleAddressSave = () => {
    if (consumerId) {
      console.log('Address Updated');
      dispatch(updateConsumerAddress(consumerId._id, newAddress));
    }
    setEditingAddress(false);
  };

  useEffect(() => {
    if (consumerId) {
      dispatch(fetchConsumerDetails(consumerId._id));
    }
  }, [dispatch, consumerId]);

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: '600px',
        margin: '30px auto 0 auto',
        backgroundColor: '#f5f5f5', // Page background color
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#2a3d45', marginBottom: '20px' }}>
        Your Booking Details
      </Typography>

      {bookingDetails ? (
        <Box sx={{ mb: 3, width: '100%' }}>
          <Typography variant="h6" style={{ color: '#2a3d45' }}><strong>Provider:</strong> {bookingDetails.provider}</Typography>
          <Typography variant="h6" style={{ color: '#2a3d45' }}><strong>Consumer:</strong> {bookingDetails.consumer}</Typography>
          <Typography variant="h6" style={{ color: '#2a3d45' }}><strong>Category:</strong> {bookingDetails.category}</Typography>
          <Typography variant="h6" style={{ color: '#2a3d45' }}><strong>Service:</strong> {bookingDetails.service}</Typography>
        </Box>
      ) : (
        <Typography style={{ color: '#2a3d45' }}>No booking details available.</Typography>
      )}

      <Divider sx={{ width: '100%', my: 2 }} />

      <Typography variant="h5" gutterBottom align="center" style={{ color: '#2a3d45', marginBottom: '20px' }}>
        Payment Method
      </Typography>

      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          cursor: 'pointer',
          backgroundColor: '#10181B', // Card background color
          color: 'white',
          borderRadius: '8px',
        }}
        onClick={() => setCashOnDelivery(!cashOnDelivery)}
      >
        <CardContent>
          <Typography variant="h6" style={{ color: cashOnDelivery ? '#ff9800' : '#ffffff' }}>
            Cash on Delivery
          </Typography>
          <Typography variant="body2" style={{ color: '#ff9800' }}>
            {cashOnDelivery ? '✔ Selected' : '❌ Not Selected'}
          </Typography>
        </CardContent>
      </Card>

      <Button
  variant="contained"
  style={{ backgroundColor: cashOnDelivery ? '#ff9800' : '#ddd', color: 'white', width: '100%', maxWidth: '400px' }}
  onClick={handlePayment}
  sx={{ mt: 2 }}
  disabled={!cashOnDelivery} // Disable button if cashOnDelivery is not selected
>
  Make Payment
</Button>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Typography variant="h5" gutterBottom>Address</Typography>

      {editingAddress ? (
        <Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter new address"
          />
          <Button variant="contained" style={{ backgroundColor: '#ff9800', color: 'white' }} onClick={handleAddressSave} sx={{ mt: 2 }}>
            Save Address
          </Button>
        </Box>
      ) : (
        <Box>
          {consumerAddress ? (
            <Box>
              <Typography variant="body1">{consumerAddress}</Typography>
              <Button
                variant="outlined"
                style={{ borderColor: '#ff9800', color: '#ff9800' }} // Change button style
                onClick={handleAddressEdit}
                sx={{ mt: 1 }}
              >
                Edit Address
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: '#ff9800', color: 'white' }} // Change button style
              onClick={handleAddressEdit}
            >
              Add Address
            </Button>
          )}
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Service successfully booked!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Cart;
