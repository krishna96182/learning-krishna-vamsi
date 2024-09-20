import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import { Rating } from 'react-simple-star-rating';

const BookingDetailsPage = () => {
  const { id } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  const handleRating = (rate) => {
    setRating(rate); // Set rating value
  };

  const handleSubmit = async () => {
    // Submit the rating and feedback via an API call
    try {
      const response = await axios.post(`http://localhost:3000/api/booking/rate/${id}`, {
        rating,
        feedback,
      });
      console.log('Rating submitted:', response.data);
      setShowRatingForm(false);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ 
      padding: 4, 
      maxWidth: '600px', 
      margin: '30px auto', 
      backgroundColor: '#f5f5f5', // Page background color
      boxShadow: 3 
    }}>
      <Typography variant="h4" gutterBottom align="center">
        Booking Details
      </Typography>
      
      <Card sx={{ mb: 3, backgroundColor: '#10181B', color: 'white' }}> {/* Card background color */}
        <CardContent>
          <Typography variant="h6"><strong>Service:</strong> {booking.service.name}</Typography>
          <Typography variant="h6"><strong>Provider:</strong> {booking.provider.username}</Typography>
          <Typography variant="h6"><strong>Category:</strong> {booking.category.name}</Typography>
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
          color: 'white' // Text color
        }}
        onClick={() => setShowRatingForm(true)}
      >
        Rate Service
      </Button>

      {showRatingForm && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom align="center">Rate the Service</Typography>
          <Rating onClick={handleRating} ratingValue={rating} size={40} fillColor="#ffd700" />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#ff9800', // Button color
              color: 'white' // Text color
            }}
            onClick={handleSubmit}
          >
            Submit Rating
          </Button>

          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => setShowRatingForm(false)}
            sx={{ mt: 1 }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BookingDetailsPage;
