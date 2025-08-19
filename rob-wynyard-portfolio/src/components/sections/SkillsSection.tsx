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
  LinearProgress,
  Tab,
  Tabs,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Code,
  Storage,
  Palette,
  Business,
  Cloud,
  Psychology,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: <Code />,
    color: '#2B5F75',
    skills: [
      { name: 'JavaScript/TypeScript', level: 85, years: 2, description: 'Modern ES6+, TypeScript for type safety' },
      { name: 'React.js', level: 80, years: 2, description: 'Hooks, Context, Component architecture' },
      { name: 'HTML5 & CSS3', level: 90, years: 3, description: 'Semantic markup, Flexbox, Grid, animations' },
      { name: 'Material-UI', level: 75, years: 1, description: 'Component libraries, theming, responsive design' },
      { name: 'Responsive Design', level: 85, years: 3, description: 'Mobile-first approach, cross-browser compatibility' },
      { name: 'Framer Motion', level: 70, years: 1, description: 'Animations and micro-interactions' },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: <Storage />,
    color: '#9BB5A6',
    skills: [
      { name: 'Node.js', level: 75, years: 2, description: 'Express.js, REST APIs, async programming' },
      { name: 'Databases', level: 70, years: 2, description: 'MongoDB, SQL, data modeling' },
      { name: 'API Development', level: 75, years: 2, description: 'RESTful services, authentication, validation' },
      { name: 'Authentication', level: 70, years: 1, description: 'JWT, OAuth, security best practices' },
    ]
  },
  {
    id: 'tools',
    label: 'Tools & DevOps',
    icon: <Cloud />,
    color: '#D4845C',
    skills: [
      { name: 'Git & GitHub', level: 85, years: 2, description: 'Version control, collaboration, workflows' },
      { name: 'VS Code', level: 90, years: 3, description: 'Extensions, debugging, productivity' },
      { name: 'Docker', level: 60, years: 1, description: 'Containerization, development environments' },
      { name: 'Netlify/Vercel', level: 75, years: 1, description: 'Deployment, CI/CD, static hosting' },
      { name: 'Agile/Scrum', level: 80, years: 1, description: 'Sprint planning, stand-ups, retrospectives' },
    ]
  },
  {
    id: 'business',
    label: 'Business Skills',
    icon: <Business />,
    color: '#4A90A4',
    skills: [
      { name: 'Project Management', level: 90, years: 10, description: 'Leading teams, budget management, delivery' },
      { name: 'Strategic Planning', level: 85, years: 8, description: 'Business strategy, growth planning, ROI analysis' },
      { name: 'Client Relations', level: 90, years: 10, description: 'Communication, negotiation, relationship building' },
      { name: 'Financial Management', level: 85, years: 5, description: 'Budgeting, compliance, financial reporting' },
      { name: 'Team Leadership', level: 85, years: 8, description: 'Mentoring, delegation, performance management' },
    ]
  },
  {
    id: 'design',
    label: 'Design & UX',
    icon: <Palette />,
    color: '#7A9485',
    skills: [
      { name: 'UI/UX Design', level: 75, years: 2, description: 'User research, wireframing, prototyping' },
      { name: 'Cultural Sensitivity', level: 85, years: 1, description: 'Māori values, cultural authenticity, inclusive design' },
      { name: 'Accessibility', level: 70, years: 1, description: 'WCAG guidelines, inclusive design principles' },
      { name: 'Design Systems', level: 70, years: 1, description: 'Component libraries, consistency, branding' },
    ]
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    icon: <Psychology />,
    color: '#B8673A',
    skills: [
      { name: 'Problem Solving', level: 95, years: 15, description: 'Analytical thinking, creative solutions' },
      { name: 'Communication', level: 90, years: 15, description: 'Technical explanation, stakeholder management' },
      { name: 'Adaptability', level: 90, years: 10, description: 'Learning new technologies, embracing change' },
      { name: 'Cultural Awareness', level: 85, years: 5, description: 'Te Reo Māori, tikanga, inclusive practices' },
      { name: 'Mentoring', level: 80, years: 5, description: 'Knowledge sharing, team development' },
    ]
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`skills-tabpanel-${index}`}
      aria-labelledby={`skills-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function SkillCard({ skill, index, color }: { 
  skill: { name: string; level: number; years: number; description: string }; 
  index: number; 
  color: string 
}) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      sx={{
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          borderColor: color,
          boxShadow: `0 4px 20px ${color}20`,
        },
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {skill.name}
          </Typography>
          <Chip
            label={`${skill.years}y`}
            size="small"
            sx={{
              backgroundColor: `${color}15`,
              color: color,
              fontWeight: 500,
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {skill.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" fontWeight={500}>
              Proficiency
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {skill.level}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={skill.level}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: `${color}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Rating
            value={Math.round(skill.level / 20)}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: color,
              },
            }}
          />
        </Box>
      </CardContent>
    </MotionCard>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.accent',
        position: 'relative',
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
            radial-gradient(circle at 20% 20%, rgba(43, 95, 117, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(155, 181, 166, 0.03) 0%, transparent 50%)
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
              Skills & Expertise
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              A comprehensive toolkit spanning technical development and business leadership
            </Typography>
          </Box>

          {/* Skills Overview Cards */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            sx={{ mb: 6 }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 3,
              }}
            >
              {skillCategories.map((category, index) => (
                <MotionCard
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: activeTab === index ? `${category.color}10` : 'background.paper',
                    border: '1px solid',
                    borderColor: activeTab === index ? category.color : 'divider',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setActiveTab(index)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar
                      sx={{
                        backgroundColor: category.color,
                        color: 'white',
                        width: 56,
                        height: 56,
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {category.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.skills.length} skills
                    </Typography>
                  </CardContent>
                </MotionCard>
              ))}
            </Box>
          </MotionBox>

          {/* Detailed Skills Tabs */}
          <Box sx={{ width: '100%' }}>
            {/* Tab Navigation */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    minWidth: 120,
                  },
                }}
              >
                {skillCategories.map((category) => (
                  <Tab
                    key={category.id}
                    label={category.label}
                    icon={category.icon}
                    iconPosition="start"
                  />
                ))}
              </Tabs>
            </Box>

            {/* Tab Panels */}
            {skillCategories.map((category, categoryIndex) => (
              <TabPanel key={category.id} value={activeTab} index={categoryIndex}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {category.skills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={index}
                      color={category.color}
                    />
                  ))}
                </Box>
              </TabPanel>
            ))}
          </Box>

          {/* Skills Summary */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            sx={{ mt: 8 }}
          >
            <Card
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center',
                py: 4,
              }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                  <Star sx={{ fontSize: 32 }} />
                </Stack>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                  Continuous Learning
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                  Always expanding my skillset and staying current with technology
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                  Currently focused on advancing my full-stack development skills while building the 
                  Te Reo Māori platform. Passionate about combining technical excellence with cultural 
                  authenticity and user-centered design.
                </Typography>
              </CardContent>
            </Card>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}