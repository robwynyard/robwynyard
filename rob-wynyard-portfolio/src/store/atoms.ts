'use client';

import { atom } from 'jotai';

// Theme state
export const themeAtom = atom<'light' | 'dark'>('light');

// Navigation state
export const menuOpenAtom = atom(false);
export const activeScrollSectionAtom = atom('home');

// Project filtering
export const projectFilterAtom = atom<'all' | 'web' | 'mobile' | 'business'>('all');

// Contact form state
export const contactFormAtom = atom({
  name: '',
  email: '',
  subject: '',
  message: '',
  isSubmitting: false,
  isSubmitted: false,
});

// UI state
export const isLoadingAtom = atom(false);
export const showCVDownloadAtom = atom(false);

// Animation state
export const heroAnimationCompleteAtom = atom(false);
export const skillsInViewAtom = atom(false);

// Content state (will be populated from Strapi later)
export const projectsAtom = atom([]);
export const experienceAtom = atom([]);
export const skillsAtom = atom([]);