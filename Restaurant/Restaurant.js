import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const Restaurant = ({ initialValues, onSubmit, editMode }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Restaurant name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    status: Yup.boolean().required('Status is required'),
  });

  const handleSubmit = async (values) => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:1337/api/restaurants/${values.id}`, { data: values });
      } else {
        await axios.post('http://localhost:1337/api/restaurants', { data: values });
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <Box mb={2}>
            <Field
              name="name"
              as={TextField}
              label="Restaurant Name"
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="email"
              as={TextField}
              label="Email"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.status}
                  onChange={(e) => setFieldValue('status', e.target.checked)}
                />
              }
              label="Status"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: 'green', color: 'white' }}
          >
            {editMode ? 'Update' : 'Add'} Restaurant
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Restaurant;
