# Overview

This is a Piet Programming Tool - a visual programming environment where users can create programs using colored grid cells. Piet is an esoteric programming language where programs are represented as abstract images made up of colored blocks. The application provides a modern web-based interface for creating, editing, and managing Piet programs with features like drawing tools, color palettes, undo/redo functionality, and export capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **State Management**: React hooks with custom state management for canvas operations, undo/redo functionality, and application settings
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom design system including iOS-inspired design tokens and Piet-specific color palette

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: Hot Module Replacement (HMR) with Vite integration for seamless development workflow
- **API Design**: RESTful API structure with `/api` prefix for all backend routes

## Data Storage Solutions
- **Primary Database**: PostgreSQL for persistent data storage
- **ORM**: Drizzle ORM with migrations support for schema management
- **Session Management**: Database-backed sessions for user state persistence
- **Local Storage**: Browser localStorage for user preferences like theme and language settings
- **In-Memory Storage**: Fallback memory storage implementation for development/testing

## Authentication and Authorization
- **User Management**: Simple username/password authentication system
- **Session Handling**: Server-side session management with PostgreSQL storage
- **Schema**: User table with unique username constraints and password storage

## Key Features
- **Canvas Editor**: Interactive grid-based drawing canvas with multiple tools (brush, fill, eraser, eyedropper, select)
- **Color Management**: Complete Piet color palette with 20 standard colors (light/normal/dark variants of red, yellow, green, cyan, blue, magenta, plus white and black)
- **Tool System**: Multiple drawing tools with adjustable brush sizes and grid visibility options
- **Undo/Redo**: Full undo/redo functionality for canvas operations
- **Export/Import**: PNG export capabilities and local storage save/load functionality
- **Internationalization**: Multi-language support (English/German) with React Context
- **Theme System**: Light/dark/system theme support with CSS custom properties
- **Responsive Design**: Mobile-friendly interface with touch support

# External Dependencies

## Core Technologies
- **Neon Database**: Serverless PostgreSQL database hosting with `@neondatabase/serverless` driver
- **Drizzle**: Modern TypeScript ORM with PostgreSQL dialect for type-safe database operations
- **React Ecosystem**: React 18, TanStack Query for data fetching, React Hook Form for form management

## UI and Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives for building the interface
- **Tailwind CSS**: Utility-first CSS framework with custom design system configuration
- **Lucide React**: Modern icon library for consistent iconography
- **Class Variance Authority**: Utility for creating type-safe CSS class variants

## Development Tools
- **Vite**: Fast build tool with HMR support and React plugin
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundler for production builds
- **PostCSS**: CSS preprocessing with Tailwind CSS integration

## Additional Libraries
- **Wouter**: Lightweight routing library for client-side navigation
- **Sonner**: Toast notification system for user feedback
- **Date-fns**: Date manipulation and formatting utilities
- **Nanoid**: Secure URL-friendly unique ID generator