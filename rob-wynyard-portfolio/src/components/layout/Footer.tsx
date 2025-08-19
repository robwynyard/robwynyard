'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Divider,
  Link,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Main Footer Content */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
              gap: 4,
            }}
          >
            {/* About Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Rob Wynyard
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Full Stack Developer with a passion for creating accessible, 
                intuitive digital experiences. Combining business acumen with 
                technical expertise to deliver exceptional results.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 18 }} />
                  <Link 
                    href="mailto:robwynyard@outlook.com" 
                    color="inherit" 
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    robwynyard@outlook.com
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: 18 }} />
                  <Link 
                    href="tel:+6427694177" 
                    color="inherit" 
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    +64 27 694 1277
                  </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 18 }} />
                  <Typography variant="body2">New Zealand</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="inherit"
                    sx={{
                      textDecoration: 'none',
                      opacity: 0.9,
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'underline',
                      },
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Connect */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Connect
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  href="https://github.com/robwynyard"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <GitHub />
                </IconButton>
                
                <IconButton
                  href="https://www.linkedin.com/in/rob-wynyard-567231358/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <LinkedIn />
                </IconButton>
                
                <IconButton
                  href="mailto:robwynyard@outlook.com"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Email />
                </IconButton>
              </Stack>
              
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                Open to new opportunities and collaborations
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Copyright */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © {currentYear} Rob Wynyard. All rights reserved.
            </Typography>
            
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Built with Next.js, Material-UI & ❤️
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}