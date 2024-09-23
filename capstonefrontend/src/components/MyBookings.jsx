import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Divider, Box, TextField, InputAdornment } from '@mui/material';
import axios from 'axios';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const consumerId = user ? user._id : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!consumerId) {
        console.error('No consumer ID found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/booking/consumer/${consumerId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [consumerId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircleIcon style={{ color: 'white' }} />;
      case 'Pending':
        return <HourglassEmptyIcon style={{ color: 'white' }} />;
      case 'Cancelled':
        return <CancelIcon style={{ color: 'white' }} />;
      default:
        return <HourglassEmptyIcon style={{ color: 'white' }} />;
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.provider.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" style={{ color: 'white' }}>
        My Bookings
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search by service or provider name"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {filteredBookings.length === 0 ? (
        <Typography variant="h6" align="center" style={{ color: 'white' }}>
          No bookings found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card
                elevation={3}
                style={{
                  backgroundColor: '#000',
                  color: 'white',
                  padding: '20px',
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {booking.service.name}
                  </Typography>
                  <Typography variant="body2" color="inherit" gutterBottom>
                    Provider: {booking.provider.username}
                  </Typography>

                  <Divider style={{ margin: '10px 0', backgroundColor: 'white' }} />

                  <Box display="flex" alignItems="center" mb={1}>
                    <EventIcon style={{ color: 'white', marginRight: 8 }} />
                    <Typography variant="body2" color="inherit">
                      {`Timeslot: ${new Date(booking.timeslot[0]).toLocaleString()} - ${new Date(booking.timeslot[1]).toLocaleString()}`}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    {getStatusIcon(booking.status)}
                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                      Status: {booking.status}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <br />
    </Container>
  );
};

export default MyBookings;