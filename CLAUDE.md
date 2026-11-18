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
- **Framer Motion** for animations (also powers toasts, cursor reticle, card stacks — no extra animation/toast dependency)
- **ESLint**: `.eslintrc.json` extends `next/core-web-vitals` (+ `@typescript-eslint` plugin so existing `eslint-disable` comments resolve); `npm run lint` must pass
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
    PortableTable.tsx             — server component: renders Sanity `table` blocks in blog posts (thead/tbody, scrolls on mobile, brand colors)
    JsonLd.tsx                    — server component: renders <script type="application/ld+json"> from a data object (escapes `<` as <)
    Preloader.tsx                 — once-per-session counter intro (see "Motion layer")
    CustomCursor.tsx              — toggles the aqua arrow cursor classes on fine pointers; renders nothing (see "Motion layer")
    Toaster.tsx                   — ToastProvider + useToast() (frosted navy toasts)
    CopyButton.tsx                — copy email/phone icon button, confirms with a toast
    KineticHeading.tsx            — SEO-safe rolling heading (single semantic tag)
    MarqueeTicker.tsx             — outlined + solid infinite ticker (`marquee.items`)
    HandDrawn.tsx                 — scroll-drawn aqua SVG circle / underline around a phrase
    PricingPromise.tsx            — "from €349 … within 72 hours" line using HandDrawn (`promise.*`)
    StickyCardStack.tsx           — sticky stacking card deck (/how-we-work, /services)
    WebProjectFinder.tsx          — 30-second package quiz (web design page only)
  messages/
    sk.json                       — Slovak translations
    en.json                       — English translations
  context/
    LanguageContext.tsx           — i18n provider
  lib/
    gtag.ts                       — gaEvent() helper for firing GA4 custom events client-side
    intro.ts                      — INTRO_STORAGE_KEY + introGuardScript (inline <head> script for the preloader)
    contactPrefill.ts             — CONTACT_FORM_ID, CONTACT_PREFILL_EVENT (quiz → ContactForm)
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

## Blog tables (Sanity `@sanity/table` — 2026-11-06)
- Plugin: **`@sanity/table@^1.1.4`** (resolved 1.1.4), registered as `table()` in `sanity.config.ts` `plugins`. Its type `table` is a member of the `blockContent` array (`src/sanity/schemas/blockContent.ts` — that array is the `body` of `post`; `post.ts` only references `type: 'blockContent'`)
- **Why 1.x and not newer:** Sanity here is 3.99 / React 18.3. `@sanity/table` 3.x needs Sanity 5 + React 19. 2.0.x passes the peer range (`sanity ^3||^4||^5`) but depends on `@sanity/ui ^3`, while Sanity 3.99 ships `@sanity/ui ^2.16` — a second, mismatched UI copy next to Studio's theme provider. 1.1.4 depends on `@sanity/ui ^2.10` and dedupes to the single installed 2.16.x. Verify with `find node_modules -path "*@sanity/ui/package.json"` (must be one copy). **Upgrade the plugin together with Sanity (v5/React 19), not before**
- Data shape: `{_type:'table', rows:[{_type:'tableRow', _key, cells:[string,…]}]}` — first row is treated as the header
- Rendering: `src/components/PortableTable.tsx` is registered as `types.table` in the blog page's `portableTextComponents`. Semantic `<table>`, first row → `<thead>` with `<th scope="col">`, rest → `<tbody>`; wrapper is `overflow-x-auto` + focusable (keyboard scroll) with a column-based `min-width` (7rem/column) so wide tables scroll inside the box on mobile instead of widening the page. Colors are the literal brand hexes (surface `#0B1224`, borders `#1E293B`, header text white, body text `#94A3B8`) — intentionally not the `navy`/`slate-text` tokens. Empty tables render nothing
- Verify schema after Sanity/plugin changes with `npx sanity schema validate` (loads `sanity.config.ts`; no login needed)

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
1. `npm run lint` and `npm run build` — zero errors required
2. `npm run dev` — spot-check homepage, about, all service pages, pricing, contact
3. Toggle SK/EN on at least 2 pages to confirm i18n keys work
4. Check homepage stats (3 tiles), cookie banner at 375px, FAQ accordions expand
5. `git add . && git commit -m "..."  && git push`

## Motion layer, Agency dropdown, card stacks, project finder (2026-11-16)
Built on branch `feat/sprk-motion-upgrade`. Everything respects `prefers-reduced-motion` (see the media query at the end of `globals.css` + `useReducedMotion()` in the components).

### Tokens (fonts + easing)
- **Italic accent font**: `Instrument Serif` italic 400 via `next/font/google` in `layout.tsx` → CSS var `--font-instrument-serif`, Tailwind `font-serif`, CSS class `.accent-serif` (italic, aqua). Paired with Syne on display headlines only — never for body text
- **Easing** — CSS vars in `:root` (`globals.css`) and matching Tailwind `ease-*` utilities (`tailwind.config.js` → `transitionTimingFunction`):
  - `--ease-expo` / `ease-expo` = `cubic-bezier(0.19, 1, 0.22, 1)` — header, preloader curtain, reveals, dropdowns
  - `--ease-inout` / `ease-in-out-cue` = `cubic-bezier(0.65, 0, 0.35, 1)` — scroll cue, hand-drawn ink
  - `--ease-spring` / `ease-spring` = `cubic-bezier(0.34, 1.56, 0.64, 1)` — button press/lift
