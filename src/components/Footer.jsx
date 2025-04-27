import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => (
  <Box sx={{ bgcolor: '#4e2323', color: 'white', py: 6, mt: 8 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Brand and Mission */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BloodtypeIcon sx={{ fontSize: 40, color: 'error.main', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              BloodLife
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'grey.200', mb: 2 }}>
            Our mission is to connect donors and recipients, ensuring a safe and reliable blood supply for everyone in need.
          </Typography>
        </Grid>
        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
            <Link component={RouterLink} to="/donor-registration" color="inherit" underline="hover">Donor Registration</Link>
            <Link component={RouterLink} to="/emergency-request" color="inherit" underline="hover">Emergency Request</Link>
            <Link component={RouterLink} to="/information" color="inherit" underline="hover">Information</Link>
          </Box>
        </Grid>
        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Contact Us
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <EmailIcon sx={{ mr: 1, color: 'grey.200' }} />
            <Typography variant="body2">support@bloodlife.org</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon sx={{ mr: 1, color: 'grey.200' }} />
            <Typography variant="body2">+91 12345 67890</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'grey.200' }} />
            <Typography variant="body2">123, Health Street, New Delhi, India</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <IconButton color="inherit" size="small"><FacebookIcon /></IconButton>
            <IconButton color="inherit" size="small"><TwitterIcon /></IconButton>
            <IconButton color="inherit" size="small"><InstagramIcon /></IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ borderTop: '1px solid #6d3b3b', mt: 4, pt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="grey.400">
          © {new Date().getFullYear()} BloodLife. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer; 