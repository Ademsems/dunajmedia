# Dunajmedia — Project Context for Claude

## Project Overview
**Dunajmedia** is the agency's own marketing website for Adem Sems Asha's web/digital agency.
- **Live**: https://dunajmedia.sk
- **Repo**: https://github.com/Ademsems/dunajmedia (branch: `main`)
- **Deployed via**: Vercel (auto-deploy on push to `main`)
- **Local dev**: `npm run dev` → http://localhost:3000
- **Build check**: `npm run build` — must pass with zero errors before any push

## Legal Entity
Dunajmedia is a **sole trader (živnosť)**, NOT an s.r.o.
- Full legal name: **Adem Sems Asha — Dunajmedia**
- IČO: 55028012 | DIČ: 3121392923
- Registered: Živnostenský register, Okresný úrad Bratislava
- Address: Obchodná 12, 811 06 Bratislava, Slovenská republika
- **Never write "Dunajmedia s.r.o."** anywhere — it is legally wrong

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + custom design tokens (navy/aqua color scheme)
- **Framer Motion** for animations
- **Lucide React** for icons
- **Vercel** for hosting
- **Sanity CMS** for blog (`/blog` fetches from Sanity GROQ; `/studio` is the CMS UI)
- **i18n**: Client-side via `LanguageContext` — see `src/context/LanguageContext.tsx`

## i18n System
- Language files: `src/messages/sk.json` (Slovak, default) and `src/messages/en.json` (English)
- Hook: `const { t, tArray, locale } = useLanguage()` — `t('key.path')` returns a string
- Many components use inline `isSk ? skText : enText` instead of JSON keys (both patterns exist)
- Language toggle is in the navbar

## Key Files
```
src/
  app/
    layout.tsx                    — root metadata (authors, publisher, OG tags)
    page.tsx                      — homepage (imports Hero, AboutSnippet, Services, WorkShowcaseSection, PricingTable, CTABanner, ContactForm)
    about/page.tsx + AboutPage.tsx
    how-we-work/page.tsx + HowWeWorkPageClient.tsx
    work/page.tsx + WorkPageClient.tsx
    work/rkc-technology/page.tsx    — case study placeholder, links to advancednavigation.sk
    work/grand-apartman/page.tsx   — case study placeholder, links to grandapartman.sk
    services/
      page.tsx + ServicesPage.tsx — services overview
      tvorba-web-stranok/page.tsx + WebDesignPageClient.tsx
      seo-optimalizacia/page.tsx + SEOPageClient.tsx
      sprava-socialnych-sieti/page.tsx + SocialMediaPageClient.tsx
    pricing/page.tsx + PricingPageClient.tsx
    contact/page.tsx + ContactPageClient.tsx
    blog/                         — fetches from Sanity
  components/
    Hero.tsx                      — homepage hero with stats bar
    AboutSnippet.tsx              — homepage "who we are": Row 1 text+mockup image, Row 2 4-card strip
    HomePricingTeaser.tsx         — 'use client' wrapper for homepage pricing section (bilingual)
    WorkShowcase.tsx              — demo-only card grid; compact prop for homepage; client cards live in WorkPageClient
    WorkShowcaseSection.tsx       — wrapper for homepage work section
    Footer.tsx                    — shared footer with legal info
    CTABanner.tsx                 — shared CTA banner
    ContactForm.tsx               — shared contact form (used on most pages)
    PricingTable.tsx              — pricing cards (used on /pricing, /services/tvorba-web-stranok, homepage)
    ServiceFAQ.tsx                — accordion FAQ component
  messages/
    sk.json                       — Slovak translations
    en.json                       — English translations
  context/
    LanguageContext.tsx           — i18n provider
```

## Pricing (correct as of 2026)
- **Expres Start**: €349 (1-page, 48h delivery)
- **Business Pro**: €549 (up to 10 pages, 72h delivery)
- **Agency Elite**: €999 (unlimited pages, 2+ weeks)
- Starting price is **€349**, not €299 — never write €299 for Dunajmedia pricing

## Real Client Work (/work page — Group A)
- **RKC Technology** → https://advancednavigation.sk | image: `/public/our-work/advancednavigation.png` | case study: `/work/rkc-technology`
- **Grand Apartman** → https://grandapartman.sk | image: `/public/our-work/grandapartman.png` | case study: `/work/grand-apartman`

## Demo Sites (WorkShowcase — Group B, also homepage + web design page)
All images moved to `/public/our-work/`:
1. Barbershop → https://barber.dunajmedia.sk/ | `/public/our-work/barber-preview.jpg`
2. Hair Salon → https://hairsalon.dunajmedia.sk/ | `/public/our-work/hairsalon-preview.jpg`
3. Beauty & Wellness → https://salon.dunajmedia.sk/demo | `/public/our-work/salon-preview.jpg`
4. Law Firm → https://lawfirm.dunajmedia.sk/ | `/public/our-work/lawfirm-preview.png`

## Image Assets
- `/public/mockup.PNG` — website mockup shown in AboutSnippet (homepage)
- `/public/about/adem.jpg` — founder photo shown in AboutPage story section
- `/public/web-design/nextjs.jpg`, `tailwindcss.png`, `Framer-Motion.png`, `logo-vercel.png` — tech logos in WebDesignPageClient

## Services Offered (current)
- Tvorba web stránok (Web Design)
- SEO Optimalizácia (AI-Driven SEO)
- Správa Sociálnych Sietí (Social Media Management)
- Growth Marketing
- Branding & Dizajn
- Analytika & Reporting
- **NOT offered**: PPC campaigns as a standalone service — remove all PPC references from service descriptions

## Stats (accurate, as of 2026)
- 11+ years in marketing
- 48h website delivery (Expres Start)
- 100% modern tech-stack
- **Do NOT use**: 250+ projects, 98% satisfaction, 8+ countries — these were placeholder stats

## Contact
- No walk-in office; meetings by appointment
- Email: info@dunajmedia.sk
- Phone: +421 952 049 119
- Hours: Mon–Fri 9:00–18:00
- Based in Bratislava — **"stretnutia po dohode"**, not "navštívte naše štúdio"

## Key Decisions & Patterns
- All page-level components follow Server Component (page.tsx exports metadata) + Client Component (PageClient.tsx with 'use client') pattern
- Most service/about pages use inline SK/EN strings (`isSk ? 'Slovak' : 'English'`) rather than JSON keys
- WorkShowcase.tsx holds demo-only project data (Group B) — used on homepage (compact) and web design page
- Real client cards (Group A) are defined inline in WorkPageClient.tsx — edit there to add/update client projects
- Server Components (case study pages) cannot use useLanguage() — use inline bilingual text or extract a 'use client' child
- Footer legal info is hardcoded in Footer.tsx (not in JSON) — Identifikačné údaje and SOI section
- Blog listing uses Sanity GROQ query with revalidation; `/studio` is noindexed
- Cookie banner is a shared client component — test at 375px after any footer/layout changes

## Before Pushing
1. `npm run build` — zero errors required
2. `npm run dev` — spot-check homepage, about, all service pages, pricing, contact
3. Toggle SK/EN on at least 2 pages to confirm i18n keys work
4. Check homepage stats (3 tiles), cookie banner at 375px, FAQ accordions expand
5. `git add . && git commit -m "..."  && git push`
