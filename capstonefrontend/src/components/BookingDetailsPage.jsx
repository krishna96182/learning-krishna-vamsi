import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import RateService from './RateService'; // Import the RateService component

const BookingDetailsPage = () => {
  const { id } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${id}`);
        setBooking(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching booking details. Please try again later.');
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (!booking) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Booking not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      padding: 4, 
      maxWidth: '600px', 
      margin: '30px auto', 
      backgroundColor: '#f5f5f5', 
      boxShadow: 3 
    }}>
      <Typography variant="h4" gutterBottom align="center" color="#333">
        Booking Details
      </Typography>
      
      <Card sx={{ mb: 3, backgroundColor: '#10181B', color: 'white' }}>
        <CardContent>
          <Typography variant="h6"><strong>Service:</strong> {booking.service?.name || 'N/A'}</Typography>
          <Typography variant="h6"><strong>Provider:</strong> {booking.provider?.username || 'N/A'}</Typography>
          <Typography variant="h6"><strong>Category:</strong> {booking.category?.name || 'N/A'}</Typography>
          <Typography variant="h6"><strong>Rating:</strong> {booking.rating || 'Not rated yet'}</Typography>
          <Typography variant="h6"><strong>Feedback:</strong> {booking.feedback || 'No feedback yet'}</Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        sx={{
          display: 'block', 
          width: '100%', 
          mt: 2,
          backgroundColor: '#ff9800', // Button color
          color: 'white',
          '&:hover': {
            backgroundColor: '#e68a00', // Darker orange on hover
          },
        }}
        onClick={() => setShowRatingForm(true)}
      >
        Rate Service
      </Button>

      {/* Dialog to show RateService component as a popup */}
      <Dialog open={showRatingForm} onClose={() => setShowRatingForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Rate Service</Typography>
            <IconButton onClick={() => setShowRatingForm(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <RateService bookingId={id} onClose={() => setShowRatingForm(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BookingDetailsPage;
