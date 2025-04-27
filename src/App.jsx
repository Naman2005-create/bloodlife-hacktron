import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import DonorRegistration from './components/DonorRegistration';
import EmergencyRequest from './components/EmergencyRequest';
import Home from './components/Home';
import DonationSection from './components/DonationSection';
import Information from './components/Information';
import Footer from './components/Footer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor-registration" element={<DonorRegistration />} />
          <Route path="/emergency-request" element={<EmergencyRequest />} />
          <Route path="/donate" element={<DonationSection />} />
          <Route path="/information" element={<Information />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App; 