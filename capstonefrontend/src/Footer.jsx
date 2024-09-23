import React from 'react';
import { Box, Typography, IconButton, Container, Grid, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 2, mt: 'auto', pt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Information */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Service Booking
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              We provide a seamless platform to connect service providers with consumers, offering a range of categories and professionals to meet your needs.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" component="div">
              <MuiLink href="/about" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </MuiLink>
              <MuiLink href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact Us
              </MuiLink>
              <MuiLink href="/privacy" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Privacy Policy
              </MuiLink>
              <MuiLink href="/terms" color="inherit" sx={{ display: 'block' }}>
                Terms of Service
              </MuiLink>
            </Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook" href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter" href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton aria-label="LinkedIn" href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Service Booking. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
