import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/donor-registration', label: 'Donor Registration' },
    { path: '/emergency-request', label: 'Emergency Request' },
    { path: '/donate', label: 'Donate' },
    { path: '/information', label: 'Information' }
  ];

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ 
      width: 250,
      background: 'linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)',
      height: '100%',
      color: 'white'
    }}>
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            component={RouterLink} 
            to={item.path}
            key={item.path}
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{
                color: 'white',
                '& .MuiTypography-root': {
                  fontWeight: isActive(item.path) ? 'bold' : 'normal',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1.1rem',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: 'linear-gradient(90deg, #d32f2f 0%, #b71c1c 100%)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Logo />
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <MenuIcon sx={{ 
                fontSize: '1.8rem',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
              }} />
            </IconButton>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              alignItems: 'center'
            }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: 'white',
                    position: 'relative',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease-in-out',
                    backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: '1.1rem',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(item.path) ? '80%' : '0%',
                      height: '2px',
                      backgroundColor: 'white',
                      transition: 'width 0.3s ease',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover::after': {
                      width: '80%',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar; 