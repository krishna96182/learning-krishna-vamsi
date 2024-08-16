import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import axios from 'axios';
import Restaurant from './Restaurant';

const RestaurantDetails = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/restaurants');
      setRestaurants(response.data.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/restaurants/${id}`);
      fetchRestaurants();
      setSelectedRestaurant(null);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = () => {
    setIsEditing(false);
    setSelectedRestaurant(null);
    fetchRestaurants();
  };

  return (
    <Box>
      <Box mb={4}>
        <Restaurant
          initialValues={{ name: '', email: '', status: false }}
          onSubmit={handleFormSubmit}
          editMode={false}
        />
      </Box>
      <List>
        {restaurants.map((restaurant) => (
          <ListItem
            key={restaurant.id}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <ListItemText primary={restaurant.attributes.name} />
            <Box mt={1} display="flex" gap={1}>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', color: 'white' }}
                onClick={() => handleSelectRestaurant(restaurant)}
              >
                Details
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'red', color: 'white' }}
                onClick={() => handleDelete(restaurant.id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {selectedRestaurant && (
        <Box mt={4} p={2} border={1} borderColor="grey.300">
          {!isEditing ? (
            <>
              <Typography variant="h6">Restaurant Details</Typography>
              <Typography><strong>Name:</strong> {selectedRestaurant.attributes.name}</Typography>
              <Typography><strong>Email:</strong> {selectedRestaurant.attributes.email}</Typography>
              <Typography><strong>Status:</strong> {selectedRestaurant.attributes.status ? 'Active' : 'Inactive'}</Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'green', color: 'white' }}
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </>
          ) : (
            <Restaurant
              initialValues={{
                id: selectedRestaurant.id,
                name: selectedRestaurant.attributes.name,
                email: selectedRestaurant.attributes.email,
                status: selectedRestaurant.attributes.status,
              }}
              onSubmit={handleFormSubmit}
              editMode={true}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default RestaurantDetails;
