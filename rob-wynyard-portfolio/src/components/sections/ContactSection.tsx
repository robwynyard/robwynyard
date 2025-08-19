'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  Chip,
  Link,
  Divider,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Send,
  Download,
  CheckCircle,
  Business,
  CalendarToday,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { contactFormAtom } from '../../store/atoms';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const contactMethods = [
  {
    icon: <Email />,
    title: 'Email',
    value: 'robwynyard@outlook.com',
    href: 'mailto:robwynyard@outlook.com',
    description: 'Best for detailed discussions',
    color: 'primary.main',
  },
  {
    icon: <Phone />,
    title: 'Phone',
    value: '+64 27 694 1277',
    href: 'tel:+6427694177',
    description: 'Available during NZ business hours',
    color: 'secondary.main',
  },
  {
    icon: <LinkedIn />,
    title: 'LinkedIn',
    value: 'Rob Wynyard',
    href: 'https://www.linkedin.com/in/rob-wynyard-567231358/',
    description: 'Professional networking',
    color: '#0077B5',
  },
  {
    icon: <GitHub />,
    title: 'GitHub',
    value: '@robwynyard',
    href: 'https://github.com/robwynyard',
    description: 'View my code and projects',
    color: '#333',
  },
];

const availabilityInfo = [
  {
    icon: <Business />,
    title: 'Open to Opportunities',
    description: 'Full-time, part-time, and project-based work',
    status: 'Available',
  },
  {
    icon: <CalendarToday />,
    title: 'Response Time',
    description: 'Typically within 24 hours',
    status: 'Fast',
  },
  {
    icon: <LocationOn />,
    title: 'Location',
    description: 'New Zealand (NZST timezone)',
    status: 'Remote OK',
  },
];

export default function ContactSection() {
  const [form, setForm] = useAtom(contactFormAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission - in real implementation, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, open email client with pre-filled content
      const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
      const body = encodeURIComponent(
        `Hi Rob,\n\n${form.message}\n\nBest regards,\n${form.name}\n\nEmail: ${form.email}`
      );
      window.open(`mailto:robwynyard@outlook.com?subject=${subject}&body=${body}`);
      
      setSubmitStatus('success');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        isSubmitting: false,
        isSubmitted: true,
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = form.name && form.email && form.message;

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
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
            radial-gradient(circle at 30% 70%, rgba(43, 95, 117, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(155, 181, 166, 0.03) 0%, transparent 50%)
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
              Let&apos;s Connect
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Ready to discuss your next project or opportunity? I&apos;d love to hear from you.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 6,
            }}
          >
            {/* Contact Form */}
            <MotionCard
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Send a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and I&apos;ll get back to you within 24 hours.
                </Typography>

                {submitStatus === 'success' && (
                  <Alert
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ mb: 3 }}
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    There was an error sending your message. Please try the direct email option below.
                  </Alert>
                )}

                <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Name"
                      variant="outlined"
                      required
                      value={form.name}
                      onChange={handleInputChange('name')}
                      disabled={isSubmitting}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                      value={form.email}
                      onChange={handleInputChange('email')}
                      disabled={isSubmitting}
                    />
                  </Box>

                  <TextField
                    label="Subject"
                    variant="outlined"
                    value={form.subject}
                    onChange={handleInputChange('subject')}
                    disabled={isSubmitting}
                    placeholder="e.g., Job Opportunity, Project Discussion, Collaboration"
                  />

                  <TextField
                    label="Message"
                    multiline
                    rows={5}
                    variant="outlined"
                    required
                    value={form.message}
                    onChange={handleInputChange('message')}
                    disabled={isSubmitting}
                    placeholder="Tell me about your project, opportunity, or how I can help..."
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!isFormValid || isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    sx={{
                      backgroundColor: 'primary.main',
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Stack>
              </CardContent>
            </MotionCard>

            {/* Contact Information */}
            <Box>
              <Stack spacing={4}>
                {/* Contact Methods */}
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                      Get in Touch
                    </Typography>

                    <Stack spacing={3}>
                      {contactMethods.map((method, index) => (
                        <MotionBox
                          key={method.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                          viewport={{ once: true }}
                        >
                          <Link
                            href={method.href}
                            target={method.href.startsWith('http') ? '_blank' : undefined}
                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            sx={{
                              textDecoration: 'none',
                              color: 'inherit',
                              '&:hover': {
                                '& .contact-card': {
                                  backgroundColor: `${method.color}10`,
                                  borderColor: method.color,
                                },
                              },
                            }}
                          >
                            <Box
                              className="contact-card"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                              }}
                            >
                              <Avatar
                                sx={{
                                  backgroundColor: method.color,
                                  color: 'white',
                                  width: 48,
                                  height: 48,
                                }}
                              >
                                {method.icon}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {method.title}
                                </Typography>
                                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 500 }}>
                                  {method.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {method.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Link>
                        </MotionBox>
                      ))}
                    </Stack>
                  </CardContent>
                </MotionCard>

                {/* Availability */}
                <MotionCard
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: 'white',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                      Availability
                    </Typography>

                    <Stack spacing={2}>
                      {availabilityInfo.map((info, index) => (
                        <Box
                          key={info.title}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ color: 'white', opacity: 0.9 }}>
                              {info.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {info.title}
                              </Typography>
                              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                {info.description}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={info.status}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>

                    <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Download />}
                      onClick={() => window.open('/cv/rob-wynyard-cv.pdf', '_blank')}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      Download My CV
                    </Button>
                  </CardContent>
                </MotionCard>
              </Stack>
            </Box>
          </Box>

          {/* Call to Action */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            sx={{ textAlign: 'center', mt: 8 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to Work Together?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Whether you&apos;re looking for a full-stack developer, need business strategy guidance, 
              or want to discuss innovative tech solutions, I&apos;m excited to explore how we can 
              collaborate to bring your vision to life.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                href="mailto:robwynyard@outlook.com?subject=Let's Discuss a Project"
                startIcon={<Email />}
                sx={{
                  backgroundColor: 'primary.main',
                  px: 4,
                  py: 1.5,
                }}
              >
                Email Me Directly
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="https://www.linkedin.com/in/rob-wynyard-567231358/"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedIn />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                }}
              >
                Connect on LinkedIn
              </Button>
            </Stack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}