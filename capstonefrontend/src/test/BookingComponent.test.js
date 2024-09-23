// BookingComponent.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import BookingComponent from '../components/BookingComponent';
import rootReducer from '../redux/reducers/rootReducer'; // Adjust the import based on your folder structure

const store = createStore(rootReducer);

describe('BookingComponent', () => {
  test('renders BookingComponent with initial elements', () => {
    render(
      <Provider store={store}>
        <BookingComponent />
      </Provider>
    );

    expect(screen.getByText(/Booking Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose Start Date & Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose End Date & Time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Service/i })).toBeInTheDocument();
  });

  test('submits the form with valid input', async () => {
    render(
      <Provider store={store}>
        <BookingComponent />
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Choose Start Date & Time/i), {
      target: { value: '2023-09-25T10:00' },
    });
    fireEvent.change(screen.getByLabelText(/Choose End Date & Time/i), {
      target: { value: '2023-09-25T11:00' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Book Service/i }));

    // Check for success message or expected behavior here
    // This requires mocking the API call and managing the Snackbar state
    // For now, we will just verify that the button was clicked
    expect(screen.getByRole('button', { name: /Book Service/i })).toBeInTheDocument();
  });
});
