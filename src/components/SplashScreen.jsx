import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Grid } from '@mui/material';
import { useFadeIn, useScaleIn, useStaggerChildren } from '../hooks/useAnimations';
import VoiceAssistant from './VoiceAssistant';

function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const titleRef = useFadeIn();
  const subtitleRef = useFadeIn(0.3);
  const iconRef = useScaleIn();
  const featuresRef = useStaggerChildren(0.2);

  useEffect(() => {
    // Auto-play voice introduction after a short delay
    const timer = setTimeout(() => {
      const speech = new SpeechSynthesisUtterance();
      speech.text = 'Welcome to BloodLife! We are a platform dedicated to saving lives through blood donation.';
      speech.rate = 0.8;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    }, 1000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setShowSplash(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Show splash screen for 30 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 30000);

    return () => {
      window.speechSynthesis.cancel();
      clearTimeout(timer);
      clearTimeout(splashTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  const features = [
    {
      icon: '🩸',
      title: 'Blood Donation',
      description: 'Join our network of life-saving donors'
    },
    {
      icon: '🚑',
      title: 'Emergency Response',
      description: 'Quick access to blood in critical situations'
    },
    {
      icon: '💝',
      title: 'Community Support',
      description: 'Building a stronger, healthier community'
    }
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        opacity: showSplash ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.2)', opacity: 0.8 },
            '100%': { transform: 'scale(1)', opacity: 0.5 },
          },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          ref={iconRef}
          component="img"
          src="/blood-drop.svg"
          alt="Blood Donation Logo"
          sx={{
            width: 120,
            height: 120,
            mb: 4,
            filter: 'drop-shadow(0 0 16px rgba(52, 152, 219, 0.4))',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1) rotate(0deg)',
                filter: 'drop-shadow(0 0 16px rgba(52, 152, 219, 0.4))',
              },
              '50%': {
                transform: 'scale(1.1) rotate(5deg)',
                filter: 'drop-shadow(0 0 24px rgba(52, 152, 219, 0.6))',
              },
              '100%': {
                transform: 'scale(1) rotate(0deg)',
                filter: 'drop-shadow(0 0 16px rgba(52, 152, 219, 0.4))',
              },
            },
          }}
        />
        <Typography
          ref={titleRef}
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            color: 'white',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            mb: 2,
            background: 'linear-gradient(45deg, #3498db, #2ecc71)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            '@keyframes gradient': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          }}
        >
          Welcome to BloodLife
        </Typography>
        <Typography
          ref={subtitleRef}
          variant="h6"
          align="center"
          sx={{
            color: 'white',
            opacity: 0.9,
            textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
            mb: 6,
          }}
        >
          Connecting blood donors with those in need
        </Typography>

        <Grid 
          ref={featuresRef}
          container 
          spacing={4} 
          sx={{ mb: 6 }}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '3rem',
                    mb: 2,
                    animation: 'float 3s ease-in-out infinite',
                    '@keyframes float': {
                      '0%': { transform: 'translateY(0px) rotate(0deg)' },
                      '50%': { transform: 'translateY(-10px) rotate(5deg)' },
                      '100%': { transform: 'translateY(0px) rotate(0deg)' },
                    },
                  }}
                >
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    mb: 1,
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    opacity: 0.8,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <CircularProgress
            size={40}
            thickness={4}
            sx={{
              color: '#3498db',
              filter: 'drop-shadow(0 0 8px rgba(52, 152, 219, 0.3))',
              mb: 2,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              opacity: 0.8,
              textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
            }}
          >
            Loading in {timeLeft} seconds...
          </Typography>
        </Box>
      </Container>
      <VoiceAssistant />
    </Box>
  );
}

export default SplashScreen; 