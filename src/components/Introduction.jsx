import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Introduction() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(titleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      duration: 1,
      y: 30,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5")
    .from(imageRef.current, {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5")
    .from(buttonRef.current, {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: "power3.out"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
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
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                ref={titleRef}
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  mb: 3,
                }}
              >
                Welcome to BloodLife
              </Typography>
              <Typography
                ref={subtitleRef}
                variant="h5"
                sx={{
                  color: 'white',
                  opacity: 0.9,
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
                  mb: 4,
                }}
              >
                Join us in our mission to save lives through blood donation.
                Every drop counts, every donor matters.
              </Typography>
              <Box
                ref={buttonRef}
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/donor-registration')}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Register as Donor
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/emergency-request')}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Emergency Request
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              ref={imageRef}
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  animation: 'pulse 2s ease-in-out infinite',
                },
              }}
            >
              <Box
                component="img"
                src="/images/blood-donation-hero.svg"
                alt="Blood Donation"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' },
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Introduction; 