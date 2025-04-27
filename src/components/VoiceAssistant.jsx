import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function VoiceAssistant() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);

  useEffect(() => {
    // Initialize speech synthesis
    const speechSynthesis = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance();
    speech.rate = 0.8; // Slower rate for better clarity
    speech.pitch = 1;
    speech.volume = 1;
    setSpeech(speech);

    // Auto-start speaking
    const startSpeaking = () => {
      if (speech) {
        speech.text = welcomeMessage;
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);

        speech.onend = () => {
          setIsSpeaking(false);
          // Restart speaking after a short pause
          setTimeout(() => {
            startSpeaking();
          }, 2000);
        };
      }
    };

    // Start speaking after a short delay
    const timer = setTimeout(() => {
      startSpeaking();
    }, 1000);

    return () => {
      speechSynthesis.cancel();
      clearTimeout(timer);
    };
  }, []);

  const welcomeMessage = `
    Welcome to BloodLife! 
    We are a platform dedicated to saving lives through blood donation.
    Our mission is to connect blood donors with those in need, making the process of blood donation and emergency requests seamless and efficient.
    
    Here's what you can do on our platform:
    First, you can register as a blood donor and join our network of life-saving heroes.
    Second, if you need blood urgently, you can submit an emergency request, and we'll help you find donors quickly.
    Third, you can support our cause by making a donation to help us maintain and improve our services.
    
    Our platform features:
    - Easy donor registration process
    - Real-time blood availability tracking
    - Emergency response system
    - Community support network
    - Secure payment options
    - Regular blood donation campaigns
    
    We believe that every drop of blood counts, and together, we can make a difference in our community.
    Thank you for being part of this life-saving journey.
    
    To get started, you can:
    1. Register as a donor
    2. Submit an emergency request
    3. Make a donation
    4. Join our community
    
    Remember, your contribution can save lives!
  `;

  const handleSpeak = () => {
    if (!speech) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speech.text = welcomeMessage;
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);

      speech.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <IconButton
        onClick={handleSpeak}
        sx={{
          color: 'white',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        {isSpeaking ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          opacity: 0.9,
          textShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
        }}
      >
        {isSpeaking ? 'Speaking...' : 'Listen to Introduction'}
      </Typography>
    </Box>
  );
}

export default VoiceAssistant; 