# Amber Landon Services

<div align="center">
  <img src="https://i.ibb.co/qLmpGGkW/pexels-attie-9296985.jpg" alt="Amber Landon Services Banner" width="800">
  <br>
  <br>
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</div>

## Overview

Amber Landon Services is a modern, responsive business website for a global logistics and branding company. The website showcases comprehensive services including product branding & design, global procurement, air & sea cargo, and supplier visitations. Built with cutting-edge technologies, it provides an exceptional user experience with smooth animations, interactive elements, and a professional design.

## Features

### 🎨 **Modern Design & Animations**
- **Gradient Mesh Background**: Dynamic 3D gradient mesh canvas for visual depth
- **Particle Effects**: Interactive particle system with custom cursor integration
- **Smooth Transitions**: Fade-in, zoom, and slide animations throughout the site
- **Dark/Light Theme**: Automatic theme switching with smooth transitions
- **3D Tilt Effects**: Interactive card hover effects using Vanilla-Tilt.js

### 📋 **Comprehensive Service Showcase**
- **Product Branding & Design**: Complete brand identity and packaging design
- **Global Procurement**: Strategic sourcing from international suppliers
- **Air & Sea Cargo**: Reliable freight solutions with real-time tracking
- **Supplier Visitations**: On-site quality control and factory audits

### 🚀 **Advanced Functionality**
- **Live Chat Widget**: AI-powered chatbot for customer support
- **Cookie Consent Banner**: GDPR-compliant cookie management
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Performance Optimized**: Progressive image loading and optimized assets
- **SEO Ready**: Semantic HTML and structured data

### 📊 **Business Features**
- **Client Testimonials**: Interactive testimonial carousel with star ratings
- **Process Visualization**: Step-by-step service process with icons
- **Client Logos**: Rotating carousel of partner companies
- **Statistics Display**: Animated counters for business metrics
- **FAQ Section**: Comprehensive question and answer system

### 🎯 **User Experience**
- **Smooth Navigation**: Sticky header with scroll spy functionality
- **Contact Integration**: Professional contact form with validation
- **Accessibility**: Keyboard navigation and screen reader support
- **Fast Loading**: Optimized for performance and user engagement

## Tech Stack

### Frontend Technologies
- **React 19** - Modern component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom configuration

### Animation & Interaction Libraries
- **Swiper.js** - Touch-enabled sliders and carousels
- **Typed.js** - Animated text typing effects
- **Vanilla-Tilt.js** - 3D tilt effects for interactive elements
- **Custom Canvas Animations** - Gradient mesh and particle systems

### Icons & Assets
- **Ionicons** - Modern icon library
- **Clearbit Logo API** - Dynamic company logos
- **Pravatar** - Placeholder images for testimonials

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Modern Browser APIs** - Fullscreen, clipboard, and more

## Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/amber-landon-services.git
   cd amber-landon-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

### Development Workflow
- **Hot Reload**: Changes are automatically reflected in the browser
- **Type Checking**: TypeScript provides real-time type validation
- **Linting**: ESLint ensures code quality and consistency
- **Build Optimization**: Vite provides fast builds and optimizations

### Customization

#### Theme Colors
Modify the color scheme in `index.html`:
```javascript
colors: {
  navy: '#0F172A',
  'deep-blue': '#1E40AF',
  'orange-primary': '#F97316',
  'amber-primary': '#F59E0B',
  // ... more colors
}
```

#### Services Configuration
Update services in `constants.ts`:
```typescript
export const services = [
  {
    title: 'Your Service Name',
    description: 'Service description',
    details: 'Detailed service information',
    image: 'path/to/your/image.jpg',
    // ... more properties
  }
];
```

#### Navigation
Modify navigation links in `constants.ts`:
```typescript
export const navLinks = [
  { name: 'Page Name', href: '#section-id' },
  // ... more links
];
```

## Project Structure

```
amber-landon-services/
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with animations
│   ├── Services.tsx        # Services showcase
│   ├── About.tsx           # About us section
│   ├── Process.tsx         # Service process visualization
│   ├── Testimonials.tsx    # Client testimonials
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer with links
│   ├── ChatWidget.tsx      # AI chat widget
│   ├── CookieBanner.tsx    # Cookie consent
│   ├── CustomCursor.tsx    # Custom cursor effects
│   ├── GradientMeshCanvas.tsx  # 3D gradient background
│   ├── ParticlesCanvas.tsx     # Particle effects
│   └── ...                 # More components
├── hooks/                   # Custom React hooks
│   ├── useScrollAnimation.ts  # Scroll-triggered animations
│   └── useTheme.tsx           # Theme management
├── App.tsx                 # Main application component
├── index.tsx               # Application entry point
├── constants.ts            # Application constants and data
├── index.html              # HTML template with Tailwind config
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Contributing

We welcome contributions to improve Amber Landon Services! Here's how you can help:

### Development Guidelines
1. **Fork the repository** and create a feature branch
2. **Follow the existing code style** and naming conventions
3. **Write TypeScript** for all new components and utilities
4. **Test responsiveness** across different screen sizes
5. **Optimize performance** for animations and image loading
6. **Submit pull requests** with clear descriptions

### Code Style
- Use functional components with TypeScript
- Follow React best practices and hooks patterns
- Maintain consistent naming conventions
- Add proper TypeScript types for all props and functions
- Use semantic HTML elements

### Performance Considerations
- Implement lazy loading for images and components
- Optimize animations for smooth 60fps performance
- Minimize bundle size with code splitting
- Use efficient state management patterns

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and inquiries:
- **Email**: [contact@amberlandonservices.com](mailto:contact@amberlandonservices.com)
- **Website**: [amberlandonservices.com](https://amberlandonservices.com)
- **Business Hours**: Monday - Friday, 9:00 AM - 6:00 PM GMT

---

**Amber Landon Services** - Your trusted partner for global logistics and branding solutions. 🌍✨
