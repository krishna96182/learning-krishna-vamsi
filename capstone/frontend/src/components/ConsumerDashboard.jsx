import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import { setSelectedCategory, setSelectedService } from '../redux/actions/categoryActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

// Import local images
import electricianImg from './electrician.png';
import plumbingImg from './plumber.jpg';
import cleaningImg from './cleaning.jpg';

// Create image arrays for categories and services
const categoryImages = [cleaningImg, plumbingImg, electricianImg];
const serviceImages = [electricianImg, plumbingImg, cleaningImg];

const ConsumerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories || []);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const services = useSelector((state) => state.categories.selectedCategory?.services || []);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories'); // Fetch categories with services
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Handle category click to open dialog
  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category)); // Store selected category in Redux
    setOpen(true); // Open dialog
  };

  // Handle service click, store it in Redux, and navigate to ProviderList component
  const handleServiceClick = (service) => {
    dispatch(setSelectedService(service)); // Store selected service in Redux
    navigate(`/providers/${service._id}`); // Navigate to ProviderList with service _id
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      {/* Centering the heading */}
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Typography variant="h4" gutterBottom>Explore Our Categories</Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={1}> {/* Reduce spacing here */}
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
              <Card 
                onClick={() => handleCategoryClick(category)} 
                style={{
                  cursor: 'pointer', 
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                  padding: 0, // Remove padding from card
                  margin: 0 // Remove margin from card
                }}
              >
                <CardMedia
                  component="img"
                  height="250" // Adjust the height
                  width="250" // Adjust the width
                  image={categoryImages[index % categoryImages.length]} // Rotate through category images
                  alt={category.name}
                  style={{ objectFit: 'cover', borderRadius: '4px' }} // Ensure image fits without distortion
                />
                <CardContent style={{ padding: '0' }}> {/* Remove padding from CardContent */}
                  <Typography variant="h6" align="center">{category.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Services in {selectedCategory?.name}
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}> {/* Reduce spacing here as well */}
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                <Card 
                  onClick={() => handleServiceClick(service)} 
                  style={{
                    cursor: 'pointer', 
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                    padding: 0, // Remove padding from card
                    margin: 0 // Remove margin from card
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250" // Adjust the height
                    width="250" // Adjust the width
                    image={serviceImages[index % serviceImages.length]} // Rotate through service images
                    alt={service.name}
                    style={{ objectFit: 'cover', borderRadius: '4px' }} // Ensure image fits without distortion
                  />
                  <CardContent style={{ padding: '0' }}> {/* Remove padding from CardContent */}
                    <Typography variant="h6" align="center">{service.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsumerDashboard;
