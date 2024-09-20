import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProviderBookings } from '../services/api';
import DataTable from 'react-data-table-component';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import StatusIcon from '@mui/icons-material/AssignmentTurnedIn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { selectUser } from './selectors';

const ProviderBookingsPage = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
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
          console.error('Error fetching provider bookings:', error);
          setError('Failed to fetch bookings');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleVerificationButtonClick = (bookingId) => {
    navigate(`/verification/${bookingId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ textAlign: 'center', color: 'red' }}>{error}</Box>;
  }

  if (!user) {
    return <Box sx={{ textAlign: 'center' }}>No user data available. Please log in.</Box>;
  }

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    const statusMatch = statusFilter === 'All' || booking.status === statusFilter;
    const searchMatch =
      booking.service.name.toLowerCase().includes(searchLower) ||
      booking.consumer.username.toLowerCase().includes(searchLower);

    return statusMatch && searchMatch;
  });

  const columns = [
    {
      name: 'Service',
      selector: (row) => row.service.name,
      sortable: true,
      cell: (row) => (
        <>
          <VerifiedIcon sx={{ mr: 1 }} />
          {row.service.name}
        </>
      ),
    },
    {
      name: 'Consumer',
      selector: (row) => row.consumer.username,
      sortable: true,
      cell: (row) => (
        <>
          <VerifiedIcon sx={{ mr: 1 }} />
          {row.consumer.username}
        </>
      ),
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.timeslot[0]).toLocaleDateString(),
      sortable: true,
      cell: (row) => (
        <>
          <DateRangeIcon sx={{ mr: 1 }} />
          {new Date(row.timeslot[0]).toLocaleDateString()}
        </>
      ),
    },
    {
      name: 'Time Slot',
      selector: (row) => `${new Date(row.timeslot[0]).toLocaleTimeString()} - ${new Date(row.timeslot[1]).toLocaleTimeString()}`,
      sortable: true,
      cell: (row) => (
        <>
          <AccessTimeIcon sx={{ mr: 1 }} />
          {`${new Date(row.timeslot[0]).toLocaleTimeString()} - ${new Date(row.timeslot[1]).toLocaleTimeString()}`}
        </>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <>
          <StatusIcon sx={{ mr: 1 }} />
          {row.status}
        </>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <Button
          onClick={() => handleVerificationButtonClick(row._id)}
          variant="outlined"
          sx={{ color: 'white', backgroundColor: 'orange' }}
          disabled={row.status !== 'ongoing'}
        >
          Verify
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
        {`${user.username}'s Bookings`}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={handleStatusFilterChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ ml: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <Paper>
        <DataTable
          columns={columns}
          data={filteredBookings}
          pagination
          highlightOnHover
          striped
        />
      </Paper>
    </Box>
  );
};

export default ProviderBookingsPage;
