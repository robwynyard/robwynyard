import { useState, useEffect } from 'react';
import { strapiAPI, PersonalInfo, Experience, Project, SkillCategory } from '../lib/strapi';

// Fallback data - will be used if Strapi is not available
import { fallbackPersonalInfo } from '../data/fallbackData';
import { fallbackExperience } from '../data/fallbackData';
import { fallbackProjects } from '../data/fallbackData';
import { fallbackSkillCategories } from '../data/fallbackData';

export const usePersonalInfo = () => {
  const [data, setData] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await strapiAPI.getPersonalInfo();
      setData(result || fallbackPersonalInfo);
      setError(null);
    } catch {
      console.warn('Failed to fetch personal info from Strapi, using fallback data');
      setData(fallbackPersonalInfo);
      setError('Using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};

export const useExperience = () => {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await strapiAPI.getExperience();
      setData(result.length > 0 ? result : fallbackExperience);
      setError(null);
    } catch {
      console.warn('Failed to fetch experience from Strapi, using fallback data');
      setData(fallbackExperience);
      setError('Using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};

export const useProjects = (category?: 'all' | 'web' | 'business' | 'mobile') => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let result: Project[];
      
      if (category && category !== 'all') {
        result = await strapiAPI.getProjectsByCategory(category);
      } else {
        result = await strapiAPI.getProjects();
      }
      
      setData(result.length > 0 ? result : fallbackProjects);
      setError(null);
    } catch {
      console.warn('Failed to fetch projects from Strapi, using fallback data');
      setData(fallbackProjects);
      setError('Using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return { data, loading, error, refresh: fetchData };
};

export const useFeaturedProjects = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await strapiAPI.getFeaturedProjects();
      const fallbackFeatured = fallbackProjects.filter(p => p.featured);
      setData(result.length > 0 ? result : fallbackFeatured);
      setError(null);
    } catch {
      console.warn('Failed to fetch featured projects from Strapi, using fallback data');
      const fallbackFeatured = fallbackProjects.filter(p => p.featured);
      setData(fallbackFeatured);
      setError('Using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};

export const useSkillCategories = () => {
  const [data, setData] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await strapiAPI.getSkillCategories();
      setData(result.length > 0 ? result : fallbackSkillCategories);
      setError(null);
    } catch {
      console.warn('Failed to fetch skills from Strapi, using fallback data');
      setData(fallbackSkillCategories);
      setError('Using fallback data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refresh: fetchData };
};

// Hook for submitting contact messages
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitMessage = async (messageData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await strapiAPI.createContactMessage(messageData);
      
      if (result) {
        setSuccess(true);
        return true;
      } else {
        throw new Error('Failed to submit message');
      }
    } catch {
      setError('Failed to submit message. Please try emailing directly.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    submitMessage,
    resetForm,
    loading,
    error,
    success,
  };
};