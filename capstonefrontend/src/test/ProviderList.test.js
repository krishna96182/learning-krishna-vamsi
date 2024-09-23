// ProviderList.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ProviderList from '../components/ProviderList';
import rootReducer from '../redux/reducers/rootReducer'; // Adjust the import based on your structure
import axios from 'axios';

jest.mock('axios');

const store = createStore(rootReducer);

describe('ProviderList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          _id: '1',
          username: 'Provider One',
          mobile: '1234567890',
          averageRating: 4,
          services: [{ _id: 'serviceId1', name: 'Service 1', price: '$100' }],
        },
        {
          _id: '2',
          username: 'Provider Two',
          mobile: '0987654321',
          averageRating: 5,
          services: [{ _id: 'serviceId1', name: 'Service 1', price: '$150' }],
        },
      ],
    });
  });

  test('renders the provider list', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProviderList />
        </Router>
      </Provider>
    );

    expect(await screen.findByText(/Providers for Service/i)).toBeInTheDocument();
    expect(await screen.findByText(/Provider One/i)).toBeInTheDocument();
    expect(await screen.findByText(/Provider Two/i)).toBeInTheDocument();
  });

  test('shows login prompt when a provider is clicked and not logged in', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProviderList />
        </Router>
      </Provider>
    );

    fireEvent.click(await screen.findByText(/Provider One/i));

    expect(await screen.findByText(/You are not logged in/i)).toBeInTheDocument();
    expect(screen.getByText(/Please log in to continue./i)).toBeInTheDocument();
  });

  test('calls the API to fetch providers', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProviderList />
        </Router>
      </Provider>
    );

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/api/auth/providers?serviceId='));
  });
});
