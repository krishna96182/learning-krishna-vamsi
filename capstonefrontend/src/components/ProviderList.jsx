import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';

const ProviderList = () => {
  const { serviceId } = useParams(); // Extract serviceId from URL params
  const [providers, setProviders] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [open, setOpen] = useState(false); // State to handle popup visibility
  const navigate = useNavigate();

  // Fetch providers based on the selected serviceId
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/providers?serviceId=${serviceId}`);
        setProviders(response.data);

        // If providers are found, extract the service name from the first provider
        if (response.data.length > 0) {
          const provider = response.data[0];
          const matchedService = provider.services.find(service => service._id === serviceId);

          if (matchedService) {
            setServiceName(matchedService.name); // Set the service name
          }
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
    
    // Check login status (for example, check if token exists in localStorage)
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, [serviceId]);

  // Handle provider selection
  const handleProviderSelect = (provider) => {
    if (isLoggedIn) {
      // If logged in, navigate to the booking page
      navigate('/booking', { state: { provider } }); // Pass provider details via state
    } else {
      // If not logged in, show the login prompt popup
      setOpen(true);
    }
  };

  // Close the popup
  const handleClose = () => {
    setOpen(false);
  };

  // Redirect to login page
  const handleLogin = () => {
    navigate('/login');
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} style={{ color: i < rating ? '#ff9800' : '#e0e0e0' }} />
      );
    }
    return stars;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginTop: '50px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom align="center">
        Providers for Service
      </Typography>
      
      {providers.length > 0 ? (
        <List>
          {providers.map((provider) => {
            const matchedService = provider.services.find(
              service => service.service._id === serviceId); // Find the matching service for each provider
            return (
              <ListItem 
                button 
                key={provider._id} 
                onClick={() => handleProviderSelect(provider)} 
                style={{ 
                  marginBottom: '15px', 
                  backgroundColor: '#10181B', // Changed card color
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '10px', 
                  color: 'white' // Set text color to white for better contrast
                }}
              >
                <PersonIcon style={{ marginRight: '15px', color: '#ff9800' }} />
                <ListItemText 
                  primary={provider.username} 
                  secondary={
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" style={{ marginBottom: '5px', color: 'white' }}>
                        {`Phone: ${provider.mobile}`}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: '5px', color: 'white' }}>
                        {matchedService && `Price: ${matchedService.price}`}
                      </Typography>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {renderStars(provider.averageRating)}
                      </div>
                    </div>
                  } 
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography align="center" style={{ color: 'white' }}>
          No providers available for this service.
        </Typography>
      )}

      {/* Popup Dialog for Login Prompt */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ style: { minWidth: '400px', padding: '20px' } }} // Adjusting size and padding
      >
        <DialogTitle>{"You are not logged in"}</DialogTitle>
        <DialogContent>
          <Typography>Please log in to continue.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary" variant="contained" style={{ minWidth: '100px' }}>
            Login
          </Button>
          <Button onClick={handleClose} color="secondary" variant="outlined" style={{ minWidth: '100px' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProviderList;
