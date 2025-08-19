'use client';

import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 8, md: 10 }, // Account for fixed header
        }}
      >
        {children}
      </Box>
      
      <Footer />
    </Box>
  );
}