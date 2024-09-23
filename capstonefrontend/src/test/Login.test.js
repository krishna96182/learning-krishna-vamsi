import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import Login from '../components/Login';
import userEvent from '@testing-library/user-event';

// Mock Redux store for testing
const mockStore = createStore(() => ({
  user: null,
}));

describe('Login Component', () => {
  it('renders login form with username and password fields', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Check if username and password fields are rendered
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('allows user to type into input fields', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Type into username and password fields
    userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/Password/i), 'password123');

    // Check if the values are updated
    expect(screen.getByLabelText(/Username/i)).toHaveValue('testuser');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('password123');
  });

  it('shows error when fields are empty and submit is clicked', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Click on submit button
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for validation errors
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
