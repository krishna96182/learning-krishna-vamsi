// ConsumerDashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ConsumerDashboard from '../components/ConsumerDashboard';

const mockStore = configureStore([]);

describe('ConsumerDashboard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categories: {
        categories: [
          { _id: '1', name: 'Electrician' },
          { _id: '2', name: 'Plumbing' },
          { _id: '3', name: 'Cleaning' },
        ],
        selectedCategory: null,
      },
    });

    render(
      <Provider store={store}>
        <ConsumerDashboard />
      </Provider>
    );
  });

  test('renders dashboard title', () => {
    const titleElement = screen.getByText(/Explore Our Categories/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders category cards', () => {
    const categoryCards = screen.getAllByRole('img');
    expect(categoryCards).toHaveLength(3); // Adjust based on the number of categories
  });

  test('opens dialog when category is clicked', () => {
    const categoryCard = screen.getByText(/Electrician/i);
    fireEvent.click(categoryCard);
    
    const dialogTitle = screen.getByText(/Services in Electrician/i);
    expect(dialogTitle).toBeInTheDocument();
  });
});
