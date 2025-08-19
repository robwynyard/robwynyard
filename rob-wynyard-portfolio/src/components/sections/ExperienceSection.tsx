'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Business,
  Computer,
  School,
  Star,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Work,
  Group,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const experienceData = [
  {
    id: 'wynbar',
    company: 'Wynbar Collective Limited',
    position: 'Managing Partner',
    period: '2020 - Current',
    type: 'Business Leadership',
    description: 'Leading investment property renovations, budgeting, compliance, and tenant relations while driving long-term value for assets.',
    icon: <Business />,
    color: 'primary.main',
    achievements: [
      'Manage investment property renovations, budgeting, compliance, and tenant relations',
      'Lead business operations including tax, admin, and strategy',
      'Coordinate with trades and council; drive long-term value for assets',
      'Built sustainable property portfolio with consistent ROI',
    ],
    skills: ['Property Management', 'Financial Planning', 'Project Management', 'Stakeholder Relations'],
  },
  {
    id: 'mission-ready',
    company: 'Mission Ready HQ',
    position: 'Full Stack Development Bootcamp',
    period: 'Feb 2025 - July 2025',
    type: 'Education',
    description: 'Intensive full-stack development programme focusing on modern web technologies and real-world project experience.',
    icon: <School />,
    color: 'secondary.main',
    achievements: [
      'Built and deployed full-stack applications using React and Node.js',
      'Collaborated in Agile teams, using GitHub and engaging in sprint planning, daily stand-ups, and regular retrospectives',
      'Developed problem-solving tools and data-driven interfaces focused on UX',
      'Planned application features, user flows, and personas to guide development of an immersive and culturally authentic, AI powered, voice-enabled Te Reo Māori learning platform',
      'Contributed to UX design for features such as ancestral avatars, dialect selection, and tikanga integration, ensuring alignment with Māori values',
      'Managed Agile workflows in Trello and collaborated with cross-functional teams to deliver technical and cultural requirements',
      'Assisted in scoping backend and frontend architecture to support AI voice, real-time pronunciation feedback, and scalable avatar personalisation',
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Agile', 'UX Design', 'Cultural Sensitivity'],
  },
  {
    id: 'computer-guru',
    company: 'Computer Guru (Exito Limited)',
    position: 'Managing Director & Technician',
    period: '2013 - 2017',
    type: 'Business & Technical',
    description: 'Founded and managed a successful computer hardware and repair business, overseeing daily operations, business development, and strategic planning.',
    icon: <Computer />,
    color: 'tertiary.main',
    achievements: [
      'Founded and managed a successful computer hardware and repair business, overseeing daily operations, business development, and strategic planning',
      'Delivered exceptional technical support, diagnosing and resolving complex IT issues while building and maintaining positive customer relationships',
      'Developed and implemented growth strategies, enhancing brand visibility, increasing revenue, and driving long-term success',
    ],
    skills: ['Business Management', 'Technical Support', 'Customer Relations', 'Strategic Planning'],
  },
  {
    id: 'geeks-on-wheels',
    company: 'Geeks on Wheels',
    position: 'Computer Technician',
    period: '2011 - 2013',
    type: 'Technical',
    description: 'Provided in-home and remote IT support services, maintaining high customer satisfaction and quick turnaround times.',
    icon: <Computer />,
    color: 'info.main',
    achievements: [
      'Delivered in-home and remote IT support services',
      'Diagnosed, repaired, and optimised PCs, Macs, and networks',
      'Maintained high customer satisfaction and ticket turnaround',
    ],
    skills: ['Hardware Repair', 'Network Administration', 'Customer Service', 'Problem Solving'],
  },
];

interface ExperienceCardProps {
  experience: typeof experienceData[0];
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      sx={{
        position: 'relative',
        overflow: 'visible',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -2,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: experience.color,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          {/* Icon */}
          <Avatar
            sx={{
              backgroundColor: experience.color,
              color: 'white',
              width: 56,
              height: 56,
            }}
          >
            {experience.icon}
          </Avatar>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {experience.position}
                </Typography>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: 500 }}>
                  {experience.company}
                </Typography>
              </Box>
              <Chip
                label={experience.period}
                variant="outlined"
                sx={{
                  borderColor: experience.color,
                  color: experience.color,
                  fontWeight: 500,
                }}
              />
            </Box>

            <Chip
              label={experience.type}
              size="small"
              sx={{
                backgroundColor: `${experience.color}15`,
                color: experience.color,
                mb: 2,
                fontWeight: 500,
              }}
            />

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              {experience.description}
            </Typography>

            {/* Skills */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Key Skills:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {experience.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      backgroundColor: 'background.default',
                      '&:hover': {
                        backgroundColor: `${experience.color}10`,
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Expand Button */}
            <Button
              onClick={() => setExpanded(!expanded)}
              endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
              sx={{
                color: experience.color,
                fontWeight: 500,
                textTransform: 'none',
                p: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              {expanded ? 'Show Less' : 'Key Achievements'}
            </Button>

            {/* Expandable Content */}
            <Collapse in={expanded}>
              <Box sx={{ mt: 2 }}>
                <List dense sx={{ py: 0 }}>
                  {experience.achievements.map((achievement, idx) => (
                    <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle
                          sx={{
                            fontSize: 18,
                            color: experience.color,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </CardContent>
    </MotionCard>
  );
}

export default function ExperienceSection() {
  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.accent',
        position: 'relative',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(43, 95, 117, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(155, 181, 166, 0.03) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
              Experience & Education
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              A journey combining business leadership, technical expertise, and continuous learning
            </Typography>
          </Box>

          {/* Timeline Stats */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            sx={{ mb: 8 }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 3,
              }}
            >
              {[
                { icon: <Work />, label: 'Years Experience', value: '10+', color: 'primary.main' },
                { icon: <Group />, label: 'Teams Led', value: '5+', color: 'secondary.main' },
                { icon: <TrendingUp />, label: 'Businesses Founded', value: '2', color: 'tertiary.main' },
                { icon: <Star />, label: 'Key Projects', value: '15+', color: 'info.main' },
              ].map((stat, index) => (
                <MotionCard
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent sx={{ py: 3 }}>
                    <Avatar
                      sx={{
                        backgroundColor: stat.color,
                        color: 'white',
                        width: 48,
                        height: 48,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </MotionCard>
              ))}
            </Box>
          </MotionBox>

          {/* Experience Timeline */}
          <Stack spacing={4}>
            {experienceData.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </Stack>

          {/* Call to Action */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            sx={{ textAlign: 'center', mt: 8 }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to bring this experience to your team?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Let&apos;s discuss how my unique blend of business and technical skills can drive your next project.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                sx={{
                  backgroundColor: 'primary.main',
                  px: 4,
                }}
              >
                Get In Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.open('/cv/rob-wynyard-cv.pdf', '_blank')}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 4,
                }}
              >
                Download CV
              </Button>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}