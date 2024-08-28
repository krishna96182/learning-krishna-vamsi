import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    documents: [],
    images: [],
    videos: []
  });
  const [errors, setErrors] = useState({
    documents: '',
    images: '',
    videos: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileChange = (event, category) => {
    const files = Array.from(event.target.files);
    let validFiles = files;
    let error = '';

    if (category === 'documents' || category === 'videos') {
      if (files.length > 1) {
        error = `Only one file is allowed for ${category}.`;
        validFiles = files.slice(0, 1);
      }
    } else if (category === 'images') {
      if (files.length < 2) {
        error = 'At least two images are required.';
        validFiles = [];
      }
    }

    setErrors(prevErrors => ({ ...prevErrors, [category]: error }));
    setSelectedFiles(prevFiles => ({ ...prevFiles, [category]: validFiles }));
  };

  const uploadFiles = (files, category) => {
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://localhost:3000/uploads/${category}`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setSnackbarMessage(`Upload successful for ${category}.`);
          setOpenSnackbar(true);
        })
        .catch(error => {
          console.error('Error:', error);
          setSnackbarMessage('Upload failed. Please check console for details.');
          setOpenSnackbar(true);
        });
    });
  };

  const handleUpload = category => {
    const files = selectedFiles[category];
    if (files.length > 0) {
      uploadFiles(files, category);
    } else {
      setSnackbarMessage(`No files selected for ${category}.`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Upload Files
      </Typography>

      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Documents</Typography>
        <TextField
          type="file"
          accept=".doc,.docx,.pdf"
          onChange={e => handleFileChange(e, 'documents')}
          sx={{ marginBottom: '10px' }}
        />
        <br />
        {errors.documents && (
          <Typography color="error">{errors.documents}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload('documents')}
        >
          Upload
        </Button>
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Pictures</Typography>
        <TextField
          type="file"
          multiple
          accept=".jpg,.jpeg,.gif"
          onChange={e => handleFileChange(e, 'images')}
          sx={{ marginBottom: '10px' }}
        />
        <br />
        {errors.images && (
          <Typography color="error">{errors.images}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload('images')}
        >
          Upload
        </Button>
      </Box>

      <Box>
        <Typography variant="h6">Video</Typography>
        <TextField
          type="file"
          accept=".mp4,.wmv"
          onChange={e => handleFileChange(e, 'videos')}
          sx={{ marginBottom: '10px' }}
        />
        <br />
        {errors.videos && (
          <Typography color="error">{errors.videos}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload('videos')}
        >
          Upload
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes('failed') ? 'error' : 'success'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileUpload;