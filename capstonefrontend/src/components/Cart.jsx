import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, CardContent, Button, Snackbar, IconButton, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateConsumerAddress, fetchConsumerDetails } from '../redux/actions/consumerActions';
import { resetCartCount } from '../redux/actions/cartActions';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Cart = () => {
  const dispatch = useDispatch();
  const bookingDetails = useSelector((state) => state.cart.bookingDetails);
  const consumerAddress = useSelector((state) => state.consumer.address);
  const consumerId = JSON.parse(localStorage.getItem('user'));
  
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setSnackbarOpen(true);
    setCashOnDelivery(false);
    dispatch(resetCartCount());
    navigate('/consumer/dashboard');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddressEdit = () => {
    setEditingAddress(true);
  };

  const handleAddressSave = (values) => {
    if (consumerId) {
      dispatch(updateConsumerAddress(consumerId._id, values.newAddress));
    }
    setEditingAddress(false);
  };

  useEffect(() => {
    if (consumerId) {
      dispatch(fetchConsumerDetails(consumerId._id));
    }
  }, [dispatch, consumerId]);

  // Validation Schema for Yup
  const validationSchema = Yup.object().shape({
    newAddress: Yup.string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters long')
      .max(200, 'Address cannot exceed 200 characters'),
  });

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: '600px',
        margin: '30px auto 0 auto',
        backgroundColor: '#f5f5f5',
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
          backgroundColor: '#10181B',
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
        disabled={!cashOnDelivery}
      >
        Make Payment
      </Button>

      <Divider sx={{ width: '100%', my: 2 }} />

      <Typography variant="h5" gutterBottom>Address</Typography>

      {editingAddress ? (
        <Formik
          initialValues={{ newAddress: consumerAddress || '' }}
          validationSchema={validationSchema}
          onSubmit={handleAddressSave}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={values.newAddress}
                onChange={handleChange('newAddress')}
                placeholder="Enter new address"
                error={touched.newAddress && Boolean(errors.newAddress)}
                helperText={touched.newAddress && errors.newAddress}
              />
              <Button variant="contained" style={{ backgroundColor: '#ff9800', color: 'white' }} type="submit" sx={{ mt: 2 }}>
                Save Address
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        <Box>
          {consumerAddress ? (
            <Box>
              <Typography variant="body1">{consumerAddress}</Typography>
              <Button
                variant="outlined"
                style={{ borderColor: '#ff9800', color: '#ff9800' }}
                onClick={handleAddressEdit}
                sx={{ mt: 1 }}
              >
                Edit Address
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: '#ff9800', color: 'white' }}
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
