# Dunajmedia — Project Context for Claude

## Project Overview
**Dunajmedia** is the agency's own marketing website for Adem Sems Asha's web/digital agency.
- **Live**: https://dunajmedia.sk
- **Repo**: https://github.com/Ademsems/dunajmedia (branch: `main`)
- **Deployed via**: Vercel (auto-deploy on push to `main`)
- **Local dev**: `npm run dev` → http://localhost:3000
- **Build check**: `npm run build` — must pass with zero errors before any push
- **Node.js version**: not pinned in code — no `engines` field in `package.json`, no `.nvmrc`/`.node-version`/`.tool-versions`, no `vercel.json`. Version is controlled entirely via the Vercel dashboard's Node.js Version setting. Checked 2026-08-16 ahead of Vercel's Node 20 deprecation (2026-10-01) — dashboard should be set to 24.x there; no code change was needed since nothing pins a version.

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
    page.tsx                      — homepage (imports Hero, AboutSnippet, Services, HomeTestimonial, WeAreGlocalSection, HomePricingTeaser, CTABanner, ContactForm)
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
    HomeTestimonial.tsx           — 'use client' featured testimonial section (between Work and Pricing on homepage); quote always in English; Simon Wheeler, Grand Apartman
    WorkShowcase.tsx              — demo-only card grid (used on /work only; client cards live in WorkPageClient)
    WeAreGlocalSection.tsx        — 'use client' homepage section: Dunajmedia as Founding Agency of WeAreGlocal; strings in sk/en.json under `home.weareglocal.*`
    Footer.tsx                    — shared footer with legal info
    CTABanner.tsx                 — shared CTA banner
    ContactForm.tsx               — shared contact form (used on most pages)
    PricingTable.tsx              — pricing cards (used on /pricing, /services/tvorba-web-stranok, homepage)
    ServiceFAQ.tsx                — accordion FAQ component
    JsonLd.tsx                    — server component: renders <script type="application/ld+json"> from a data object (escapes `<` as <)
  messages/
    sk.json                       — Slovak translations
    en.json                       — English translations
  context/
    LanguageContext.tsx           — i18n provider
  lib/
    gtag.ts                       — gaEvent() helper for firing GA4 custom events client-side
    jsonld.ts                     — pure builders: blogPostingJsonLd(), faqPageJsonLd(), SITE_URL
    sanity.ts                     — Sanity client + GROQ queries (getPostBySlug also fetches _updatedAt and faq)
```

## Pricing (correct as of 2026)
- **Expres Start**: €349 (1-page, 48h delivery)
- **Business Pro**: €549 (up to 10 pages, 72h delivery)
- **Agency Elite**: €999 (unlimited pages, 2+ weeks)
- Starting price is **€349**, not €299 — never write €299 for Dunajmedia pricing

## Real Client Work (/work page — Group A)
- **RKC Technology** → https://advancednavigation.sk | image: `/public/our-work/advancednavigation.png` | case study: `/work/rkc-technology`
- **Grand Apartman** → https://grandapartman.sk | image: `/public/our-work/grandapartman.png` | case study: `/work/grand-apartman`

## Demo Sites (WorkShowcase — Group B, /work page only)
All images moved to `/public/our-work/`:
1. Barbershop → https://barber.dunajmedia.sk/ | `/public/our-work/barber-preview.jpg`
2. Hair Salon → https://hairsalon.dunajmedia.sk/ | `/public/our-work/hairsalon-preview.jpg`
3. Beauty & Wellness → https://salon.dunajmedia.sk/demo | `/public/our-work/salon-preview.jpg`
4. Law Firm → https://lawfirm.dunajmedia.sk/ | `/public/our-work/lawfirm-preview.png`

## Branding (new logo + brandmark — 2026-10-30)
- Files in `public/branding/` (SVG masters extracted from the vector `.ai`; trimmed viewBox, no background, `fill`s explicit — they do NOT inherit `currentColor` because they're loaded via `<img>`):
  - `dunajmedia-logo.svg` — **wordmark, two-tone** (white "Dunaj" + cyan `#00f0ff` "Media"); aspect 6.02:1 (viewBox 989.91×164.35). Default for the dark navy site. Variants: `-white.svg` (all white), `-dark.svg` (`#1e293b`, for light backgrounds)
  - `dunajmedia-brandmark.svg` — **icon/swoosh symbol**, cyan; aspect 1.56:1 (328.08×209.85). Variants: `-white.svg`, `-dark.svg`
  - `dunajmedia-logo.png` (1601×267) and `dunajmedia-brandmark.png` (801×513) — transparent PNG fallbacks
