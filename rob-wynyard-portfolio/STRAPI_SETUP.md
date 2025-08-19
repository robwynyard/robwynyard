# Strapi CMS Integration Guide

This guide explains how to set up and use Strapi CMS with your Rob Wynyard portfolio for dynamic content management.

## Overview

The portfolio now supports both **dynamic content from Strapi** and **fallback static data** for maximum reliability. If Strapi is unavailable, the site will automatically use cached static content.

## Features

- ✅ **Dynamic Content Management** - Update all content through Strapi admin panel
- ✅ **Fallback System** - Site works even without Strapi connection  
- ✅ **Media Management** - Upload and manage images, documents, CV
- ✅ **Contact Form Integration** - Messages stored in Strapi database
- ✅ **API-First Architecture** - Clean separation of content and presentation

## Content Types

### 1. Personal Info (Single Type)
- Name, title, email, phone, location
- Bio and profile image
- Social media links (GitHub, LinkedIn)  
- CV file upload
- Availability status and response time

### 2. Experience (Collection)
- Company, position, dates
- Job type (business, technical, education)
- Description and achievements
- Skills used
- Display order and styling

### 3. Projects (Collection)
- Title, subtitle, descriptions
- Project images
- Technologies used
- Category (web, business, mobile)
- Featured status
- Live/GitHub URLs
- Highlights and details

### 4. Skills (Collection + Categories)
- Skill categories (Frontend, Backend, etc.)
- Individual skills with proficiency levels
- Years of experience
- Detailed descriptions

### 5. Contact Messages (Collection)
- Form submissions from website
- Status tracking (new, read, replied)
- Admin notifications

## Setup Instructions

### Option 1: Quick Setup (Recommended)

1. **Deploy Strapi to Railway/Heroku:**
   ```bash
   # Use the one-click deploy buttons on Strapi's website
   # Or deploy manually to your preferred platform
   ```

2. **Import Schema:**
   - Use the `strapi-schema.json` file to create content types
   - Or create them manually in the Strapi admin panel

3. **Configure Environment:**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   
   # Edit with your Strapi URL and API token
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
   STRAPI_API_TOKEN=your_api_token_here
   ```

### Option 2: Local Development

1. **Create Strapi Project:**
   ```bash
   npx create-strapi-app@latest rob-wynyard-cms --quickstart
   cd rob-wynyard-cms
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run develop
   ```

4. **Create Admin Account:**
   - Open http://localhost:1337/admin
   - Create your admin account
   - Set up content types using the schema

5. **Configure Environment:**
   ```bash
   # In your Next.js project
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_local_api_token
   ```

## Content Management

### Adding Content

1. **Personal Info:**
   - Go to Content Manager → Personal Info
   - Fill in all your details
   - Upload profile photo and CV

2. **Experience:**
   - Add each job/education entry
   - Set proper order numbers for display sequence
   - Include achievements as JSON array

3. **Projects:**
   - Create project entries
   - Mark featured projects
   - Upload project images
   - Set technologies as JSON array

4. **Skills:**
   - First create skill categories
   - Then add individual skills to categories
   - Set proficiency levels (0-100)

### Managing Media

- Upload images to Media Library
- Supported formats: JPG, PNG, GIF, WebP
- Recommended sizes:
  - Profile photo: 400x400px
  - Project images: 800x600px
  - CV: PDF format

### API Tokens

1. **Create API Token:**
   - Go to Settings → API Tokens
   - Create new token with appropriate permissions
   - Copy token to environment variables

2. **Permissions:**
   - Set read permissions for public content
   - Restrict write permissions to admin only
   - Configure CORS for your domain

## Development Features

### Automatic Fallback

The portfolio automatically falls back to static data if Strapi is unavailable:

```typescript
// Example usage
const { data: projects, loading, error } = useProjects();
// Returns fallback data if Strapi connection fails
```

### Real-time Updates

Content changes in Strapi are reflected immediately on the frontend (no rebuild required).

### Loading States

All sections show appropriate loading spinners while fetching data from Strapi.

### Error Handling

Graceful error handling with informative messages for users and developers.

## Deployment

### Frontend (Next.js)

Deploy to Vercel/Netlify with environment variables:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_production_token
```

### Backend (Strapi)

Recommended platforms:
- **Railway** (easiest)
- **Heroku** (popular)  
- **DigitalOcean** (flexible)
- **AWS/Azure** (enterprise)

## Security

- API tokens are server-side only
- CORS configured for your domain
- Content is publicly readable, admin-only writable
- Contact form has spam protection
- File uploads have type restrictions

## Content Migration

Your existing content is already converted to fallback data. To migrate to Strapi:

1. Start with Personal Info (single type)
2. Add Experience entries in order
3. Create Projects with proper categorization
4. Set up Skills with categories
5. Test contact form submissions

## Maintenance

- **Backups:** Export content regularly
- **Updates:** Keep Strapi updated for security
- **Monitoring:** Monitor API response times
- **Caching:** Consider CDN for media files

## Support

- Strapi Documentation: https://docs.strapi.io/
- Community Discord: https://discord.strapi.io/
- GitHub Issues: Create issues in your portfolio repo

## Next Steps

1. Set up Strapi instance (local or hosted)
2. Import content types from schema
3. Add your content through admin panel
4. Configure environment variables
5. Test dynamic content updates
6. Deploy to production

The portfolio works perfectly with or without Strapi - you're in complete control! 🚀