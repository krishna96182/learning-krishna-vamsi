import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Grid,
    Box,
    Container,
    Card,
    Typography
} from '@mui/material';

const AdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [openServiceDialog, setOpenServiceDialog] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', services: [] });
    const [newService, setNewService] = useState({ name: '', description: '' });

    // Fetch categories and services on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get('http://localhost:3000/api/categories');
                setCategories(categoryResponse.data);
                const serviceResponse = await axios.get('http://localhost:3000/api/services');
                setServices(serviceResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    // Handle changes in the new category form
    const handleCategoryChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleServiceSelect = (event) => {
        setNewCategory({
            ...newCategory,
            services: event.target.value
        });
    };

    const handleServiceChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    // Create a new category
    const createCategory = async () => {
        try {
            await axios.post('http://localhost:3000/api/categories', newCategory);
            setOpenCategoryDialog(false);
            // Refresh categories
            const response = await axios.get('http://localhost:3000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error creating category', error);
        }
    };

    // Create a new service
    const createService = async () => {
        try {
            await axios.post('http://localhost:3000/api/services', newService);
            setOpenServiceDialog(false);
            // Refresh services
            const response = await axios.get('http://localhost:3000/api/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error creating service', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ backgroundColor: '#000', color: '#fff', padding: 4 }}>
                <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                    Admin Panel
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => setOpenCategoryDialog(!openCategoryDialog)}
                            sx={{ fontSize: '16px', padding: '10px 20px', backgroundColor: 'orange', color: '#fff' }}
                        >
                            {openCategoryDialog ? 'Close Category' : 'Create Category'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => setOpenServiceDialog(!openServiceDialog)}
                            sx={{ fontSize: '16px', padding: '10px 20px', backgroundColor: 'orange', color: '#fff' }}
                        >
                            {openServiceDialog ? 'Close Service' : 'Create Service'}
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            {/* Create Category Dialog */}
            <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ backgroundColor: '#000', color: '#fff' }}>Create Category</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#000', color: '#fff' }}>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newCategory.name}
                            onChange={handleCategoryChange}
                            InputProps={{
                                style: { color: 'white', borderColor: 'white' },
                                classes: {
                                    notchedOutline: { borderColor: 'white' }
                                }
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newCategory.description}
                            onChange={handleCategoryChange}
                            multiline
                            rows={3}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel sx={{ color: 'white' }}>Services</InputLabel>
                            <Select
                                multiple
                                value={newCategory.services}
                                onChange={handleServiceSelect}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <span key={value}>{services.find(s => s._id === value)?.name}, </span>
                                        ))}
                                    </div>
                                )}
                                sx={{ color: 'white' }}
                            >
                                {services.map((service) => (
                                    <MenuItem key={service._id} value={service._id}>
                                        <Checkbox checked={newCategory.services.indexOf(service._id) > -1} />
                                        <ListItemText primary={service.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#000', color: '#fff' }}>
                    <Button onClick={() => setOpenCategoryDialog(false)} sx={{ color: 'orange' }}>
                        Cancel
                    </Button>
                    <Button onClick={createCategory} sx={{ backgroundColor: 'orange', color: '#fff' }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Service Dialog */}
            <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ backgroundColor: '#000', color: '#fff' }}>Create Service</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#000', color: '#fff' }}>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Service Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newService.name}
                            onChange={handleServiceChange}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newService.description}
                            onChange={handleServiceChange}
                            multiline
                            rows={3}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#000', color: '#fff' }}>
                    <Button onClick={() => setOpenServiceDialog(false)} sx={{ color: 'orange' }}>
                        Cancel
                    </Button>
                    <Button onClick={createService} sx={{ backgroundColor: 'orange', color: '#fff' }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminPage;
