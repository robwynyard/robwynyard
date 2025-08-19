'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import {
  KeyboardArrowDown,
  GitHub,
  LinkedIn,
  Download,
  Code,
  Business,
  School,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { heroAnimationCompleteAtom } from '../../store/atoms';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

const roleRotation = [
  'Full Stack Developer',
  'Problem Solver', 
  'Tech Innovator',
  'Business Leader',
  'Te Reo Advocate'
];

const statsData = [
  {
    icon: <Code />,
    number: '5+',
    label: 'Years in Tech',
    color: 'primary.main',
  },
  {
    icon: <Business />,
    number: '10+',
    label: 'Years Business',
    color: 'secondary.main',
  },
  {
    icon: <School />,
    number: '2025',
    label: 'Mission Ready Graduate',
    color: 'tertiary.main',
  },
];

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [, setAnimationComplete] = useAtom(heroAnimationCompleteAtom);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleRotation.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleScrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F5F3F0 0%, #E8F4F8 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(43, 95, 117, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(155, 181, 166, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          {/* Left Column - Text Content */}
          <Box>
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              <Stack spacing={3}>
                {/* Greeting */}
                <MotionTypography
                  variant="h5"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 500,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Kia ora, I&apos;m
                </MotionTypography>

                {/* Name */}
                <MotionTypography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #2B5F75 0%, #4A90A4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Rob Wynyard
                </MotionTypography>

                {/* Dynamic Role */}
                <Box sx={{ height: 60, display: 'flex', alignItems: 'center' }}>
                  <AnimatePresence mode="wait">
                    <MotionTypography
                      key={currentRoleIndex}
                      variant="h3"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: { xs: '1.75rem', md: '2.25rem' },
                      }}
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -20, rotateX: 90 }}
                      transition={{ duration: 0.6 }}
                    >
                      {roleRotation[currentRoleIndex]}
                    </MotionTypography>
                  </AnimatePresence>
                </Box>

                {/* Description */}
                <MotionTypography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: 600,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Aspiring Full Stack Developer with a strong foundation in JavaScript, 
                  React, and Node.js, complemented by years of hands-on experience in 
                  business ownership, IT support, and property management.
                </MotionTypography>

                {/* Tags */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {['JavaScript', 'React', 'Node.js', 'Te Reo Māori', 'Business Owner'].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        variant="outlined"
                        sx={{
                          backgroundColor: 'rgba(43, 95, 117, 0.05)',
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Stack>
                </MotionBox>

                {/* CTA Buttons */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        const element = document.querySelector('#projects');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      sx={{
                        backgroundColor: 'primary.main',
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      View My Work
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Download />}
                      onClick={() => window.open('/cv/rob-wynyard-cv.pdf', '_blank')}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                      }}
                    >
                      Download CV
                    </Button>
                  </Stack>
                </MotionBox>

                {/* Social Links */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      href="https://github.com/robwynyard"
                      target="_blank"
                      startIcon={<GitHub />}
                      sx={{ color: 'text.primary' }}
                    >
                      GitHub
                    </Button>
                    <Button
                      href="https://www.linkedin.com/in/rob-wynyard-567231358/"
                      target="_blank"
                      startIcon={<LinkedIn />}
                      sx={{ color: 'text.primary' }}
                    >
                      LinkedIn
                    </Button>
                  </Stack>
                </MotionBox>
              </Stack>
            </MotionBox>
          </Box>

          {/* Right Column - Photo & Stats */}
          <Box>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Stack spacing={4} alignItems="center">
                {/* Profile Photo */}
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar
                    src="/images/rob-wynyard-photo.jpg"
                    alt="Rob Wynyard"
                    sx={{
                      width: { xs: 250, md: 320 },
                      height: { xs: 250, md: 320 },
                      border: '4px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 32px rgba(43, 95, 117, 0.2)',
                    }}
                  />
                </MotionBox>

                {/* Stats Cards */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                    maxWidth: 400,
                  }}
                >
                  {statsData.map((stat, index) => (
                    <MotionCard
                      key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        sx={{
                          textAlign: 'center',
                          backgroundColor: 'background.paper',
                          borderRadius: 2,
                        }}
                      >
                        <CardContent sx={{ py: 2 }}>
                          <Box sx={{ color: stat.color, mb: 1 }}>
                            {stat.icon}
                          </Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                            {stat.number}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </MotionCard>
                  ))}
                </Box>
              </Stack>
            </MotionBox>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
          }}
          onClick={handleScrollToAbout}
        >
          <MotionBox
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <KeyboardArrowDown 
              sx={{ 
                fontSize: 32, 
                color: 'primary.main',
                opacity: 0.7,
              }} 
            />
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}