- **Utility classes** (all in `globals.css`): `.grain`, `.link-underline` (left→right `scaleX` underline; add `data-active="true"` to keep it drawn), `.btn-kinetic` (lift −2px on hover, `scale(0.95)` on press, **pill shape** via `border-radius: 9999px` — keeps each button's own glow; do NOT flatten buttons to solid fills; add `btn-option` to opt out of the pill, e.g. the long-text quiz answers. Outline/secondary buttons carry a soft aqua glow `shadow-[0_0_18px_rgba(100,255,218,0.12)] hover:shadow-aqua`), `.scroll-cue`, `.marquee` / `.marquee-track`, `.text-outline` (`-webkit-text-stroke`), `.kinetic-word`, `.heading-link`, `.accent-serif`, `.ink-glow`
- **z-index ladder**: grain 30 → header 40 → toasts 9300 → preloader 9400 → cursor 9500

### Global components (mounted in `layout.tsx`)
- **`Preloader`** — full-viewport navy cover, `001 → 100` tabular counter bottom-left + 1px glowing aqua line along the bottom (~1.0s), then slides up (`--ease-expo`). Runs once per browser session: `sessionStorage['dunaj_intro_seen']`. An inline `<head>` script (`introGuardScript` in `src/lib/intro.ts`) sets `<html data-intro="skip">` before first paint for returning sessions, reduced motion and `/studio`, so the cover never flashes; `.preloader` is `display:none` under that attribute. Safety nets: a `setTimeout` guard finishes the intro even if `requestAnimationFrame` is starved (background tab), a CSS failsafe animation hides it after 6s, and `<noscript>` hides it without JS. The script lives in `lib/` (not in the client component) because a server component cannot import a string from a `'use client'` module
- **`.grain`** — one fixed, `pointer-events:none` SVG fractal-noise layer at `opacity: 0.035` (a `<div className="grain">` after the providers). It covers every section, so sections do not need their own noise
- **`CustomCursor`** — arrow only (the trailing diamond/square reticle was removed). The sharp aqua arrow is a *native CSS cursor* (data-URI SVG on `html.has-custom-cursor`, zero lag); the component renders nothing and only toggles `has-custom-cursor` (active) and `cursor-hover` (a larger, brighter arrow over `a, button, [role=button], label, select, summary, [data-cursor="hover"]`). Only enabled for `(hover: hover) and (pointer: fine)`, off for reduced motion, touch and `/studio`. Add `data-cursor="hover"` to make a non-link element trigger the hover arrow
- **`ToastProvider` / `useToast()`** (`Toaster.tsx`) — custom Framer Motion toasts (no `sonner`), bottom-centre so they never cover the cookie banner. `toast(message, 'success' | 'error')`. Wired to: `CopyButton` (email/phone in `ContactForm` and `ContactPageClient` — the button is a *sibling* of the `mailto:`/`tel:` link, never nested inside it), `ContactForm` submit success/error (alongside the inline status and the existing `generate_lead` event), and the project finder prefill. No new GA4 events were added

### Smart header + "Agentúra / Agency" dropdown (`Navbar.tsx`)
- Header is still `sticky top-0` (TopBar scrolls away above it). At the top it is transparent with no border; after 20px it becomes frosted navy glass with a 1px hairline; past 140px it glides out on scroll-down and back on scroll-up (`duration-500 ease-expo`). It never hides while a dropdown or the mobile menu is open
- The homepage `Hero` has `-mt-16` so the video sits under the transparent header — keep that pairing if the header height (`h-16`) changes
- **Top-level nav is now**: Home · **Agentúra/Agency ▾** · Služby/Services ▾ · Blog · Cenník · Kontakt. About, How We Work and Our Work are **only** inside the Agency dropdown — don't re-add them as top-level links
- Nav structure is the `navEntries` array; panel content comes from JSON: `nav.agency.{label, items[{href,title,desc}], helper}` and `nav.servicesMenu.{all, items[…]}`. To add a page to a dropdown, add an item in **both** `sk.json` and `en.json`
- Panel: frosted dark navy, hairline dividers, bold title + 1-line description, bottom helper link to `/contact` (Agency) or "All services" (Services). Agency trigger is a `<button>` (no landing page); Services trigger is still a link to `/services`
- Interaction: opens on hover; a hover-opened panel stays open when the trigger is clicked; closes on mouse leave, `Escape`, blur, or an outside tap. Mobile: each group is a collapsible accordion (one open at a time)
- The old `navbar-indicator` pill was replaced by `.link-underline` (active page keeps the underline)

### Typography, ticker, accents
- **`KineticHeading`** — `<KineticHeading className="…" accent="phrase" href="/optional">text</KineticHeading>`; props `as` (`h1|h2|h3`, default `h2`), `accent`, `delay`, `href`. Words rise out of a clipped line **once** when the heading first scrolls into view (`viewport once`). There is **no hover animation** (the old hover re-roll was removed). With `href` the heading is a link and hovering/focusing draws a left-to-right aqua underline (`.heading-link`); the homepage services heading links to `/services`
  - **SEO rule (do not break):** it renders exactly ONE heading element and the text exists ONCE in the DOM — no duplicate/decorative copy layers. Verified in the prerendered HTML: no duplicate `<h2>` text on any page
  - The element is keyed by its text, so switching SK/EN remounts the words (no stale words from the other language)
  - Children must be a plain string (a `t()` call or `isSk ? 'a' : 'b'`); anything else falls back to a plain heading. `accent` must be an exact substring of the text or it is ignored — homepage accents live in `home.accents.*` and must be kept in sync if a headline is reworded
  - All section `<h2>`s on the homepage, about, how-we-work, services, the three service pages, pricing, work and `ContactForm` use it. Blog and case-study pages do not
- **Hero** h1: the middle line (`home.hero.headline2`) is set in italic Instrument Serif with the aqua gradient. The old chevron scroll indicator is now the 1px `.scroll-cue` hairline (`scaleY 0→1→0`, 1.8s)
- **Homepage `Services`** is now oversized editorial rows (number · big title · short text · arrow) with hairline borders instead of a card grid
- **`MarqueeTicker`** — phrases from `marquee.items` (both JSON files), alternating `.text-outline` and solid, `◆` separators, pause on hover/focus. Renders four identical lists and slides the track by −50% (seamless); only the first list is exposed to assistive tech. Placed in exactly two spots: homepage directly below `Hero`, and directly above the bottom `ContactForm` CTA on the three service pages. Marquee copy must stay true to the Stats/Pricing rules above (72h = Business Pro, from €349)
- **`HandDrawn`** — wraps a phrase and draws a glowing aqua `circle` or `underline` with `pathLength` (stroke-dashoffset → 0) `whileInView`. Used via `PricingPromise` (circles €349, underlines "72 hodín / 72 hours"; strings in `promise.*`) on the homepage pricing teaser and the web design pricing section

### Sticky stacking decks (`StickyCardStack`)
- Generic: `items`, `getKey`, `renderCard`, `cardClassName`, `topOffset` (96), `step` (14). Each card is `position: sticky` with a progressive `top`; a covered card scales to 0.96 and dims, driven by the next card's scroll position
- Used for the 6 process steps on `/how-we-work` and the 6 services on `/services`
- **The parent `<section>` must not have `overflow-hidden`** — it silently breaks `position: sticky`. Both sections had it removed
- **No-clipping fallback:** the component measures every card; if one is taller than the room under its pin point, pinning is switched off and the deck becomes a normal list (`data-sticky="false"`). At 375×812 the process deck pins, while the taller services cards fall back to a list — that is intended, not a bug. Cards need an opaque background

### Project finder (`WebProjectFinder`) — `/services/tvorba-web-stranok` only
- Sits between the testimonial and the pricing section. Five questions (business type, current site, goal, size, timeline) from `finder.questions`; scoring table `SCORES` and `recommendTier()` are in the component. Page count is a hard rule (more than 10 pages → Agency Elite; up to 10 never recommends Expres Start)
- The result reads the tier name/price from `pricing.tiers` (ids `expres`, `business`, `elite`) — prices are never duplicated in the quiz copy
- "Pre-fill the contact form" dispatches the window event `dunaj:contact-prefill` (`src/lib/contactPrefill.ts`); `ContactForm` listens, sets `service` (first entry of `contact.form.services` = web design) and `message`, and the page scrolls to `#contact-form`. Option ids in the JSON must match the keys in `SCORES`
- Don't add the finder to other pages (SEO has no fixed pricing)

### Refinements (2026-11-18)
- **i18n:** all copy must exist in both JSON files; no hardcoded SK-only strings in components. Homepage testimonial copy is now `home.testimonial.*`. EN fixes: about headline "Dunajmedia — where strategy meets design" / CTA "Meet our team"; services headline "Comprehensive digital services for modern European businesses". Audit method: walk both JSON trees and flag identical non-trivial strings or diacritics in `en.json` (remaining identical strings are brand names, slugs, image paths, phone/email/address)
- **Mobile overflow:** two-column grids must be `grid grid-cols-1 lg:grid-cols-2` — a bare `grid lg:grid-cols-2` leaves an implicit `auto` track that grows to the content's min-width and clips the right edge below `lg`. Hero h1 scales `text-4xl` → `min-[400px]:text-5xl` → `sm:text-7xl` → `lg:text-8xl` (serif middle line `text-[2.6rem]` → `min-[400px]:text-[3.3rem]` → `sm:text-[5rem]` → `lg:text-[6.6rem]`). When scanning for overflow, ignore elements still holding a Framer Motion `x` offset before they enter the viewport
