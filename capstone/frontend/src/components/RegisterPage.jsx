import React, { useState } from 'react';
import { Container, Typography, Button, Card, CardContent, CardMedia, Grid, styled, Tooltip } from '@mui/material';
import RegisterConsumer from './RegisterConsumer';
import RegisterProvider from './RegisterProvider';
import registrationImg from './registration.jpg';

// Styled components for layout
const MainContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  color: '#fff',
  backgroundColor: '#2a3d45',
  width: '100%',
  height: '50px', // Increased height for better accessibility
  fontSize: '1.1rem', // Increased font size
  '&:hover': {
    backgroundColor: '#1e2b30',
  },
}));

const RegisterPage = () => {
  const [isConsumer, setIsConsumer] = useState(true);

  return (
    <MainContainer maxWidth="lg">
      <Card elevation={3} style={{ borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={4}> {/* Increased spacing for better layout */}
          <Grid item xs={12} md={6}>
            <CardContent style={{ padding: '2rem' }}>
              <Typography variant="h4" align="center" gutterBottom>
                {isConsumer ? 'Register as Consumer' : 'Register as Provider'}
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Please fill out the form below to create an account. 
                Switch between Consumer and Provider as needed.
              </Typography>
              <Tooltip title={`Switch to ${isConsumer ? 'Provider' : 'Consumer'}`} arrow>
                <ToggleButton onClick={() => setIsConsumer(!isConsumer)}>
                  Switch to {isConsumer ? 'Provider' : 'Consumer'}
                </ToggleButton>
              </Tooltip>
              {isConsumer ? <RegisterConsumer /> : <RegisterProvider />}
            </CardContent>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              height="500"
              width="90%"
              image={registrationImg}
              alt="Registration"
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </Grid>
        </Grid>
      </Card>
    </MainContainer>
  );
};

export default RegisterPage;
