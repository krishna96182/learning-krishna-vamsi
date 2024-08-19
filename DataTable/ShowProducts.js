import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import DataTable from 'react-data-table-component';
import { Button, Typography, Container, Paper, Box, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: lightBlue[50],
    },
    text: {
      primary: '#000000',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 16,
          marginBottom: 16,
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginRight: 8,
          '&.MuiButton-containedError': {
            backgroundColor: '#d32f2f',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#c62828',
            },
          },
        },
      },
    },
  },
});

function ShowProducts() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    displayProducts();
  }, []);

  useEffect(() => {
    if (id) {
      viewProductDetails(id);
    }
  }, [id]);

  useEffect(() => {
    handleSearch();
  }, [data, search]);

  const displayProducts = () => {
    const url = "http://localhost:3000/api/v1/products";
    axios.get(url)
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching products.");
      });
  };

  const viewProductDetails = (productId) => {
    axios.get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        navigate(`/ShowProducts/${productId}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteData = (productId) => {
    axios.delete(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        displayProducts();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const formatCreatedAt = (createdAt) => {
    return moment.utc(createdAt).tz('Asia/Kolkata').format('DD-MMM-YY');
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true, style: { color: 'black' } },
    { name: 'Excerpt', selector: row => row.excerpt, sortable: true, style: { color: 'black' } },
    {
      name: 'Actions',
      cell: row => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => deleteData(row._id)}
          style={{ textTransform: 'none' }}
        >
          Delete
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      style: { color: 'black' },
    },
  ];

  const handleSearch = () => {
    console.log('Search Input:', search);
    console.log('All Products:', data);

    const lowercasedFilter = search.toLowerCase();
    const filtered = data.filter(product =>
      product.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredData(filtered);

    console.log('Filtered Data:', filtered);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Display All Products
        </Typography>
        <Paper elevation={3}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2} p={2}>
            <TextField
              placeholder="Search"
              size="small"
              onChange={handleSearchChange}
              value={search}
              style={{ width: '300px' }}
            />
          </Box>
        </Paper>
        <Paper elevation={3}>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={4}
            paginationRowsPerPageOptions={[4, 10, 25, 50]}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={({ data }) => (
              <Paper style={{ padding: 16, marginTop: 8 }}>
                <Typography variant="body1"><b>Code:</b> {data.code}</Typography>
                <Typography variant="body1"><b>Name:</b> {data.name}</Typography>
                <Typography variant="body1"><b>Excerpt:</b> {data.excerpt}</Typography>
                <Typography variant="body1"><b>Category:</b> {data.category.name}</Typography>
                <Typography variant="body1"><b>Status:</b> {data.status ? 'True' : 'False'}</Typography>
                <Typography variant="body1"><b>Price:</b> {data.price}</Typography>
                <Typography variant="body1"><b>Created At:</b> {formatCreatedAt(data.created_at)}</Typography>
              </Paper>
            )}
            highlightOnHover
            pointerOnHover
            customStyles={{
              rows: {
                style: {
                  minHeight: '72px',
                  marginBottom: '8px',
                },
              },
              headCells: {
                style: {
                  fontSize: '16px',
                  backgroundColor: '#e0f7fa',
                  fontWeight: 600,
                  color: 'black',
                },
              },
              cells: {
                style: {
                  fontSize: '14px',
                  color: 'black',
                },
              },
              pagination: {
                style: {
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'center',
                },
              },
              paginationButtons: {
                style: {
                  borderRadius: '4px',
                  margin: '0 2px',
                },
              },
              paginationInput: {
                style: {
                  borderRadius: '4px',
                },
              },
              expandableRows: {
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                },
              },
              expanderButton: {
                style: {
                  fontSize: '24px',
                },
              },
            }}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default ShowProducts;