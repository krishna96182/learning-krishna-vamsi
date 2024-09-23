// src/components/RegisterConsumer.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import RegisterConsumer from '../components/RegisterConsumer';
import userEvent from '@testing-library/user-event';

// Mock Redux store for testing
const mockStore = createStore(() => ({
  user: null,
}));

describe('RegisterConsumer Component', () => {
  it('renders registration form with username, password, and mobile fields', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <RegisterConsumer />
        </Router>
      </Provider>
    );

    // Check if input fields are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
  });

  it('allows user to type into input fields', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <RegisterConsumer />
        </Router>
      </Provider>
    );

    // Type into username, password, and mobile fields
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    userEvent.type(screen.getByLabelText(/Mobile/i), '1234567890');

    // Check if the values are updated
    expect(screen.getByLabelText(/Username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('password123');
    expect(screen.getByLabelText(/Mobile/i)).toHaveValue('1234567890');
  });

  it('shows error when fields are empty and submit is clicked', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <RegisterConsumer />
        </Router>
      </Provider>
    );

    // Click on submit button
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for validation errors (modify error messages as per your validation)
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});
