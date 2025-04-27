import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useFadeIn, useStaggerChildren } from '../hooks/useAnimations';

const donationAmounts = [
  { value: 10, label: '$10' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 250, label: '$250' },
  { value: 500, label: '$500' },
];

const donationTypes = [
  {
    title: 'One-Time Donation',
    description: 'Make a single donation to support our cause',
    icon: '🎁',
  },
  {
    title: 'Monthly Support',
    description: 'Become a monthly donor and help save lives regularly',
    icon: '💝',
  },
  {
    title: 'Emergency Fund',
    description: 'Support emergency blood supply operations',
    icon: '🚑',
  },
];

function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const titleRef = useFadeIn();
  const cardsRef = useStaggerChildren(0.3);

  const handleAmountChange = (event) => {
    setSelectedAmount(event.target.value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
    setSelectedAmount('');
  };

  const handleDonationTypeChange = (type) => {
    setDonationType(type);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleDonate = async () => {
    setLoading(true);
    try {
      // Here you would integrate with your payment gateway
      // For example, with Stripe:
      // const response = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      //   billing_details: {
      //     name: 'Donor Name',
      //   },
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setNotification({
        open: true,
        message: 'Thank you for your donation! Your contribution will help save lives.',
        severity: 'success',
      });

      // Reset form
      setSelectedAmount('');
      setCustomAmount('');
    } catch (error) {
      setNotification({
        open: true,
        message: 'There was an error processing your donation. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          ref={titleRef}
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #d32f2f 30%, #ff5252 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Support Our Cause
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Your donation helps us save more lives through blood donation initiatives
        </Typography>
      </Box>

      <Grid 
        ref={cardsRef}
        container 
        spacing={4} 
        sx={{ mb: 6 }}
      >
        {donationTypes.map((type, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
                  {type.icon}
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  {type.title}
                </Typography>
                <Typography color="text.secondary">
                  {type.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDonationTypeChange(type.title.toLowerCase().replace(' ', '-'))}
                  sx={{
                    minWidth: '120px',
                    background: donationType === type.title.toLowerCase().replace(' ', '-')
                      ? 'linear-gradient(45deg, #d32f2f 30%, #ff5252 90%)'
                      : 'inherit',
                  }}
                >
                  Select
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Choose Donation Amount
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {donationAmounts.map((amount) => (
            <Grid item xs={4} sm={2} key={amount.value}>
              <Button
                fullWidth
                variant={selectedAmount === amount.value ? 'contained' : 'outlined'}
                onClick={() => setSelectedAmount(amount.value)}
                sx={{
                  height: '48px',
                  background: selectedAmount === amount.value
                    ? 'linear-gradient(45deg, #d32f2f 30%, #ff5252 90%)'
                    : 'inherit',
                }}
              >
                {amount.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <TextField
          fullWidth
          label="Custom Amount"
          type="number"
          value={customAmount}
          onChange={handleCustomAmountChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
          }}
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleDonate}
          disabled={loading || (!selectedAmount && !customAmount)}
          sx={{
            height: '48px',
            background: 'linear-gradient(45deg, #d32f2f 30%, #ff5252 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #b71c1c 30%, #d32f2f 90%)',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Donate ${selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ''}`
          )}
        </Button>
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

export default DonationSection; 