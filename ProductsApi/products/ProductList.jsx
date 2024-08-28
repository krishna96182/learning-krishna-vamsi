import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Typography,
  Container,
  Box
} from '@mui/material';
import DataTable from 'react-data-table-component';
import api from '../Api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price}`,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Availability',
      selector: (row) => row.availability,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Box display="flex" justifyContent="space-between">
          <Button
            component={Link}
            to={`/product/${row._id}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginRight: 1 }}
          >
            View
          </Button>
          <Button
            component={Link}
            to={`/product/edit/${row._id}`}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteProduct(row._id)}
            variant="outlined"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </Box>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '250px',
    },
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingY: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <DataTable
          columns={columns}
          data={products}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          customStyles={{
            table: {
              style: {
                minWidth: '600px',
              },
            },
            headCells: {
              style: {
                fontSize: '16px',
                fontWeight: 'bold',
              },
            },
            cells: {
              style: {
                fontSize: '14px',
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ProductList;