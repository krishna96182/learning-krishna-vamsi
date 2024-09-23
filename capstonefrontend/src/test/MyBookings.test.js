// MyBookings.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyBookings from '../components/MyBookings'; // Adjust the path as necessary
import axios from 'axios';

jest.mock('axios');

describe('MyBookings Component', () => {
  const mockBookings = [
    {
      _id: '1',
      service: { name: 'Service One' },
      provider: { username: 'Provider One' },
      timeslot: [new Date().toISOString(), new Date(Date.now() + 3600000).toISOString()],
      status: 'Confirmed',
    },
    {
      _id: '2',
      service: { name: 'Service Two' },
      provider: { username: 'Provider Two' },
      timeslot: [new Date().toISOString(), new Date(Date.now() + 3600000).toISOString()],
      status: 'Pending',
    },
  ];

  beforeEach(() => {
    // Set up local storage mock
    const user = { _id: 'consumerId123' };
    localStorage.setItem('user', JSON.stringify(user));

    // Mock the axios GET request
    axios.get.mockResolvedValue({ data: mockBookings });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders loading state initially', () => {
    render(<MyBookings />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders bookings after loading', async () => {
    render(<MyBookings />);
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Service One')).toBeInTheDocument();
    expect(screen.getByText('Provider One')).toBeInTheDocument();
  });

  test('filters bookings based on search query', async () => {
    render(<MyBookings />);
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText('Search by service or provider name');
    fireEvent.change(searchInput, { target: { value: 'Service One' } });

    expect(screen.getByText('Service One')).toBeInTheDocument();
    expect(screen.queryByText('Service Two')).not.toBeInTheDocument();
  });
});