- Terminology: designer's "Brandmark-*.png" files = the wordmark; "Icon-*.png" = the symbol. The `Artboard*.png` exports were blank and not used. The master `DunajMedia- Brandmark.ai` (PDF-based, 6 artboards) is kept outside the repo — regenerate assets from it with PyMuPDF (`page.get_svg_image()`), artboards: 0/2/4 = wordmark white/dark/two-tone, 1/3/5 = icon white/dark/cyan
- **Navbar** (`Navbar.tsx`): `next/image` of `dunajmedia-logo.svg`, intrinsic `width=181 height=30`, rendered `h-6` (24px, 145px wide) on mobile / `sm:h-7` (28px, 169px wide), `priority`, `unoptimized` (SVG). Old icon+divider+text wordmark and animated underline removed
- **Footer** (`Footer.tsx`): same SVG, intrinsic `193×32`, rendered `h-8` (32px)
- **Favicon/metadata** use Next file conventions in `src/app/`: `favicon.ico` (16/32/48), `icon.png` (512×512, cyan brandmark on navy `#0A192F` rounded square), `apple-icon.png` (180×180, opaque navy). The old `icons: {...}` block in `layout.tsx` and `public/logo.png` were removed — don't re-add (an explicit `icons` entry overrides the file convention)
- **OG image**: `public/og-image.jpg` (1200×630, navy gradient + two-tone wordmark). Referenced by `layout.tsx` (OpenGraph, Twitter, JSON-LD) — this file did not exist before, so social previews were broken until now
- No "Built by DunajMedia" badges or other logo placements exist in the codebase (checked: only Navbar, Footer, layout metadata)

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

## Analytics (GA4)
- Google Analytics 4 is wired via `@next/third-parties/google` (`GoogleAnalytics` component) in the root layout (`src/app/layout.tsx`)
- Measurement ID comes from `process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID` (set in Vercel) — **never hardcode a GA ID**; component is skipped entirely if the env var is unset (safe for local dev, which has no `.env` file)
- Event helper: `src/lib/gtag.ts` exports `gaEvent(action, params)` — no-ops safely if `window.gtag` isn't loaded
- Three custom events in use, fired via `gaEvent()` from `onClick` handlers:
  - `generate_lead` — fires in `ContactForm.tsx` only after `/api/contact` responds `ok` (not on open/failure); GA4-recommended name, importable as a Google Ads conversion
  - `contact_click` — fires on every `tel:` link click (TopBar, Footer, ContactForm info card, ContactPageClient info card); `event_label: 'phone_click'`
  - `cta_click` — secondary engagement signal on primary "/contact" CTA buttons (CTABanner, Hero, Navbar desktop + mobile)
- `@next/third-parties` was installed at `^16.3.0` against Next.js 14.2.5 — a large major-version gap upstream; if GA stops working after a Next.js upgrade, check this package's changelog first

## Navbar CTA (mobile visibility — 2026-09-04)
- The "Get Started"/"Začnime" CTA (`t('nav.cta')`, from `sk.json`/`en.json`) used to be wrapped in `hidden lg:flex` in `Navbar.tsx` — invisible on mobile except inside the opened hamburger menu, which meant no CTA was visible above the fold on mobile without opening the menu first
- Fixed: the CTA `Link` now sits in the same always-visible flex group as the mobile hamburger toggle, with responsive Tailwind sizing (`text-xs lg:text-sm`, `px-3.5 lg:px-5`, `py-2 lg:py-2.5`) so it renders as a compact button in the sticky header at all breakpoints — desktop appearance is unchanged (the `lg:` values match the old fixed values exactly)
- The old duplicate CTA link inside the expanded mobile dropdown menu was removed since the header CTA is now always visible — don't re-add it there, it would be a redundant duplicate
- This is a global Navbar change, so it affects every page's mobile header, not just `/services/tvorba-web-stranok`

## Web Design Page (/services/tvorba-web-stranok) — testimonial swap (2026-09-04)
- The old "See Our Live Demos" section (rendered `<WorkShowcase />`) was removed from `WebDesignPageClient.tsx` — this page's Google Ads traffic should land on a conversion-focused testimonial, not the demo template grid
- Replaced in the same position (between the Process section and Pricing) with `<HomeTestimonial />` — the same component and content used on the homepage (Simon Wheeler / Grand Apartman quote, always-English quote, links to `/work/grand-apartman`); reused as-is, not duplicated or rewritten
- `WorkShowcase` demo grid remains on the homepage and `/work` page — only removed from this one service page

