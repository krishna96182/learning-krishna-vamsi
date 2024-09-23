import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadImagesAction,
  verifyOtpAction,
  updateBookingStatusAction,
} from '../redux/actions/verificationActions';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PreviewIcon from '@mui/icons-material/Preview';
import OtpIcon from '@mui/icons-material/Lock';

const VerificationForm = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const { otpValidated, verificationError, bookingStatusUpdated } = useSelector((state) => state);
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otpCode, setOtpCode] = useState('');
  const [previewImages, setPreviewImages] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${bookingId}`);
        const bookingDetails = response.data;
        setPhoneNumber(`+91${bookingDetails.consumer.mobile.replace('+91', '')}`);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleImage1Change = (e) => setImage1(e.target.files[0]);
  const handleImage2Change = (e) => setImage2(e.target.files[0]);
  const handleOtpCodeChange = (e) => setOtpCode(e.target.value);

  const handleUploadImages = () => {
    if (image1 && image2 && phoneNumber) {
      dispatch(uploadImagesAction(image1, image2, phoneNumber, bookingId));
    }
  };

  const handleVerifyOtp = () => {
    if (validateFields()) {
      dispatch(verifyOtpAction(phoneNumber, otpCode));
    }
  };

  const handleSubmit = () => {
    if (bookingId) {
      dispatch(updateBookingStatusAction(bookingId, 'completed'));
      navigate('/provider/dashboard');
    }
  };

  const handlePreviewImages = () => {
    setPreviewImages(!previewImages);
  };

  const validateFields = () => {
    const errors = {};
    if (!phoneNumber || phoneNumber.length < 10) {
      errors.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!otpCode) {
      errors.otpCode = 'OTP cannot be empty.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (otpValidated) {
      alert('OTP is verified!');
    }
  }, [otpValidated]);

  useEffect(() => {
    if (bookingStatusUpdated) {
      alert('Booking status updated to complete!');
    }
  }, [bookingStatusUpdated]);

  useEffect(() => {
    if (verificationError) {
      alert(verificationError);
    }
  }, [verificationError]);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Verification Form
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Phone Number Input */}
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            error={!!validationErrors.phoneNumber}
            helperText={validationErrors.phoneNumber}
          />

          {/* Image Upload */}
          <Box>
            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<PhotoCamera />}
              sx={{ backgroundColor: 'orange' }}
            >
              Upload Image 1
              <input hidden accept="image/*" type="file" onChange={handleImage1Change} />
            </Button>

            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<PhotoCamera />}
              sx={{ backgroundColor: 'orange', ml: 2 }}
            >
              Upload Image 2
              <input hidden accept="image/*" type="file" onChange={handleImage2Change} />
            </Button>
          </Box>

          {/* Preview Button */}
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={handlePreviewImages}
            sx={{ color: 'orange', borderColor: 'orange' }}
          >
            {previewImages ? 'Hide Preview' : 'Preview Images'}
          </Button>

          {previewImages && (
            <Box>
              {image1 && <img src={URL.createObjectURL(image1)} alt="Image 1" width={200} style={{ marginRight: 10 }} />}
              {image2 && <img src={URL.createObjectURL(image2)} alt="Image 2" width={200} />}
            </Box>
          )}

          {/* Upload Images Button */}
          <Button
            variant="contained"
            onClick={handleUploadImages}
            sx={{ backgroundColor: 'orange' }}
            startIcon={<CheckCircleIcon />}
          >
            Upload Images
          </Button>

          {/* OTP Input */}
          <TextField
            label="Enter OTP"
            value={otpCode}
            onChange={handleOtpCodeChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <OtpIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            error={!!validationErrors.otpCode}
            helperText={validationErrors.otpCode}
          />

          {/* Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              onClick={handleVerifyOtp}
              sx={{ backgroundColor: 'orange' }}
              startIcon={<CheckCircleIcon />}
            >
              Verify OTP
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: 'orange' }}
              startIcon={<CheckCircleIcon />}
            >
              Submit
            </Button>
          </Box>

          {verificationError && <Typography color="error">{verificationError}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};

export default VerificationForm;
