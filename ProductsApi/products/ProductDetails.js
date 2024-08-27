import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import api from '../api';

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5">Loading...</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="sm"
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                paddingY: 4 
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 600 }}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Price: ${product.price}
                        </Typography>
                        <Typography variant="body1">
                            Availability: {product.availability}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default ProductDetails;
