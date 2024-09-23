// VerificationForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import VerificationForm from '../components/VerificationForm';
import rootReducer from '../redux/reducers/rootReducer'; // Adjust the import based on your structure

const store = createStore(rootReducer);

describe('VerificationForm', () => {
  test('renders the verification form', () => {
    render(
      <Provider store={store}>
        <Router>
          <VerificationForm />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Verification Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter OTP/i)).toBeInTheDocument();
  });

  test('displays validation error for empty phone number', async () => {
    render(
      <Provider store={store}>
        <Router>
          <VerificationForm />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText(/Phone Number/i)); // Trigger validation

    expect(await screen.findByText(/Please enter a valid phone number/i)).toBeInTheDocument();
  });

  test('displays validation error for empty OTP', async () => {
    render(
      <Provider store={store}>
        <Router>
          <VerificationForm />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Enter OTP/i), { target: { value: '' } });
    fireEvent.blur(screen.getByLabelText(/Enter OTP/i)); // Trigger validation

    expect(await screen.findByText(/OTP cannot be empty/i)).toBeInTheDocument();
  });

  test('allows user to enter phone number and OTP', () => {
    render(
      <Provider store={store}>
        <Router>
          <VerificationForm />
        </Router>
      </Provider>
    );

    const phoneInput = screen.getByLabelText(/Phone Number/i);
    const otpInput = screen.getByLabelText(/Enter OTP/i);

    fireEvent.change(phoneInput, { target: { value: '+919876543210' } });
    fireEvent.change(otpInput, { target: { value: '123456' } });

    expect(phoneInput.value).toBe('+919876543210');
    expect(otpInput.value).toBe('123456');
  });
});
