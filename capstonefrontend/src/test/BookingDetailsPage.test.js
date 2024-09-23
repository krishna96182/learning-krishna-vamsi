// BookingDetailsPage.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookingDetailsPage from '../components/BookingDetailsPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('BookingDetailsPage', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders loading state', () => {
    render(
      <Router>
        <BookingDetailsPage />
      </Router>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders booking details on successful fetch', async () => {
    const bookingData = {
      service: { name: 'Service A' },
      provider: { username: 'Provider A' },
      category: { name: 'Category A' },
      rating: 4.5,
      feedback: 'Great service!',
    };

    mockAxios.onGet('http://localhost:3000/api/booking/1').reply(200, bookingData);

    render(
      <Router>
        <BookingDetailsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Booking Details/i)).toBeInTheDocument();
    });
  });

  test('renders error message on failed fetch', async () => {
    mockAxios.onGet('http://localhost:3000/api/booking/1').reply(500);

    render(
      <Router>
        <BookingDetailsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error fetching booking details/i)).toBeInTheDocument();
    });
  });

  test('renders booking not found message if booking is null', async () => {
    mockAxios.onGet('http://localhost:3000/api/booking/1').reply(404);

    render(
      <Router>
        <BookingDetailsPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Booking not found/i)).toBeInTheDocument();
    });
  });
});
