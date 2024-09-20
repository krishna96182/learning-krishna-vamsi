import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar, TextField, Button, Alert, Box } from '@mui/material';

const RateService = ({ bookingId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
        rating,
        feedback,
      });

      setSuccess('Rating submitted successfully!');
      setRating(0);
      setFeedback('');
      if (onClose) onClose();
    } catch (error) {
      setError('Failed to submit rating. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        margin: '30px auto',
        backgroundColor: '#f0f2f5', // Softer page background color
        maxWidth: '500px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#1e293b', // Darker, modern card background
          padding: 4,
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2>Rate Your Service</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Rating (0-5)"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            inputProps={{ min: 0, max: 5 }}
            required
            fullWidth
            sx={{
              mb: 3,
              backgroundColor: 'white',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
              '&:focus-within': {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            fullWidth
            sx={{
              mb: 3,
              backgroundColor: 'white',
              borderRadius: '4px',
              transition: 'background-color 0.3s',
              '&:focus-within': {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: rating && feedback ? '#0288d1' : '#ddd', // Blue when active, gray when disabled
              color: 'white',
              textTransform: 'none',
              padding: '10px 0',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: rating && feedback ? '#0277bd' : '#ddd', // Darker blue on hover
              },
            }}
            disabled={!rating || !feedback}
          >
            Submit Rating
          </Button>
        </form>
      </Box>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RateService;
