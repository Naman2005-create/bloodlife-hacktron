import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Button, Grid } from '@mui/material';

const donationTypes = [
  {
    label: 'Packed Red Blood Cells',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    what: 'Blood Collected straight from the donor into a blood bag and mixed with an anticoagulant is called as whole blood. This collected whole blood is then centrifuged and red cell, platelets and plasma are separated. The separated Red cells are mixed with a preservative to be called as packed red blood cells.',
    who: 'You need to be 18-65 years old, weight 45kg or more and be fit and healthy.',
    user: 'Correction of severe anemia in a number of conditions and blood loss in case of child birth, surgery or trauma settings.'
  },
  {
    label: 'Plasma',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    what: 'Plasma is the liquid component of blood that carries cells and proteins throughout the body. It is separated from whole blood and can be used for patients with liver conditions, burns, and clotting disorders.',
    who: 'You need to be 18-65 years old, weight 50kg or more and be healthy.',
    user: 'Used for patients with liver disease, burns, and clotting factor deficiencies.'
  },
  {
    label: 'Platelets',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    what: 'Platelets are small cell fragments in blood that help with clotting. Platelet donation is collected by apheresis and is especially needed for cancer patients and those undergoing major surgeries.',
    who: 'You need to be 18-65 years old, weight 50kg or more and be healthy.',
    user: 'Used for cancer patients, major surgeries, and severe bleeding.'
  }
];

function TypesOfDonation() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (e, newValue) => setTab(newValue);

  const current = donationTypes[tab];

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h3" align="center" sx={{ fontWeight: 700, color: 'error.main', mb: 2, textShadow: '1px 1px 4px #eee' }}>
        Types of Donation
      </Typography>
      <Typography align="center" sx={{ mb: 4, fontSize: 18 }}>
        The average human body contains about five litres of blood, which is made of several cellular and non-cellular components such as
        <span style={{ color: '#b71c1c', fontWeight: 600 }}> Red blood cell, Platelet, and Plasma</span>.
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10}>
          <Box sx={{ display: 'flex', gap: 0, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2, overflow: 'hidden' }}>
            <Box sx={{ minWidth: 200, borderRight: 1, borderColor: 'divider', bgcolor: '#fff' }}>
              <Tabs
                orientation="vertical"
                value={tab}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { background: '#d32f2f', left: 0, width: 4 } }}
                sx={{ height: '100%' }}
              >
                {donationTypes.map((type, idx) => (
                  <Tab
                    key={type.label}
                    label={type.label}
                    sx={{
                      alignItems: 'flex-start',
                      bgcolor: tab === idx ? '#fdeaea' : '#fff',
                      color: tab === idx ? 'error.main' : 'text.primary',
                      fontWeight: tab === idx ? 700 : 500,
                      fontSize: 18,
                      borderRadius: 1,
                      px: 3,
                      py: 2,
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ flex: 1, p: 4, display: 'flex', alignItems: 'stretch', gap: 3, bgcolor: '#fff', borderRadius: 2 }}>
              <Box sx={{ flex: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What is it?</Typography>
                <Typography sx={{ mb: 2 }}>{current.what}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Who can donate?</Typography>
                <Typography sx={{ mb: 2 }}>{current.who}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>User For?</Typography>
                <Typography sx={{ mb: 2 }}>{current.user}</Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={current.image}
                  alt={current.label}
                  sx={{ width: '100%', maxWidth: 220, borderRadius: 3, mb: 2, boxShadow: 2 }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" color="error" size="large" sx={{ px: 4, fontWeight: 700 }}>
              Find Nearest Blood Bank To Donate
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TypesOfDonation; 