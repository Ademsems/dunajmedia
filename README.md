# Dunajmedia — Premium Digital Agency Website

A production-ready Next.js 14 website for Dunajmedia, a premium digital agency based in Bratislava.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **i18n**: Client-side Context API (no next-intl, no [locale] folders)
- **Styling**: Tailwind CSS with custom Navy/Aqua palette
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Syne (display) + DM Sans (body) + DM Mono

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (TopBar + Navbar + LanguageProvider + Footer)
│   ├── page.tsx            # Home page (Hero + Services + Pricing + CTA + ContactForm)
│   ├── about/              # About page
│   ├── services/           # Services page
│   ├── blog/               # Blog page
│   ├── pricing/            # Pricing page
│   └── contact/            # Contact page
├── components/
│   ├── TopBar.tsx          # Global top bar (email, phone, language toggle)
│   ├── Navbar.tsx          # Sticky navigation with mobile menu
│   ├── Footer.tsx          # Global footer
│   ├── ContactForm.tsx     # Global contact form (placed on every page)
│   ├── Hero.tsx            # Video background hero section
│   ├── Services.tsx        # Services grid for home
│   ├── AboutSnippet.tsx    # About teaser for home
│   ├── PricingTable.tsx    # Pricing tiers component
│   └── CTABanner.tsx       # Call-to-action banner
├── context/
│   └── LanguageContext.tsx # i18n provider with nested JSON path support
└── messages/
    ├── sk.json             # Slovak translations
    └── en.json             # English translations
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#0A192F` | Primary background |
| `navy-light` | `#112240` | Secondary background |
| `aqua` | `#64FFDA` | Primary accent, CTAs |
| `aqua-electric` | `#00E5FF` | Secondary accent |
| `slate-text` | `#8892B0` | Body text |
| `slate-light` | `#CCD6F6` | Subheadings |
| `slate-lightest` | `#E6F1FF` | Headlines |

## Pricing Tiers

| Tier | Price | Delivery |
|------|-------|----------|
| Expres Start | €299 | 48h |
| Business Pro | €549 | 72h |
| Agency Elite | €999 | 2+ weeks |

## Languages
- Default: **Slovak (SK)**
- Available: **English (EN)**
- Toggle: Persistent via `localStorage` in the Top Bar

## Deployment (Vercel)

```bash
vercel deploy
```

No special environment variables required. The i18n is fully client-side.

## Hero Video

Place your hero video at `public/hero-video.mp4`. The video is already included from the original upload.

---

© 2025 Dunajmedia s.r.o. — info@dunajmedia.sk — +421 952 049 119
