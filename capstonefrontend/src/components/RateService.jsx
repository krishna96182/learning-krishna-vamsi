import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar, TextField, Button, Alert, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RateService = ({ bookingId, onClose }) => {
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      rating: 0,
      feedback: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be between 1 and 5')
        .max(5, 'Rating must be between 1 and 5'),
      feedback: Yup.string()
        .required('Feedback is required')
        .max(500, 'Feedback must be 500 characters or less'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
          rating: values.rating,
          feedback: values.feedback,
        });

        // Reset form and close dialog
        formik.resetForm();
        if (onClose) onClose();
      } catch (error) {
        console.error('Failed to submit rating:', error);
      }
    },
  });

  return (
    <Box
      sx={{
        padding: 2,
        margin: '0 auto',
        backgroundColor: '#f0f2f5',
        maxWidth: '500px',
        height: '350px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#000',
          padding: 2,
          borderRadius: '12px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h2>Rate Service</h2>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Rating (1-5)"
            type="number"
            {...formik.getFieldProps('rating')}
            inputProps={{ min: 1, max: 5, placeholder: "Enter rating" }}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: '#000',
              color: 'white',
              borderRadius: '4px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff9800',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#ff9800',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9800',
                },
              },
            }}
          />
          <TextField
            label="Feedback"
            multiline
            rows={3}
            {...formik.getFieldProps('feedback')}
            error={formik.touched.feedback && Boolean(formik.errors.feedback)}
            helperText={formik.touched.feedback && formik.errors.feedback}
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: '#000',
              color: 'white',
              borderRadius: '4px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#ff9800',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: '#ff9800',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9800',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: formik.isValid && formik.dirty ? '#ff9800' : '#ffcc80',
              color: 'white',
              textTransform: 'none',
              padding: '10px 0',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
              cursor: formik.isValid && formik.dirty ? 'pointer' : 'not-allowed',
              opacity: formik.isValid && formik.dirty ? 1 : 0.7,
              '&:hover': {
                backgroundColor: formik.isValid && formik.dirty ? '#e68a00' : '#ffcc80',
              },
            }}
            disabled={!formik.isValid || !formik.dirty}
          >
            Submit Rating
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RateService;
