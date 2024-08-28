import React, { useState } from 'react';
import './FileUpload.css'; 

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    documents: [],
    images: [],
    videos: [],
  });
  const [errors, setErrors] = useState({
    documents: '',
    images: '',
    videos: '',
  });
  const [notification, setNotification] = useState('');

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
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        showNotification(`Upload successful for ${category}`);
      })
      .catch(error => {
        console.error('Error:', error);
        showNotification('Upload failed. Please check console for details.');
      });
    });
  };

  const handleUpload = (category) => {
    const files = selectedFiles[category];
    if (files.length > 0) {
      uploadFiles(files, category);
    } else {
      alert(`No files selected for ${category}.`);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000); 
  };

  return (
    <div className="container">
      <h1>Upload Your Files</h1>

      <h2>Documents</h2>
      <input
        type="file"
        accept=".doc,.docx,.pdf"
        onChange={(e) => handleFileChange(e, 'documents')}
      />
      {errors.documents && <p>{errors.documents}</p>}
      <button onClick={() => handleUpload('documents')}>Upload Document</button>

      <h2>Profile Pictures</h2>
      <input
        type="file"
        multiple
        accept=".jpg,.jpeg,.gif"
        onChange={(e) => handleFileChange(e, 'images')}
      />
      {errors.images && <p>{errors.images}</p>}
      <button onClick={() => handleUpload('images')}>Upload Images</button>

      <h2>Video</h2>
      <input
        type="file"
        accept=".mp4,.wmv"
        onChange={(e) => handleFileChange(e, 'videos')}
      />
      {errors.videos && <p>{errors.videos}</p>}
      <button onClick={() => handleUpload('videos')}>Upload Video</button>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default FileUpload;
