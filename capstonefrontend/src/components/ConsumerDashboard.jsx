import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import { setSelectedCategory, setSelectedService } from '../redux/actions/categoryActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Footer from '../Footer';

// Import local images
import electricianImg from '../assets/electrician.png';
import plumbingImg from '../assets/plumber.jpg';
import cleaningImg from '../assets/cleaning.jpg';
import repairImg from '../assets/repair.jpg';
import salonImg from '../assets/salon.jpg';
import mensalonImg from '../assets/mensalon.jpg';
import homerepairImg from '../assets/homerepair.jpg';
import painterImg from '../assets/painter.jpg';
import bathroomImg from '../assets/bathroom.jpg';
import kitchenImg from '../assets/kitchen.png';
import homecleaningImg from '../assets/homecleaning.jpg';
import sofacleaningImg from '../assets/sofacleaning.jpg';
import acrepairImg from '../assets/acrepair.jpg';

const categoryImages = [cleaningImg, repairImg, salonImg, mensalonImg, homerepairImg, painterImg];
const serviceImages = [bathroomImg, kitchenImg, homecleaningImg, sofacleaningImg, acrepairImg, electricianImg, plumbingImg, cleaningImg];

const ConsumerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.categories || []);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const services = useSelector((state) => state.categories.selectedCategory?.services || []);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const servicesPerPage = 3;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    setOpen(true);
  };

  const handleServiceClick = (service) => {
    dispatch(setSelectedService(service));
    navigate(`/providers/${service._id}`);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(0);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - servicesPerPage + services.length) % services.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + servicesPerPage) % services.length);
  };

  const visibleServices = services.slice(currentIndex, currentIndex + servicesPerPage);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <Typography variant="h4" gutterBottom>Explore Our Categories</Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}> {/* Increased spacing to 2 */}
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
              <Card 
                onClick={() => handleCategoryClick(category)} 
                style={{
                  cursor: 'pointer', 
                  backgroundColor: '#000',  // Black card color
                  color: '#fff',  // White text color
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  width="250"
                  image={categoryImages[index % categoryImages.length]} 
                  alt={category.name}
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
                <CardContent style={{ padding: '0' }}>
                  <Typography variant="h6" align="center" style={{ color: '#fff' }}>
                    {category.name}
                  </Typography>
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
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton onClick={handlePrevClick}>
              <ArrowBackIosIcon />
            </IconButton>

            <Grid container spacing={5} justifyContent="center"> {/* Increased spacing to 2 */}
              {visibleServices.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                  <Card 
                    onClick={() => handleServiceClick(service)} 
                    style={{
                      cursor: 'pointer', 
                      backgroundColor: '#000',  // Black card color
                      color: '#fff',  // White text color
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      width="250"
                      image={serviceImages[(currentIndex + index) % serviceImages.length]} 
                      alt={service.name}
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <CardContent style={{ padding: '0' }}>
                      <Typography variant="h6" align="center" style={{ color: '#fff' }}>
                        {service.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <IconButton onClick={handleNextClick}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
      <br />
      <Footer />
    </div>
  );
};

export default ConsumerDashboard;
