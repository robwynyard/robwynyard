import axios from 'axios';

// Strapi API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
  },
});

// Content type interfaces matching Strapi collections
export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage: {
    url: string;
    alternativeText?: string;
  };
  github: string;
  linkedin: string;
  cvFile: {
    url: string;
  };
  availability: string;
  responseTime: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  type: 'business' | 'technical' | 'education';
  description: string;
  achievements: string[];
  skills: string[];
  icon: string;
  color: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  technologies: string[];
  category: 'web' | 'business' | 'mobile';
  featured: boolean;
  status: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  duration: string;
  role: string;
  order: number;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  years: number;
  description: string;
  category: {
    id: number;
    name: string;
    label: string;
    color: string;
    icon: string;
    order: number;
  };
}

export interface SkillCategory {
  id: number;
  name: string;
  label: string;
  color: string;
  icon: string;
  order: number;
  skills: Skill[];
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

// API functions
export const strapiAPI = {
  // Personal Info
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    try {
      const response = await strapiApi.get('/personal-info?populate=*');
      return response.data.data || null;
    } catch (error) {
      console.error('Error fetching personal info:', error);
      return null;
    }
  },

  async updatePersonalInfo(data: Partial<PersonalInfo>): Promise<PersonalInfo | null> {
    try {
      const response = await strapiApi.put('/personal-info', { data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating personal info:', error);
      return null;
    }
  },

  // Experience
  async getExperience(): Promise<Experience[]> {
    try {
      const response = await strapiApi.get('/experiences?sort=order:asc&populate=*');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching experience:', error);
      return [];
    }
  },

  async createExperience(data: Omit<Experience, 'id'>): Promise<Experience | null> {
    try {
      const response = await strapiApi.post('/experiences', { data });
      return response.data.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      return null;
    }
  },

  async updateExperience(id: number, data: Partial<Experience>): Promise<Experience | null> {
    try {
      const response = await strapiApi.put(`/experiences/${id}`, { data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating experience:', error);
      return null;
    }
  },

  async deleteExperience(id: number): Promise<boolean> {
    try {
      await strapiApi.delete(`/experiences/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      return false;
    }
  },

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await strapiApi.get('/projects?sort=order:asc&populate=*');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const response = await strapiApi.get('/projects?filters[featured][$eq]=true&sort=order:asc&populate=*');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  },

  async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      const response = await strapiApi.get(`/projects?filters[category][$eq]=${category}&sort=order:asc&populate=*`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }
  },

  async createProject(data: Omit<Project, 'id'>): Promise<Project | null> {
    try {
      const response = await strapiApi.post('/projects', { data });
      return response.data.data;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  },

  async updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
    try {
      const response = await strapiApi.put(`/projects/${id}`, { data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  },

  async deleteProject(id: number): Promise<boolean> {
    try {
      await strapiApi.delete(`/projects/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  },

  // Skills
  async getSkillCategories(): Promise<SkillCategory[]> {
    try {
      const response = await strapiApi.get('/skill-categories?sort=order:asc&populate[skills][populate]=*');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching skill categories:', error);
      return [];
    }
  },

  async getSkills(): Promise<Skill[]> {
    try {
      const response = await strapiApi.get('/skills?populate[category]=*');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },

  async createSkill(data: Omit<Skill, 'id'>): Promise<Skill | null> {
    try {
      const response = await strapiApi.post('/skills', { data });
      return response.data.data;
    } catch (error) {
      console.error('Error creating skill:', error);
      return null;
    }
  },

  async updateSkill(id: number, data: Partial<Skill>): Promise<Skill | null> {
    try {
      const response = await strapiApi.put(`/skills/${id}`, { data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating skill:', error);
      return null;
    }
  },

  // Contact Messages
  async createContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage | null> {
    try {
      const response = await strapiApi.post('/contact-messages', { 
        data: { ...data, status: 'new' }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating contact message:', error);
      return null;
    }
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const response = await strapiApi.get('/contact-messages?sort=createdAt:desc');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  },

  async updateContactMessage(id: number, data: Partial<ContactMessage>): Promise<ContactMessage | null> {
    try {
      const response = await strapiApi.put(`/contact-messages/${id}`, { data });
      return response.data.data;
    } catch (error) {
      console.error('Error updating contact message:', error);
      return null;
    }
  },

  // Media upload helper
  async uploadFile(file: File): Promise<{ id: number; url: string } | null> {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
        },
      });

      return response.data[0] || null;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  },
};

export default strapiAPI;