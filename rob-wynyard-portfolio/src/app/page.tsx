'use client';

import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
    </Layout>
  );
}
