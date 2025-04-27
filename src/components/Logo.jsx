import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFadeIn, useScaleIn } from '../hooks/useAnimations';

function Logo() {
  const logoRef = useScaleIn();
  const textRef = useFadeIn(0.3);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        position: 'relative',
        padding: '8px 16px',
        borderRadius: '12px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .logo-glow': {
            opacity: 1,
            transform: 'scale(1.1) rotate(5deg)',
            filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))',
          },
          '& .logo-text': {
            color: '#ffffff',
            transform: 'translateX(5px)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          },
          '& .logo-underline': {
            transform: 'scaleX(1)',
            opacity: 1,
          }
        }
      }}
    >
      <Box
        ref={logoRef}
        component="img"
        src="/blood-drop.svg"
        alt="Blood Donation Logo"
        className="logo-glow"
        sx={{
          width: 40,
          height: 40,
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
          transition: 'all 0.3s ease-in-out',
          opacity: 0.9,
          transform: 'rotate(0deg)',
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography
          ref={textRef}
          variant="h6"
          component="div"
          className="logo-text"
          sx={{
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#ffffff',
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            display: 'inline-block',
            letterSpacing: '0.5px',
            fontFamily: '"Clash Display", sans-serif',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(8px)',
              opacity: 0.5,
              zIndex: -1,
            }
          }}
        >
          BloodLife
        </Typography>
        <Box
          className="logo-underline"
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
            transform: 'scaleX(0)',
            opacity: 0,
            transition: 'all 0.3s ease-in-out',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '12px',
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent)',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          '&:hover': {
            opacity: 1,
          }
        }}
      />
    </Box>
  );
}

export default Logo; 