import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Container, Card, CardContent, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Styled components for layout and styling
const CustomButton = styled(Button)({
  backgroundColor: '#ff9800',
  color: '#fff',
  padding: '10px',
  borderRadius: '5px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#e68900',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#10181B',
    borderRadius: '5px',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
    fontSize: '14px',
  },
  '& .MuiOutlinedInput-root': {
    padding: '8px',
    fontSize: '16px',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px',
    color: 'white',
  },
});

const CustomSelect = styled(Select)({
  '& .MuiInputBase-root': {
    backgroundColor: '#10181B',
    color: 'white',
    borderRadius: '5px',
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
    fontSize: '14px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0px 0px 5px rgba(255, 255, 255, 0.8)',
    },
  },
  '& .MuiSelect-icon': {
    color: 'white', // Change dropdown arrow color
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set input text color
  },
});


const RegisterProvider = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobile: '',
    services: [{ service: '', price: '' }],
    categories: [],
    role: 'provider',
  });

  const [categories, setCategories] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoriesAndServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        const categoryData = response.data;

        const extractedCategories = categoryData.map((cat) => ({
          id: cat._id,
          name: cat.name,
          services: cat.services.map((service) => ({
            id: service._id,
            name: service.name,
          })),
        }));

        setCategories(extractedCategories);
      } catch (error) {
        console.error('Error fetching categories and services:', error);
      }
    };

    fetchCategoriesAndServices();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;

    const selectedServices = categories
      .filter((category) => category.name === selectedCategoryName)
      .map((category) => category.services)
      .flat();

    setAvailableServices(selectedServices);

    const selectedCategoryId = categories.find((category) => category.name === selectedCategoryName)?.id;

    setFormData({
      ...formData,
      categories: [selectedCategoryId],
      services: [{ service: '', price: '' }],
    });

    setSelectedCategoryName(selectedCategoryName);
  };

  const handleServiceChange = (index, key, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][key] = value;

    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { service: '', price: '' }],
    });
  };

  const handleRemoveService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      services: updatedServices,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(register(formData));
      navigate('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: '-50px',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '100%',
          padding: '20px',
          backgroundColor: '#10181B', // Updated background color
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center', }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Box mb={3}>
              <CustomTextField
                fullWidth
                variant="outlined"
                label="Username"
                placeholder="Enter your username"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Box>
            <Box mb={3}>
              <CustomTextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                placeholder="Enter your password"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Box>
            <Box mb={2}>
              <CustomTextField
                fullWidth
                variant="outlined"
                label="Mobile"
                placeholder="Enter your mobile number"
                InputProps={{
                  startAdornment: <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: 'white' }} />,
                }}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
              />
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel style={{ color: '#fff' }}>Category</InputLabel>
              <CustomSelect value={selectedCategoryName} onChange={handleCategoryChange}>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>

            {formData.services.map((serviceData, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <FormControl fullWidth margin="normal" sx={{ flex: 1 }}>
                  <InputLabel style={{ color: '#fff' }}>Service</InputLabel>
                  <CustomSelect value={serviceData.service} onChange={(e) => handleServiceChange(index, 'service', e.target.value)}>
                    {availableServices.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </FormControl>
                <Box sx={{ width: '20px' }}></Box> {/* Adding space between inputs */}
                <CustomTextField
                  sx={{ flex: 1 }}
                  variant="outlined"
                  label="Price"
                  placeholder="Enter price"
                  value={serviceData.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                />
                {index === 0 && (
                  <IconButton onClick={handleAddService}>
                    <AddIcon sx={{ color: 'white' }} />
                  </IconButton>
                )}
                {index > 0 && (
                  <IconButton onClick={() => handleRemoveService(index)}>
                    <RemoveIcon sx={{ color: 'white' }} />
                  </IconButton>
                )}
              </div>
            ))}

            <CustomButton fullWidth type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </CustomButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterProvider;
