import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Link as RouterLink } from 'react-router-dom';

const InfoSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const Information = () => {
  const eligibilityCriteria = [
    'Age between 18-65 years',
    'Weight at least 45 kg',
    'Hemoglobin level at least 12.5 g/dl',
    'No major surgery in last 6 months',
    'No tattoos or piercings in last 6 months',
    'No history of blood-borne diseases',
    'Not pregnant or breastfeeding',
    'Not on certain medications'
  ];

  const donationProcess = [
    'Registration and basic health check',
    'Medical history review',
    'Physical examination',
    'Blood donation (8-10 minutes)',
    'Rest and refreshments',
    'Post-donation care instructions'
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            color: 'primary.main',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            fontWeight: 'bold'
          }}
        >
          Blood Donation Information
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography variant="h4" gutterBottom color="primary">
                Eligibility Criteria
              </Typography>
              <List>
                {eligibilityCriteria.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </InfoSection>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoSection>
              <Typography variant="h4" gutterBottom color="primary">
                Donation Process
              </Typography>
              <List>
                {donationProcess.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </InfoSection>
          </Grid>
        </Grid>

        <InfoSection>
          <Typography variant="h4" gutterBottom color="primary">
            Important Information
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Blood can be stored for up to 42 days"
                secondary="Regular donations are needed to maintain supply"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <WarningIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary="One donation can save up to three lives"
                secondary="Your blood is separated into components: red cells, plasma, and platelets"
              />
            </ListItem>
          </List>
        </InfoSection>

        <Box
          sx={{
            mt: 6,
            p: 4,
            bgcolor: 'primary.main',
            borderRadius: 2,
            textAlign: 'center',
            color: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Your blood donation can save lives. Join us in our mission to ensure a stable blood supply for those in need.
          </Typography>
          <Button
            component={RouterLink}
            to="/donor-registration"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Register as a Donor
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Information; 