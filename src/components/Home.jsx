import React from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import TypesOfDonation from './TypesOfDonation';

const donationSteps = [
  {
    icon: <AssignmentIndIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />,
    title: 'Registration Process',
    description: 'Sign up and schedule your first with ease',
  },
  {
    icon: <FavoriteBorderIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />,
    title: 'Health Screening',
    description: "A simple check-up to ensure you're ready to donate",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />,
    title: 'Donation Day',
    description: 'Relax as our professional staff guide you through',
  },
];

const events = [
  {
    name: 'City Blood Donation Camp',
    date: '2024-07-15',
    location: 'City Hall, New Delhi',
    description: 'Join our upcoming camp and help save lives. All healthy donors are welcome!'
  },
  {
    name: 'University Blood Drive',
    date: '2024-08-02',
    location: 'ABC University, Auditorium',
    description: 'Students and staff are invited to participate in our annual blood drive.'
  },
  {
    name: 'Community Health Fair',
    date: '2024-08-20',
    location: 'Community Center, Sector 10',
    description: 'Free health check-ups and blood donation opportunity for all residents.'
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 6
          }}
        >
          <Box
            component="img"
            src="/blood-drop.svg"
            alt="Blood Donation"
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              filter: 'drop-shadow(0 0 16px rgba(211, 47, 47, 0.4))'
            }}
          />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
          >
            Welcome to BloodLife
          </Typography>
          <Typography 
            variant="h6" 
            gutterBottom 
            align="center" 
            color="text.secondary"
          >
            Save lives by donating blood or requesting emergency blood supply
          </Typography>
        </Box>
        {/* How Donation Works Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
            py: 8,
            mb: 6,
            px: 2,
          }}
        >
          <Container>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 6 }}>
              How <span style={{ color: '#d32f2f' }}>Donation</span> Works?
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {donationSteps.map((step, idx) => (
                <React.Fragment key={step.title}>
                  <Grid item xs={12} md={3.5}>
                    <Card sx={{ p: 4, borderRadius: 4, textAlign: 'center', boxShadow: 2 }}>
                      {step.icon}
                      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Card>
                  </Grid>
                  {idx < donationSteps.length - 1 && (
                    <Grid item xs={12} md={0.5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                      <ChevronRightIcon sx={{ fontSize: 48, color: '#d32f2f' }} />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
      <TypesOfDonation />
      {/* Upcoming Events Section */}
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {events.map((event, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{event.date}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{event.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PlaceIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>{event.description}</Typography>
                  <Button variant="outlined" color="primary" size="small">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="md">
        {/* ... rest of your homepage ... */}
      </Container>
    </Box>
  );
}

export default Home; 