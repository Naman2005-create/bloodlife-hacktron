import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailConfig';
import { useFadeIn, useStaggerChildren } from '../hooks/useAnimations';

const bloodTypes = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

function DonorRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    bloodType: '',
    phone: '',
    email: '',
    lastDonationDate: null,
    location: { lat: '', lng: '' }
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Animation refs
  const titleRef = useFadeIn();
  const formRef = useStaggerChildren(0.3);

  useEffect(() => {
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setNotification({
            open: true,
            message: 'Error getting location. Please enable location services.',
            severity: 'error'
          });
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      lastDonationDate: date
    }));
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send email to admin
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          to_email: EMAIL_CONFIG.ADMIN_EMAIL,
          from_name: formData.name,
          from_email: formData.email,
          message: `
            New Donor Registration:
            Name: ${formData.name}
            Blood Type: ${formData.bloodType}
            Phone: ${formData.phone}
            Email: ${formData.email}
            Last Donation Date: ${formData.lastDonationDate ? formData.lastDonationDate.toLocaleDateString() : 'Not specified'}
            Location: Latitude ${formData.location.lat}, Longitude ${formData.location.lng}
          `,
          subject: 'New Blood Donor Registration'
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );

      // Send confirmation email to donor
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          to_email: formData.email,
          from_name: 'Blood Donation System',
          message: `
            Thank you for registering as a blood donor!
            Your registration details:
            Name: ${formData.name}
            Blood Type: ${formData.bloodType}
            We will contact you when there's a need for your blood type.
          `,
          subject: 'Blood Donor Registration Confirmation'
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setNotification({
        open: true,
        message: 'Registration successful! Check your email for confirmation.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        bloodType: '',
        phone: '',
        email: '',
        lastDonationDate: null,
        location: { lat: '', lng: '' }
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        open: true,
        message: 'Error sending registration. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography 
          ref={titleRef}
          variant="h4" 
          component="h1" 
          gutterBottom
        >
          Donor Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid 
            ref={formRef}
            container 
            spacing={3}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Blood Type"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
              >
                {bloodTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Last Donation Date"
                  value={formData.lastDonationDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Location (Auto-detected)
              </Typography>
              <TextField
                fullWidth
                disabled
                value={`Latitude: ${formData.location.lat}, Longitude: ${formData.location.lng}`}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Register as Donor
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DonorRegistration; 