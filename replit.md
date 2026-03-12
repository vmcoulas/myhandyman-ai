# Replit.md

## Overview

This is a family-friendly furniture building instruction generator called "MyHandyman AI". The application allows users to upload images of furniture and automatically generates step-by-step building instructions using OpenAI's GPT-5 model. The app focuses on creating safe, educational projects that parents and children can build together, with appropriate safety warnings and adult supervision indicators.

## Recent Enhancements (MVP Features)

### Freemium Model Implementation
- **User Management**: Anonymous user system with usage tracking
- **Build Limits**: Free users get 3 builds per month, premium users get unlimited
- **Usage Tracking**: Progress bars and warnings when approaching limits
- **Upgrade Prompts**: Clear calls-to-action for premium subscription ($4.99/month)

### Enhanced Results Display
- **Cost Estimates**: Materials now include estimated costs and quantities
- **Affiliate Links**: Buy buttons for materials (Amazon/Home Depot integration ready)
- **Category Classification**: Projects categorized as furniture, toys, gadgets, or other
- **Difficulty Ratings**: Easy, Medium, Hard (previously Beginner/Intermediate/Advanced)
- **Export Functionality**: Download projects as text files (PDF generation ready)
- **Social Sharing**: Share projects via native sharing API or clipboard

### User Feedback System
- **Star Ratings**: 5-star rating system for project quality
- **Helpful/Not Helpful**: Binary feedback for instruction clarity
- **Comments**: Optional text feedback for detailed suggestions
- **Feedback Storage**: All feedback tracked for AI improvement

### Realistic Community Projects (August 2025)
- **AI-Generated Images**: Realistic furniture photographs using AI image generation
- **Database Integration**: Community favorites loaded from PostgreSQL with actual project data
- **Professional Photography Style**: Authentic-looking images in home environments
- **Static Asset Serving**: Proper image delivery system for generated content

### Monetization Features
- **Usage Limits**: Enforced freemium model with upgrade prompts
- **Affiliate Revenue**: Material links ready for commission tracking
- **Premium Tier**: Infrastructure for subscription management
- **Export Features**: Premium-only functionality planned

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **Form Handling**: React Hook Form with Hookform/resolvers for form validation
- **File Structure**: Clean separation with `client/src/` containing all frontend code, organized by components, pages, hooks, and utilities

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with endpoints for project management and image analysis
- **Image Processing**: Multer for file upload handling with Sharp for image optimization
- **AI Integration**: OpenAI GPT-4o for furniture analysis and instruction generation
- **Error Handling**: Centralized error handling middleware with structured error responses

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

### Database Schema Design
- **Users Table**: Manages user accounts with usage tracking (buildsUsed, maxBuilds), premium status, and anonymous user support
- **Projects Table**: Enhanced with cost estimates, category classification, user relationships, detailed material specifications including affiliate links, and realistic image URLs
- **Instructions Table**: Step-by-step building instructions with safety warnings and adult supervision requirements
- **Feedback Table**: User feedback system with star ratings, helpful/not helpful flags, and detailed comments
- **Static Assets**: AI-generated images stored in attached_assets/generated_images/ served via Express static middleware
- **Relationships**: 
  - Users → Projects (one-to-many)
  - Projects → Instructions (one-to-many)
  - Projects → Feedback (one-to-many)
  - Users → Feedback (one-to-many)

### Authentication and Authorization
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Security**: CORS configuration and secure session handling
- **File Upload Security**: Image file type validation and size limits (10MB maximum)

## External Dependencies

### AI Services
- **OpenAI GPT-5**: Primary AI service for analyzing repair images and generating detailed building instructions with safety considerations

### Database Services
- **Neon Database**: Serverless PostgreSQL database provider for production data storage
- **Drizzle ORM**: Type-safe ORM with PostgreSQL dialect for database operations

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Unstyled, accessible UI components as the foundation for shadcn/ui
- **shadcn/ui**: Pre-built component library following modern design patterns
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS processing for Tailwind CSS integration

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx + twMerge**: Conditional CSS class handling optimized for Tailwind
- **class-variance-authority**: Type-safe variant API for component styling
- **zod**: Schema validation for API inputs and database operations