'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  GitHub,
  LinkedIn,
  Download,
} from '@mui/icons-material';
import { useAtom } from 'jotai';
import { menuOpenAtom } from '../../store/atoms';
import { motion } from 'framer-motion';

const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const MotionAppBar = motion(AppBar);

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuOpen, setMenuOpen] = useAtom(menuOpenAtom);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleCVDownload = () => {
    window.open('/cv/rob-wynyard-cv.pdf', '_blank');
  };

  return (
    <>
      <MotionAppBar
        position="fixed"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo/Name */}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                cursor: 'pointer',
              }}
              onClick={() => handleNavClick('#home')}
            >
              Rob Wynyard
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(43, 95, 117, 0.08)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                
                {/* Social Links */}
                <IconButton
                  href="https://github.com/robwynyard"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'text.primary', ml: 1 }}
                >
                  <GitHub />
                </IconButton>
                
                <IconButton
                  href="https://www.linkedin.com/in/rob-wynyard-567231358/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'text.primary' }}
                >
                  <LinkedIn />
                </IconButton>

                {/* CV Download */}
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleCVDownload}
                  sx={{
                    ml: 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  CV
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setMenuOpen(true)}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </MotionAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
          <IconButton onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNavClick(item.href)}>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          
          <ListItem disablePadding>
            <ListItemButton onClick={handleCVDownload}>
              <ListItemText 
                primary="Download CV"
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Mobile Social Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <IconButton
            href="https://github.com/robwynyard"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'text.primary' }}
          >
            <GitHub />
          </IconButton>
          
          <IconButton
            href="https://www.linkedin.com/in/rob-wynyard-567231358/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'text.primary' }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}