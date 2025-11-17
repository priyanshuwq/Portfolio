# Portfolio Codebase Guide

## Architecture Overview

This is a **single-config portfolio** built with Next.js 14 (App Router), optimized for quick customization via `src/data/resume.tsx`. The entire site structure—navigation, content, metadata—derives from this single data source (`DATA` object).

**Key principle:** Edit data, not components. Most content changes happen in `resume.tsx`, not in React components.

## Core Technology Stack

- **Framework:** Next.js 14 with App Router (RSC-first)
- **Styling:** TailwindCSS + shadcn/ui (New York style variant)
- **Animations:** Framer Motion via Magic UI components (`BlurFade`, `BlurFadeText`, `Dock`)
- **Theming:** next-themes with CSS variables (HSL color system)
- **Blog:** MDX files in `/content` with gray-matter frontmatter + unified/rehype pipeline
- **Package Manager:** pnpm

## Project Structure

```
src/
├── data/resume.tsx       # Single source of truth for all portfolio data
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Homepage - all sections render from DATA
│   ├── layout.tsx       # Root layout with theme provider
│   └── blog/[slug]/     # Dynamic blog routes
├── components/
│   ├── magicui/         # Custom animation components (BlurFade, Dock)
│   ├── ui/              # shadcn/ui components (Avatar, Badge, Button, etc.)
│   └── navbar.tsx       # Fixed bottom dock navigation
└── lib/utils.ts         # cn() helper + date formatting
```

## Development Workflow

### Commands
- `pnpm dev` - Start dev server (uses Next.js 14 turbopack)
- `pnpm build` - Production build
- `pnpm lint` - ESLint checks

### Making Content Changes
1. Open `src/data/resume.tsx`
2. Edit the `DATA` export object (name, work experience, projects, skills, etc.)
3. Changes reflect immediately—no component modifications needed

### Adding Blog Posts
1. Create `content/{slug}.mdx`
2. Add frontmatter: `title`, `publishedAt`, `summary`, `image` (optional)
3. Write content in MDX
4. File automatically appears at `/blog/{slug}`

## Component Patterns

### Animation System
All animations use Magic UI's `BlurFade` components with staggered delays:
```tsx
<BlurFade delay={BLUR_FADE_DELAY * N}>
  <Component />
</BlurFade>
```
Increment `N` for each section to create cascading entrance effects.

### Data Rendering
Components map over `DATA` arrays (work, education, projects, etc.):
```tsx
{DATA.work.map((work, id) => (
  <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
    <ResumeCard {...work} />
  </BlurFade>
))}
```

### Theme Toggle
Uses `next-themes` with ThemeProvider. The project includes an advanced `ThemeToggleButton` component with View Transitions API support:

**Location:** `src/components/theme/ThemeSwitch.tsx`

**Features:**
- Animated theme transitions using View Transitions API
- Multiple animation variants: `circle`, `rectangle`, `polygon`, `circle-blur`, `gif`
- Configurable start positions: `center`, `top-left`, `top-right`, `bottom-left`, `bottom-right`, etc.
- Optional blur effects
- Graceful fallback for browsers without View Transitions API support

**Usage:**
```tsx
import { ThemeToggleButton } from "@/components/theme/ThemeSwitch";

// Basic usage (default: circle animation from center)
<ThemeToggleButton />

// Custom animation
<ThemeToggleButton 
  variant="rectangle" 
  start="bottom-up" 
  blur={true} 
/>

// Available variants:
// - 'circle' - circular wipe transition
// - 'rectangle' - directional wipe (requires directional start like 'bottom-up')
// - 'polygon' - diamond/polygon-shaped transition
// - 'circle-blur' - circular transition with blur effect
// - 'gif' - custom GIF mask transition (requires gifUrl prop)
```

**Animation Configuration:**
The animations use CSS custom properties defined in `globals.css`:
- `--expo-out`: cubic-bezier(0.16, 1, 0.3, 1) - smooth deceleration
- `--expo-in`: cubic-bezier(0.7, 0, 0.84, 0) - smooth acceleration

## Styling Conventions

### Tailwind + shadcn/ui
- Uses **New York** style variant (rounded corners, subtle shadows)
- CSS variables for theming: `--background`, `--foreground`, `--primary`, etc.
- Color system: HSL values in `globals.css` (`:root` and `.dark`)
- Utility function: `cn()` from `lib/utils.ts` for conditional classes

### Typography
- Font: Inter (variable font via next/font/google)
- Prose styles via `@tailwindcss/typography` for blog content
- Code blocks: rehype-pretty-code with `min-light`/`min-dark` themes

### Layout
- Max width: `max-w-2xl` centered (`mx-auto`)
- Padding: Responsive (`py-12 sm:py-24 px-6`)
- Navbar: Fixed bottom dock with backdrop blur

## Blog System

### Processing Pipeline
MDX → gray-matter → unified → remark-gfm → rehype-pretty-code → HTML string

Key functions in `src/data/blog.ts`:
- `getBlogPosts()` - Returns all posts with metadata
- `getPost(slug)` - Fetches single post, converts MDX to HTML
- `markdownToHTML()` - Unified pipeline with syntax highlighting

### Code Highlighting
Uses `rehype-pretty-code` + Shiki. Configured for:
- Line numbers via `code[data-line-numbers]`
- Dual themes (light/dark) via CSS custom properties
- GitHub Flavored Markdown via `remark-gfm`

## Special Components

### Dock Navigation (`navbar.tsx`)
Fixed bottom navigation using Magic UI `<Dock>`:
- Renders `DATA.navbar` links + social icons where `navbar: true`
- Includes theme toggle
- Backdrop blur effect with gradient mask

### Icons System
Icons from `src/components/icons.tsx` and lucide-react. Social icons stored in `DATA.contact.social` with JSX elements as values.

## Adding New Features

### New Page Route
1. Create `src/app/{route}/page.tsx`
2. Add route to `DATA.navbar` in `resume.tsx`
3. Use `BlurFade` animations for consistency

### New UI Component
Use shadcn/ui CLI:
```bash
npx shadcn-ui@latest add [component-name]
```
Components auto-install to `src/components/ui/`

### Custom Animation Component
Reference existing Magic UI components in `src/components/magicui/` for patterns. Use Framer Motion's motion components with viewport triggers.

## Performance Notes

- Static generation via `generateStaticParams()` for blog routes
- Images should be placed in `/public` (e.g., `/me.png`, `/atomic.png`)
- Videos use external CDN URLs (see project cards in `resume.tsx`)
- Metadata generated from `DATA` object in `layout.tsx`

## Common Pitfalls

1. **Don't modify components for content changes** - Edit `resume.tsx` instead
2. **Maintain BLUR_FADE_DELAY increments** - Breaks animation cascade if inconsistent
3. **MDX frontmatter is required** - Posts need `title`, `publishedAt`, `summary`
4. **Icon objects must be JSX** - In `DATA.contact.social`, icons are React components, not strings
5. **Theme colors are HSL** - Format: `210 11.1% 3.53%` (no `hsl()` wrapper in CSS variables)

## Key Files to Reference

- `src/data/resume.tsx` - All portfolio data
- `src/app/page.tsx` - Homepage structure/sections
- `src/components/navbar.tsx` - Navigation pattern
- `tailwind.config.ts` - Theme configuration
- `src/app/globals.css` - Color variables and code block styling
