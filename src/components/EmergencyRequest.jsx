import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from '@mui/material';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/emailConfig';
import { useFadeIn, useStaggerChildren } from '../hooks/useAnimations';

const bloodTypes = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const urgencyLevels = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' }
];

function EmergencyRequest() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    patientName: '',
    bloodType: '',
    urgencyLevel: '',
    location: '',
    contactPhone: '',
    contactEmail: '',
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Animation refs
  const titleRef = useFadeIn();
  const formRef = useStaggerChildren(0.3);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          from_name: formData.hospitalName,
          from_email: formData.contactEmail,
          message: `
            Emergency Blood Request:
            Hospital/Patient Name: ${formData.hospitalName}
            Patient Name: ${formData.patientName}
            Blood Type Needed: ${formData.bloodType}
            Urgency Level: ${formData.urgencyLevel}
            Location: ${formData.location}
            Contact Phone: ${formData.contactPhone}
            Contact Email: ${formData.contactEmail}
          `,
          subject: `URGENT: Blood Request - ${formData.bloodType}`
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );

      // Send confirmation email to requester
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          to_email: formData.contactEmail,
          from_name: 'Blood Donation System',
          message: `
            Your emergency blood request has been received:
            Hospital/Patient Name: ${formData.hospitalName}
            Patient Name: ${formData.patientName}
            Blood Type Needed: ${formData.bloodType}
            Urgency Level: ${formData.urgencyLevel}
            Location: ${formData.location}
            
            We will contact you shortly with potential donors.
          `,
          subject: 'Emergency Blood Request Confirmation'
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setNotification({
        open: true,
        message: 'Request submitted successfully! Check your email for confirmation.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        hospitalName: '',
        patientName: '',
        bloodType: '',
        urgencyLevel: '',
        location: '',
        contactPhone: '',
        contactEmail: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        open: true,
        message: 'Error submitting request. Please try again.',
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
          Emergency Blood Request
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
                label="Hospital/Patient Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Blood Type Needed</InputLabel>
                <Select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  label="Blood Type Needed"
                >
                  {bloodTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Urgency Level</InputLabel>
                <Select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  label="Urgency Level"
                >
                  {urgencyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter hospital or patient location"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
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
                  Submit Emergency Request
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

export default EmergencyRequest; 