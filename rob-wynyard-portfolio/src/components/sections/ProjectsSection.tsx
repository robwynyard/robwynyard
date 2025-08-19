'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Button,
  IconButton,
  Badge,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Launch,
  GitHub,
  Star,
  Translate,
  Business,
  Code,
  FilterList,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { projectFilterAtom } from '../../store/atoms';
import { useProjects } from '../../hooks/usePortfolioData';
import { Project } from '../../lib/strapi';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

// Static data removed - now using dynamic Strapi data via useProjects hook

const filterOptions = [
  { label: 'All Projects', value: 'all', icon: <FilterList /> },
  { label: 'Web Development', value: 'web', icon: <Code /> },
  { label: 'Business Systems', value: 'business', icon: <Business /> },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        border: project.featured ? '2px solid' : '1px solid',
        borderColor: project.featured ? 'primary.main' : 'divider',
        ...(project.featured && {
          '&::before': {
            content: '"Featured"',
            position: 'absolute',
            top: 16,
            right: -30,
            backgroundColor: 'primary.main',
            color: 'white',
            padding: '4px 40px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            transform: 'rotate(45deg)',
            zIndex: 1,
          },
        }),
      }}
    >
      {/* Project Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: 'primary.light',
            backgroundImage: `linear-gradient(135deg, ${project.featured ? '#2B5F75' : '#9BB5A6'} 0%, ${project.featured ? '#4A90A4' : '#C4D3CB'} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Project Icon */}
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: project.featured ? 'primary.main' : 'secondary.main',
            }}
          >
            {project.title.includes('Te Reo') ? (
              <Translate sx={{ fontSize: 40 }} />
            ) : project.category === 'web' ? (
              <Code sx={{ fontSize: 40 }} />
            ) : (
              <Business sx={{ fontSize: 40 }} />
            )}
          </Box>

          {/* Status Badge */}
          <Chip
            label={project.status}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: project.status === 'Live' || project.status === 'Live & Active' ? 'success.main' : 
                             project.status === 'In Development' ? 'warning.main' : 'info.main',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </CardMedia>
      </Box>

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, flexGrow: 1 }}>
              {project.title}
            </Typography>
            {project.featured && (
              <Star sx={{ color: 'primary.main', fontSize: 24 }} />
            )}
          </Box>
          
          <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 500, mb: 1 }}>
            {project.subtitle}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={project.year} size="small" variant="outlined" />
            <Chip label={project.role} size="small" variant="outlined" />
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}
        >
          {showFullDescription ? project.fullDescription : project.description}
          {project.fullDescription !== project.description && (
            <Button
              size="small"
              onClick={() => setShowFullDescription(!showFullDescription)}
              sx={{ ml: 1, minWidth: 'auto', p: 0, textTransform: 'none' }}
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </Button>
          )}
        </Typography>

        {/* Technologies */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Technologies:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'background.default',
                  fontSize: '0.7rem',
                  '&:hover': {
                    backgroundColor: project.featured ? 'primary.light' : 'secondary.light',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Key Highlights for Featured Project */}
        {project.featured && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Key Features:
            </Typography>
            <Stack spacing={0.5}>
              {project.highlights.slice(0, 3).map((highlight, idx) => (
                <Typography key={idx} variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'primary.main' }} />
                  {highlight}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Actions */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          {project.liveUrl && (
            <Button
              variant="contained"
              startIcon={<Launch />}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                backgroundColor: project.featured ? 'primary.main' : 'secondary.main',
                flexGrow: 1,
              }}
            >
              View Live
            </Button>
          )}
          
          {project.githubUrl && (
            <IconButton
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <GitHub />
            </IconButton>
          )}

          {!project.liveUrl && !project.githubUrl && (
            <Chip
              label="Private/Confidential"
              size="small"
              sx={{
                backgroundColor: 'warning.light',
                color: 'warning.dark',
                fontWeight: 500,
              }}
            />
          )}
        </Stack>
      </CardContent>
    </MotionCard>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useAtom(projectFilterAtom);
  const { data: projects, loading, error } = useProjects(filter);

  const filteredProjects = projects;

  // Sort to show featured project first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <Box
      id="projects"
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
              Featured Projects
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Showcasing a blend of technical innovation and business impact
            </Typography>

            {/* Filter Buttons */}
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? 'contained' : 'outlined'}
                  startIcon={option.icon}
                  onClick={() => setFilter(option.value as 'all' | 'web' | 'business')}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    ...(filter === option.value && {
                      backgroundColor: 'primary.main',
                    }),
                  }}
                >
                  {option.label}
                  {option.value === 'all' && (
                    <Badge badgeContent={projects.length} color="secondary" sx={{ ml: 1 }} />
                  )}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress size={48} />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert 
              severity="info" 
              sx={{ mb: 4 }}
            >
              Using cached project data. Strapi connection: {error}
            </Alert>
          )}

          {/* Projects Grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <MotionBox
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    },
                    gap: 4,
                  }}
                >
                  {sortedProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
                </Box>
              </MotionBox>
            </AnimatePresence>
          )}

          {/* Featured Project Callout */}
          {filter === 'all' && (
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Translate sx={{ fontSize: 48 }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Te Reo Māori Platform
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                    Currently developing an innovative AI-powered language learning platform
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
                    This project represents the intersection of cutting-edge technology and cultural authenticity, 
                    featuring voice recognition, ancestral avatars, and deep tikanga integration.
                  </Typography>
                </CardContent>
              </Card>
            </MotionBox>
          )}
        </MotionBox>
      </Container>
    </Box>
  );
}