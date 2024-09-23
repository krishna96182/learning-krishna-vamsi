import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProviderBookings } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Pagination,
} from '@mui/material';
import { selectUser } from './selectors';
import { AccessTime, CalendarToday, Done, HourglassEmpty, Cancel, Search } from '@mui/icons-material';

const ProviderBookingsPage = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      if (user && user._id) {
        try {
          const response = await fetchProviderBookings(user._id);
          setBookings(response.data);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch bookings');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const updateBookingStatuses = () => {
    const currentTime = new Date();
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        const [startTime, endTime] = booking.timeslot.map((ts) => new Date(ts));
        let status;

        if (booking.status === 'completed') {
          status = 'completed';
        } else if (currentTime < startTime) {
          status = 'upcoming';
        } else if (currentTime >= startTime && currentTime <= endTime) {
          status = 'ongoing';
        } else {
          status = 'incomplete';
        }

        booking.status = status;
        return booking;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(updateBookingStatuses, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleVerificationButtonClick = (bookingId) => {
    navigate(`/verification/${bookingId}`);
  };

  const filterBookings = () => {
    return bookings.filter((booking) =>
      (booking.service.name.toLowerCase().includes(filter.toLowerCase()) ||
      booking.consumer.username.toLowerCase().includes(filter.toLowerCase())) &&
      (statusFilter === 'all' || booking.status === statusFilter)
    );
  };

  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'incomplete', label: 'Incomplete' },
  ];

  const statusIcons = {
    completed: <Done color="success" />,
    ongoing: <AccessTime color="primary" />,
    upcoming: <HourglassEmpty color="orange" />,
    incomplete: <Cancel color="error" />,
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredBookings = filterBookings();
  const paginatedBookings = filteredBookings.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        Bookings
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
        <TextField
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: '200px', mr: 2 }}
          InputProps={{
            startAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer sx={{ mt: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Service</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Consumer</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Time Slot</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBookings.map((booking, index) => (
              <TableRow key={booking._id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <TableCell>{booking.service.name}</TableCell>
                <TableCell>{booking.consumer.username}</TableCell>
                <TableCell>
                  <Tooltip title="Time Slot">
                    <Box display="flex" alignItems="center">
                      <CalendarToday sx={{ mr: 1 }} />
                      <Typography>
                        {`${new Date(booking.timeslot[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, `}
                        <AccessTime sx={{ mr: 0.5 }} />
                        {`${new Date(booking.timeslot[0]).toLocaleTimeString()} - `}
                        {`${new Date(booking.timeslot[1]).toLocaleTimeString()}`}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {statusIcons[booking.status]}
                    <Typography sx={{ ml: 1 }}>{booking.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleVerificationButtonClick(booking._id)}
                    variant="outlined"
                    sx={{ color: 'white', backgroundColor: 'orange' }}
                    disabled={['completed', 'incomplete', 'upcoming'].includes(booking.status) /* Keep this line as is */}
                  >
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Pagination
        count={Math.ceil(filteredBookings.length / rowsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default ProviderBookingsPage;
