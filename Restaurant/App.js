import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RestaurantDetails from './RestaurantDetails';

function App() {
  return (
    <Router>
      <div>
        <h1>Restaurant Management</h1>

        <Routes>
          <Route path="/" element={<RestaurantDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;