## SEO Page (/services/seo-optimalizacia) — GSC keyword refresh (2026-10-05)
- Copy lives inline in `SEOPageClient.tsx` (not in `sk.json`/`en.json` — there are no `services.seo` keys); edit it there
- Refreshed to target Search Console striking-distance queries: `seo firma bratislava`, `seo firmy`/`seo firma`, `seo služby`, `seo na slovensku`, `správa seo`, `mediálna agentúra`
- Changed: hero paragraph ("moderná SEO firma v Bratislave…"), "Why Different" intro (modern media agency / Next.js / GEO), process step 05 (now "Správa SEO a Reporting" / "SEO Management and Reporting"), and the closing CTA paragraph
- **No fixed SEO pricing, ever** — SEO stays audit-driven / custom quote ("individuálna cenová ponuka"). All pricing touchpoints on this page must point to a free audit or custom quote, never packages or tiers

## Homepage demo removal + WeAreGlocal, CTA consolidation (2026-10-15)
- Homepage demo section (`WorkShowcaseSection.tsx`) deleted — demos live only on `/work`
- New `WeAreGlocalSection.tsx` (after `HomeTestimonial`, before pricing): Dunajmedia is a **Founding Agency** of WeAreGlocal, a curated global network of independent digital agencies; outbound link to https://weareglocal.com (`target=_blank`, `rel=noopener noreferrer`). Copy is bilingual via `home.weareglocal.*` in `sk.json`/`en.json`
- Service pages (Web Design, SEO, Social Media) previously stacked 4 CTAs at the bottom (closing CTA section, `CTABanner`, then the form). Now each ends with **one** unified CTA: `<ContactForm headline=… subtitle=… />`
- `ContactForm` accepts optional `headline`/`subtitle` props (falls back to the generic `contact.form.headline`/`contact.hero.sub` elsewhere). Per-page keyworded headlines: "Custom Next.js web design" / "AI-driven SEO" / "Data-driven social media management" — keep keywords in these, not generic "Contact us"
- Don't re-add `CTABanner` or a separate closing CTA section to these three service pages. Homepage and other pages still use `CTABanner` + `ContactForm`

## Blog structured data (JSON-LD — 2026-11-05)
- `src/app/blog/[slug]/page.tsx` renders `<JsonLd>` scripts built by `src/lib/jsonld.ts`. They are plain `<script type="application/ld+json">` tags (NOT `next/script`, NOT `generateMetadata`) via the server component `src/components/JsonLd.tsx`, which does `JSON.stringify(data).replace(/</g, '\u003c')` so post text can never close the script tag
- **BlogPosting** is always emitted: headline = `title`; description = `excerpt` (trimmed — there is no separate meta-description field in the schema; `generateMetadata` also uses `excerpt`); image = hero `mainImage` (1400×700 crop, same as the on-page hero); `datePublished` = `publishedAt`; `dateModified` = Sanity `_updatedAt`, **clamped to `publishedAt` if it would be earlier** (editors can backdate `publishedAt` — this happened on `web-dizajn-trendy`); `inLanguage` `sk-SK`; author and publisher = Organization "Dunajmedia"; `mainEntityOfPage` = `https://dunajmedia.sk/blog/<slug>`. Fields that are empty are omitted
- **FAQPage** is emitted only when the post has FAQ items. New optional Sanity field `faq` (array of `{question, answer}`) in `src/sanity/schemas/post.ts`; items with a blank question or answer are dropped. Editors fill it in `/studio` (Studio is part of this app, so schema changes ship with the push)
- Google's rule: FAQ markup must match content **visible on the page**. The `faq` field is not rendered visibly by the template — authors must also include the same Q&A in the article body
- The site-wide LocalBusiness JSON-LD in `layout.tsx` is separate and untouched; each post page therefore has 2 scripts (3 with FAQ)
- **Local dev/build with Sanity:** `.env` isn't in the repo, so `npm run build` fails on `/sitemap.xml` and `/blog/[slug]` ("Configuration must contain `projectId`"). The project ID and dataset are public (also hardcoded in `sanity.config.ts`): run with `NEXT_PUBLIC_SANITY_PROJECT_ID=8rfcu2ua NEXT_PUBLIC_SANITY_DATASET=production` set in the shell for a full, error-free local build against real posts. Never write API tokens into the repo

## Key Decisions & Patterns
- All page-level components follow Server Component (page.tsx exports metadata) + Client Component (PageClient.tsx with 'use client') pattern
- Most service/about pages use inline SK/EN strings (`isSk ? 'Slovak' : 'English'`) rather than JSON keys
- WorkShowcase.tsx holds demo-only project data (Group B) — now used on /work only (removed from homepage and web design page)
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
