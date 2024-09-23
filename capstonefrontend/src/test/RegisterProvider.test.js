// RegisterProvider.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterProvider from '../components/RegisterProvider'; // Adjust the path as necessary

const mockStore = configureStore([]);

describe('RegisterProvider Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <RegisterProvider />
      </Provider>
    );
  });

  test('renders the Sign Up title', () => {
    const titleElement = screen.getByText(/Sign Up/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('allows user to type into input fields', () => {
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const mobileInput = screen.getByLabelText(/Mobile/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(mobileInput).toHaveValue('1234567890');
  });

  test('submits the form', () => {
    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    fireEvent.click(submitButton);

    // Check if the submit action was called (you can modify this to check redux action if necessary)
    // Since we don't have a mock implementation of `register`, you may not verify it here.
    expect(submitButton).toBeDisabled(); // Button should be disabled while loading
  });
});
