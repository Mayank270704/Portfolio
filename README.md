# Mayank Swaroop Nandan — Premium AI/ML Portfolio

A luxury architecture-inspired portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis smooth scrolling, and reusable ShadCN-style UI primitives.

## Overview

This portfolio mirrors a premium architecture studio experience while presenting the profile of an AI/ML Engineer. It is modular, multi-page, and content-driven, with every section built from reusable components and data files.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis smooth scrolling
- next-themes
- lucide-react

## Folder Structure

`
src/
+-- app/                 # App Router pages and global layout
+-- components/          # Reusable UI, layout, cards, sections, and animations
¦   +-- ui/
¦   +-- layout/
¦   +-- sections/
¦   +-- cards/
¦   +-- animations/
¦   +-- shared/
+-- hooks/               # Client hooks like Lenis smooth scroll
+-- lib/                 # Shared utility helpers
+-- data/                # All editable portfolio content
+-- styles/              # Global styling entrypoints
+-- public/              # Static assets including resume.pdf
`

## Editable Content

All portfolio content is stored inside the src/data directory. Update text, links, experience, skills, projects, and certificates without changing UI components.

- src/data/profile.ts
- src/data/navigation.ts
- src/data/skills.ts
- src/data/experience.ts
- src/data/projects.ts
- src/data/certificates.ts
- src/data/resume.ts

## Development

Install dependencies:

`ash
npm install
`

Start the development server:

`ash
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

`ash
npm run build
npm start
`

## Deployment Guide (Vercel)

1. Push the repository to GitHub.
2. Create a new Vercel project and import the repo.
3. Use the default Next.js settings.
4. Deploy.

Vercel will automatically build the app using the existing package.json scripts.

## Reusable Component Documentation

### src/components/layout

- Providers.tsx — wraps the app with theme support and Lenis smooth scrolling.
- Navbar.tsx — floating premium navigation with mobile menu and theme toggle.
- PageShell.tsx — page wrapper with shared header/footer and entry animation.
- Footer.tsx — persistent footer with navigation links.
- ThemeToggle.tsx — dark/light theme control.

### src/components/sections

Each page is rendered through an independent section component:

- HeroSection.tsx
- AboutSection.tsx
- SkillsSection.tsx
- ExperienceSection.tsx
- ProjectsSection.tsx
- CertificatesSection.tsx
- ResumeSection.tsx
- ContactSection.tsx

### src/components/cards

Reusable card patterns for consistent visual design:

- ProjectCard.tsx
- SkillCard.tsx
- CertificateCard.tsx

### src/components/ui

Shared UI primitives for consistent styling:

- Button.tsx
- GlassCard.tsx
- BrandIcon.tsx

### src/components/animations

Animation utilities are centralized in:

- motion-presets.ts — fadeUp, textReveal, staggerReveal, hoverGlow.

### src/hooks

- use-lenis.ts — initializes Lenis smooth scrolling in the client.

### src/lib

- utils.ts — shared helper functions such as cn().

## Notes

- The portfolio is fully static and pre-renders every route.
- This version includes a local public/resume.pdf file for the Resume download button.
- To customize the luxury aesthetic, adjust the Tailwind utility classes in the components and styles folders.

---

Enjoy building a premium, architecture-inspired AI/ML portfolio.
