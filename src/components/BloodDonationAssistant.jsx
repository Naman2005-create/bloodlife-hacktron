import React, { useEffect, useState, useRef } from 'react';
import { Box, IconButton, Typography, Container, Paper, Grid, Chip, Card, CardContent } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BloodDonationAssistant() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [highlightedWord, setHighlightedWord] = useState('');
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const messages = [
    {
      title: "Welcome to BloodLife",
      content: `Welcome to BloodLife! Your one-stop platform for blood donation.

Quick Facts:
• Every 2 seconds, someone needs blood
• One donation saves up to 3 lives
• Blood cannot be manufactured
• Only 5% of eligible donors donate`,
      image: "/images/welcome.svg",
      color: "#e53935",
      icon: <FavoriteIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Why Donate Blood?",
      content: `Your donation helps:
• Surgery patients
• Cancer patients
• Accident victims
• Blood disorder patients
• Mothers during childbirth

Benefits:
• Free health check-up
• Reduces heart disease risk
• Burns calories
• Makes you feel good`,
      image: "/images/why-donate.svg",
      color: "#d32f2f",
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Donation Process",
      content: `Simple 4-step process:
1. Registration & Screening
   • Quick health check
   • Basic questions
2. Physical Check
   • Blood pressure
   • Hemoglobin test
3. Donation (8-10 mins)
   • Clean & sterile
   • Professional staff
4. Rest & Refresh
   • 15-min rest
   • Light snacks

Total time: 1 hour`,
      image: "/images/process.svg",
      color: "#c62828",
      icon: <AccessTimeIcon sx={{ fontSize: 40, color: 'white' }} />
    },
    {
      title: "Eligibility Requirements",
      content: `Basic Requirements:
• Age: 18+ years
• Weight: 50+ kg
• Good health
• 56 days since last donation

Health Check:
• Hemoglobin: 12.5g/dL+
• Blood pressure: 90/50 to 180/100
• Temperature: 99.5°F or less
• Pulse: 50-100 bpm`,
      image: "/images/eligibility.svg",
      color: "#b71c1c",
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
    }
  ];

  const highlightWords = (text) => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        style={{
          backgroundColor: word === highlightedWord ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
          padding: '0 2px',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {word}{' '}
      </span>
    ));
  };

  useEffect(() => {
    // Initialize speech synthesis
    const speechSynthesis = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance();
    speech.rate = 0.8;
    speech.pitch = 1;
    speech.volume = 1;
    setSpeech(speech);

    // GSAP Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
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
    .from(contentRef.current, {
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
    }, "-=0.5");

    // Auto-start speaking
    const startSpeaking = () => {
      if (speech) {
        const words = messages[currentMessage].content.split(' ');
        let currentWordIndex = 0;

        speech.text = messages[currentMessage].content;
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);

        // Update highlighted word
        const wordInterval = setInterval(() => {
          if (currentWordIndex < words.length) {
            setHighlightedWord(words[currentWordIndex]);
            currentWordIndex++;
          } else {
            clearInterval(wordInterval);
          }
        }, 200);

        speech.onend = () => {
          setIsSpeaking(false);
          setHighlightedWord('');
          clearInterval(wordInterval);
          setTimeout(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
            startSpeaking();
          }, 2000);
        };
      }
    };

    const timer = setTimeout(() => {
      startSpeaking();
    }, 1000);

    return () => {
      speechSynthesis.cancel();
      clearTimeout(timer);
      tl.kill();
    };
  }, [currentMessage]);

  const handleSpeak = () => {
    if (!speech) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setHighlightedWord('');
    } else {
      const words = messages[currentMessage].content.split(' ');
      let currentWordIndex = 0;

      speech.text = messages[currentMessage].content;
      window.speechSynthesis.speak(speech);
      setIsSpeaking(true);

      // Update highlighted word
      const wordInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setHighlightedWord(words[currentWordIndex]);
          currentWordIndex++;
        } else {
          clearInterval(wordInterval);
        }
      }, 200);

      speech.onend = () => {
        setIsSpeaking(false);
        setHighlightedWord('');
        clearInterval(wordInterval);
      };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} ref={containerRef}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: `linear-gradient(135deg, ${messages[currentMessage].color} 0%, #b71c1c 100%)`,
          color: 'white',
          borderRadius: 2,
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
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Chip
                  label={`Section ${currentMessage + 1} of ${messages.length}`}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-label': {
                      fontWeight: 600,
                    },
                  }}
                />
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s infinite',
                  }}
                >
                  {messages[currentMessage].icon}
                </Box>
              </Box>
              <Typography
                ref={titleRef}
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                  mb: 3,
                  color: 'white',
                }}
              >
                {messages[currentMessage].title}
              </Typography>
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  mb: 4,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <CardContent>
                  <Typography
                    ref={contentRef}
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-line',
                      lineHeight: 1.8,
                      color: 'white',
                      textShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                      '& ul': {
                        listStyle: 'none',
                        padding: 0,
                        '& li': {
                          position: 'relative',
                          paddingLeft: '1.5rem',
                          marginBottom: '0.5rem',
                          color: 'white',
                          '&::before': {
                            content: '"•"',
                            position: 'absolute',
                            left: 0,
                            color: 'white',
                          },
                        },
                      },
                      '& span': {
                        color: 'white',
                        textShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    {highlightWords(messages[currentMessage].content)}
                  </Typography>
                </CardContent>
              </Card>
              <Box
                sx={{
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
                  {isSpeaking ? 'Speaking...' : 'Listen to Information'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              ref={imageRef}
              component="img"
              src={messages[currentMessage].image}
              alt={messages[currentMessage].title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))',
                transition: 'all 0.5s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BloodDonationAssistant; 