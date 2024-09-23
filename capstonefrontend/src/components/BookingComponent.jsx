import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Card, CardContent, Box, Button, Snackbar, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { updateCartCount, addBookingDetails } from '../redux/actions/cartActions';
import CartIcon from './CartIcon';
import bookingImg from '../assets/booking.png';

const BookingComponent = () => {
  const location = useLocation();
  const { provider } = location.state || {};
  const dispatch = useDispatch();
  const consumerDetails = JSON.parse(localStorage.getItem('user'));

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const selectedService = useSelector((state) => state.categories.selectedService);

  // Formik validation schema using Yup
  const validationSchema = Yup.object().shape({
    startDateTime: Yup.date().required('Start Date & Time is required'),
    endDateTime: Yup.date()
      .required('End Date & Time is required')
      .min(Yup.ref('startDateTime'), 'End date cannot be before start date'),
    provider: Yup.string().required('Provider ID is required'),
    consumer: Yup.string().required('Consumer ID is required'),
    service: Yup.string().required('Service ID is required'),
  });

  const formik = useFormik({
    initialValues: {
      startDateTime: '',
      endDateTime: '',
      provider: provider?._id || '',
      consumer: consumerDetails?._id || '',
      category: selectedCategory?._id || '',
      service: selectedService?._id || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const bookingData = {
        provider: values.provider,
        consumer: values.consumer,
        category: values.category,
        service: values.service,
        timeslot: [values.startDateTime, values.endDateTime],
      };

      const bookingDataDetails = {
        provider: provider?.username,
        consumer: consumerDetails?.username,
        category: selectedCategory?.name,
        service: selectedService?.name,
        timeslot: [values.startDateTime, values.endDateTime],
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
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '120%',
            marginTop: '0px',
            align: 'center',
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
                  <Typography variant="body2">{consumerDetails?.username}</Typography>
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
                  name="startDateTime"
                  value={formik.values.startDateTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
                  helperText={formik.touched.startDateTime && formik.errors.startDateTime}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Choose End Date & Time"
                  type="datetime-local"
                  name="endDateTime"
                  value={formik.values.endDateTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  error={formik.touched.endDateTime && Boolean(formik.errors.endDateTime)}
                  helperText={formik.touched.endDateTime && formik.errors.endDateTime}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#ff9800', color: 'white', marginTop: '20px' }}
              fullWidth
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

        {/* Snackbar for success or error messages */}
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          autoHideDuration={3000}
        />
      </form>
    </div>
  );
};

export default BookingComponent;
