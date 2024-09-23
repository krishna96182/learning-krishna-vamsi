import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { TextField, Button, Box, Typography, Container, Card } from '@mui/material';
import { styled } from '@mui/system';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';

// Styled components for layout and styling
const CustomButton = styled(Button)( {
  backgroundColor: '#ff9800',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#e68900',
  },
});

const CustomTextField = styled(TextField)( {
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

// Validation schema using Yup (reflecting backend validations)
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
    .min(6, 'Username must be at least 6 characters long')
    .max(30, 'Username must be less than 30 characters long')
    .required('Username is required'),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
    .min(6, 'Password must be at least 6 characters long')
    .max(30, 'Password must be less than 30 characters long')
    .required('Password is required'),
  mobile: Yup.string()
    .optional()
    .matches(/^(\+?\d{1,4}|\d{1,4})?((\d{10}))$/, 'Invalid mobile number'),
});

const RegisterConsumer = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await register(values);
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
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Formik
          initialValues={{
            username: '',
            password: '',
            mobile: '',
            role: 'consumer',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  name="username"
                  as={CustomTextField}
                  label="Username"
                  placeholder="Enter your username"
                  InputProps={{
                    startAdornment: (
                      <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: '#fff' }} />
                    ),
                  }}
                  fullWidth
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ color: 'red', marginTop: '5px' }}
                />
              </Box>

              <Box mb={2}>
                <Field
                  name="password"
                  as={CustomTextField}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  InputProps={{
                    startAdornment: (
                      <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px', color: '#fff' }} />
                    ),
                  }}
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: 'red', marginTop: '5px' }}
                />
              </Box>

              <Box mb={2}>
                <Field
                  name="mobile"
                  as={CustomTextField}
                  label="Mobile"
                  placeholder="Enter your mobile number"
                  InputProps={{
                    startAdornment: (
                      <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: '#fff' }} />
                    ),
                  }}
                  fullWidth
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  style={{ color: 'red', marginTop: '5px' }}
                />
              </Box>

              <CustomButton
                type="submit"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Register
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default RegisterConsumer;
