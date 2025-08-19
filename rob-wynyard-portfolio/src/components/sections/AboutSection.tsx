'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Business,
  Psychology,
  Groups,
  Star,
  MusicNote,
  BeachAccess,
  SportsGolf,
  FamilyRestroom,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const personalStrengths = [
  {
    title: 'Natural Problem Solver',
    description: 'Passionate about learning, tech innovation, and collaboration',
    icon: <Psychology />,
  },
  {
    title: 'Excellent Communicator',
    description: 'Relate to people from all walks of life with proven leadership skills',
    icon: <Groups />,
  },
  {
    title: 'Strong Business Acumen',
    description: 'Self-employment & client-focused roles with strategic thinking',
    icon: <Business />,
  },
];

const personalInterests = [
  { label: '80s Vinyl Record Collector', icon: <MusicNote /> },
  { label: 'Beach & Travel Enthusiast', icon: <BeachAccess /> },
  { label: 'Proud Dad & Husband', icon: <FamilyRestroom /> },
  { label: 'Love Playing Golf', icon: <SportsGolf /> },
];

const coreValues = [
  'User-first mindset',
  'Accessible design',
  'Cultural authenticity',
  'Continuous learning',
  'Collaborative spirit',
  'Quality delivery',
];

export default function AboutSection() {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #2B5F75 0%, #4A90A4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About Me
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              A unique blend of business leadership and technical innovation
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 6,
            }}
          >
            {/* Left Column - Story & Bio */}
            <Box>
              <Stack spacing={4}>
                {/* Main Bio */}
                <MotionCard
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      My Journey
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                      I&apos;m an aspiring Full Stack Developer currently refining my skills through the 
                      <strong> Mission Ready HQ accelerator programme</strong>. My journey combines 
                      a strong foundation in JavaScript, React, and Node.js with years of real-world 
                      experience in business ownership, IT support, and property management.
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                      As a natural problem solver and communicator, I have a proven ability to work 
                      across diverse teams and communities. I&apos;m passionate about creating 
                      <strong> accessible, intuitive digital experiences</strong> with a user-first mindset, 
                      particularly in developing culturally authentic solutions like the Te Reo Māori 
                      learning platform I&apos;m currently working on.
                    </Typography>

                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      My unique background allows me to bridge the gap between technical implementation 
                      and business strategy, ensuring that the solutions I build not only work well 
                      technically but also deliver real value to users and organizations.
                    </Typography>
                  </CardContent>
                </MotionCard>

                {/* Personal Strengths */}
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Core Strengths
                  </Typography>
                  
                  <Stack spacing={3}>
                    {personalStrengths.map((strength, index) => (
                      <MotionCard
                        key={strength.title}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02 }}
                          sx={{
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Avatar
                                sx={{
                                  backgroundColor: 'primary.main',
                                  color: 'white',
                                  width: 48,
                                  height: 48,
                                }}
                              >
                                {strength.icon}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                  {strength.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {strength.description}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </MotionCard>
                    ))}
                  </Stack>
                </MotionBox>
              </Stack>
            </Box>

            {/* Right Column - Values & Interests */}
            <Box>
              <Stack spacing={4}>
                {/* Core Values */}
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                      Core Values
                    </Typography>
                    
                    <Stack spacing={2}>
                      {coreValues.map((value, index) => (
                        <MotionBox
                          key={value}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                          viewport={{ once: true }}
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <Star sx={{ fontSize: 18, color: 'secondary.main' }} />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {value}
                          </Typography>
                        </MotionBox>
                      ))}
                    </Stack>
                  </CardContent>
                </MotionCard>

                {/* Personal Interests */}
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                      Personal Interests
                    </Typography>
                    
                    <List sx={{ p: 0 }}>
                      {personalInterests.map((interest) => (
                        <ListItem
                          key={interest.label}
                          sx={{ px: 0 }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                              sx={{
                                backgroundColor: 'secondary.main',
                                color: 'white',
                                width: 32,
                                height: 32,
                              }}
                            >
                              {interest.icon}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={interest.label}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              color: 'text.primary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </MotionCard>

                {/* Mission Ready Progress */}
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'background.accent',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'primary.light',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Current Focus
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Mission Ready HQ Full Stack Development Programme
                    </Typography>
                    
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(43, 95, 117, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'primary.main',
                          borderRadius: 4,
                        },
                      }}
                    />
                    
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      85% Complete - Expected graduation: July 2025
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Stack>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}