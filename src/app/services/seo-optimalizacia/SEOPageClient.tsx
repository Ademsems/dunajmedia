'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PricingTable from '@/components/PricingTable';
import CTABanner from '@/components/CTABanner';
import ContactForm from '@/components/ContactForm';
import ServiceFAQ from '@/components/ServiceFAQ';

/* ─── data ─────────────────────────────────────────────────── */

const stats = [
  { value: '95%', labelSk: 'online predajov prichádza z prvej stránky Google', labelEn: 'of online sales come from the first page of Google' },
  { value: '86%', labelSk: 'používateľov začína každý nákup vyhľadávaním', labelEn: 'of users start every purchase with a search' },
  { value: '#1', labelSk: 'pozícia dostáva 10× viac kliknutí než pozícia #10', labelEn: 'position gets 10× more clicks than position #10' },
];

const services = [
  {
    titleSk: 'Technická SEO Optimalizácia',
    titleEn: 'Technical SEO Optimization',
    descSk: 'Technická SEO optimalizácia je základ všetkého. Analyzujeme rýchlosť načítania, štruktúru URL, Core Web Vitals, indexáciu, mobilnú verziu a bezpečnosť vášho webu. SEO audit webstránky odhalí technické problémy, ktoré bránia Googlu správne ohodnotiť váš obsah. Naše weby postavené na Next.js dosahujú výnimočné technické SEO skóre — to je náš štartovací bod, nie cieľ.',
    descEn: 'Technical SEO optimization is the foundation of everything. We analyze loading speed, URL structure, Core Web Vitals, indexation, mobile version and the security of your website. A website SEO audit reveals technical issues that prevent Google from properly valuing your content. Our websites built on Next.js achieve exceptional technical SEO scores — that is our starting point, not our goal.',
  },
  {
    titleSk: 'On-page SEO a Keyword Research Slovensko',
    titleEn: 'On-page SEO and Keyword Research Slovakia',
    descSk: 'On-page SEO pokrýva optimalizáciu obsahu, nadpisov, meta tagov a vnútornej prepojenosti. Súčasťou je keyword research Slovensko — hĺbková analýza kľúčových slov, ktoré vaši zákazníci skutočne vyhľadávajú na slovenskom trhu. Každé slovo na vašom webe musí mať dôvod existovať.',
    descEn: 'On-page SEO covers the optimization of content, headings, meta tags and internal linking. This includes keyword research Slovakia — an in-depth analysis of keywords that your customers actually search for in the Slovak market. Every word on your website must have a reason to exist.',
  },
  {
    titleSk: 'Off-page SEO a Link Building',
    titleEn: 'Off-page SEO and Link Building',
    descSk: 'Google považuje spätné odkazy za hlasy dôveryhodnosti. Link building — budovanie kvalitných spätných odkazov z relevantných slovenských a medzinárodných stránok — posilňuje autoritu vášho webu a priamo zlepšuje pozície vo vyhľadávačoch. Pracujeme len s etickým, bielym link buildingom.',
    descEn: 'Google treats backlinks as votes of trustworthiness. Link building — building quality backlinks from relevant Slovak and international websites — strengthens your site\'s authority and directly improves search engine rankings. We work only with ethical, white-hat link building.',
  },
  {
    titleSk: 'Lokálne SEO pre Bratislavu a Slovensko',
    titleEn: 'Local SEO for Bratislava and Slovakia',
    descSk: 'Lokálne SEO je kľúčové pre firmy, ktoré obsluhujú zákazníkov v konkrétnej lokalite. SEO pre firmy Bratislava zahŕňa optimalizáciu Google Business Profile, lokálnych citácií a obsahu cieleného na bratislavský a slovenský trh. Keď niekto vyhľadá vašu službu v okolí, lokálne SEO rozhoduje o tom, či vás nájde.',
    descEn: 'Local SEO is crucial for businesses serving customers in a specific location. SEO for businesses in Bratislava includes optimization of Google Business Profile, local citations and content targeted at the Bratislava and Slovak market. When someone searches for your service nearby, local SEO determines whether they find you.',
  },
  {
    titleSk: 'Obsahový Marketing a SEO Obsah',
    titleEn: 'Content Marketing and SEO Content',
    descSk: 'Obsahový marketing je dlhodobá SEO stratégia, ktorá buduje organickú návštevnosť cez hodnotný obsah — blogy, príručky, odborné články. Každý obsah tvoríme s cieľom ako zlepšiť pozície vo vyhľadávačoch pre konkrétne kľúčové slová relevantné pre váš biznis na slovenskom trhu.',
    descEn: 'Content marketing is a long-term SEO strategy that builds organic traffic through valuable content — blogs, guides, expert articles. Every piece of content is created with the aim of improving search engine rankings for specific keywords relevant to your business in the Slovak market.',
  },
  {
    titleSk: 'AI SEO Optimalizácia — Budúcnosť Vyhľadávania',
    titleEn: 'AI SEO Optimization — The Future of Search',
    descSk: 'AI SEO optimalizácia je nová dimenzia, ktorú väčšina agentúr na slovenskom trhu zatiaľ ignoruje. Optimalizujeme váš obsah nielen pre Google, ale aj pre AI vyhľadávanie — ChatGPT, Perplexity, Google AI Overviews a ďalšie nástroje, ktoré menia, ako ľudia hľadajú informácie. Firmy, ktoré začnú s AI SEO dnes, budú mať obrovský náskok zajtra.',
    descEn: 'AI SEO optimization is a new dimension that most agencies in the Slovak market are still ignoring. We optimize your content not just for Google, but also for AI search — ChatGPT, Perplexity, Google AI Overviews and other tools that are changing how people find information. Businesses that start with AI SEO today will have a massive advantage tomorrow.',
  },
];

const whyPoints = [
  {
    titleSk: 'SEO pre Next.js — technický základ, ktorý WordPress nedokáže dosiahnuť',
    titleEn: 'SEO for Next.js — a technical foundation WordPress cannot achieve',
    descSk: 'Naše weby sú stavané na Next.js, čo znamená nadpriemerné Core Web Vitals skóre od spustenia. SEO pre Next.js nie je len o obsahu — je o architektúre webu, ktorá je technicky nadradenou platformou pre Google optimalizáciu oproti WordPress konkurencii. Ak váš web ešte nemáme stavali my, vieme urobiť technickú SEO optimalizáciu aj na existujúcom webe.',
    descEn: 'Our websites are built on Next.js, which means above-average Core Web Vitals scores from launch. SEO for Next.js is not just about content — it is about website architecture that is a technically superior platform for Google optimization compared to WordPress competition. If we did not build your website, we can still perform technical SEO optimization on your existing site.',
    linkSk: true,
  },
  {
    titleSk: 'Dvojjazyčná SEO Stratégia SK+EN',
    titleEn: 'Bilingual SEO Strategy SK+EN',
    descSk: 'Dvojjazyčná SEO stratégia vám dáva dvojnásobný priestor pre kľúčové slová. Google odmeňuje viacjazyčné weby vyššími pozíciami, pretože pokrývajú širší okruh relevantných vyhľadávacích výrazov. SEO optimalizácia pre slovenský trh aj anglicky hovoriace publikum zároveň — v jednom projekte.',
    descEn: 'A bilingual SEO strategy gives you double the space for keywords. Google rewards multilingual websites with higher rankings because they cover a wider range of relevant search queries. SEO optimization for the Slovak market and English-speaking audiences simultaneously — in one project.',
  },
  {
    titleSk: 'SEO nie je doplatok — je súčasťou každého webu',
    titleEn: 'SEO is not an add-on — it is part of every website',
    descSk: 'U Dunajmedia profesionálna SEO optimalizácia začína pri architektúre webu, nie po jeho spustení. SEO optimalizácia webstránok od základov — nie ako záplata na hotový web.',
    descEn: 'At Dunajmedia, professional SEO optimization starts at website architecture, not after launch. SEO optimization of websites from the ground up — not as a patch on a finished site.',
  },
  {
    titleSk: 'SEO optimalizácia pre malé firmy aj veľké biznisy',
    titleEn: 'SEO optimization for small businesses and large companies alike',
    descSk: 'Veríme, že SEO optimalizácia pre malé firmy by mala byť rovnako dostupná ako pre korporácie. Pracujeme so živnostníkmi, startupmi aj rastúcimi firmami — každý dostane rovnakú úroveň profesionálnej SEO stratégie.',
    descEn: 'We believe SEO optimization for small businesses should be just as accessible as for corporations. We work with sole traders, startups and growing companies — everyone gets the same level of professional SEO strategy.',
  },
];

const processSteps = [
  {
    number: '01',
    titleSk: 'Bezplatný SEO Audit Webstránky',
    titleEn: 'Free Website SEO Audit',
    descSk: 'Začíname bezplatným SEO auditom, ktorý odhalí technické problémy, chýbajúce kľúčové slová a príležitosti na zvýšenie organickej návštevnosti. Zistíte presne, kde sa nachádzate na Googli a čo brzdí váš rast.',
    descEn: 'We start with a free website SEO audit that reveals technical issues, missing keywords and opportunities to increase organic traffic. You find out exactly where you rank on Google and what is holding back your growth.',
  },
  {
    number: '02',
    titleSk: 'Keyword Research Slovensko a SEO Stratégia',
    titleEn: 'Keyword Research Slovakia and SEO Strategy',
    descSk: 'Robíme hĺbkový keyword research Slovensko — identifikujeme kľúčové slová s najvyšším potenciálom pre váš biznis na slovenskom trhu. Na základe toho zostavíme konkrétnu SEO stratégiu s jasnými cieľmi a KPI.',
    descEn: 'We conduct in-depth keyword research Slovakia — identifying keywords with the highest potential for your business in the Slovak market. Based on this we create a concrete SEO strategy with clear goals and KPIs.',
  },
  {
    number: '03',
    titleSk: 'Technická SEO Optimalizácia a On-page',
    titleEn: 'Technical SEO Optimization and On-page',
    descSk: 'Implementujeme technickú SEO optimalizáciu — opravíme chyby odhalené auditom, optimalizujeme Core Web Vitals, štruktúru, meta tagy a obsah. Google optimalizácia na technickej aj obsahovej úrovni.',
    descEn: 'We implement technical SEO optimization — fixing errors revealed by the audit, optimizing Core Web Vitals, structure, meta tags and content. Google optimization at both technical and content level.',
  },
  {
    number: '04',
    titleSk: 'Link Building a Obsahový Marketing',
    titleEn: 'Link Building and Content Marketing',
    descSk: 'Budujeme autoritu vášho webu cez etický link building a pravidelný obsahový marketing. Každý obsah je cielený na konkrétne kľúčové slová a navrhnutý ako zlepšiť pozície vo vyhľadávačoch dlhodobo.',
    descEn: 'We build your website\'s authority through ethical link building and regular content marketing. Every piece of content is targeted at specific keywords and designed to improve search engine rankings long-term.',
  },
  {
    number: '05',
    titleSk: 'Reporting a Optimalizácia',
    titleEn: 'Reporting and Optimization',
    descSk: 'Mesačné reporty s reálnymi číslami — organická návštevnosť, pozície vo vyhľadávačoch, konverzie. Neustála optimalizácia na základe dát, nie dojmov.',
    descEn: 'Monthly reports with real numbers — organic traffic, search engine rankings, conversions. Continuous optimization based on data, not impressions.',
  },
];

const faqSk = [
  { q: 'Koľko stojí SEO optimalizácia?', a: 'SEO optimalizácia cena závisí od rozsahu projektu, konkurenčnosti odvetvia a cieľov. Začíname jednorázovým SEO auditom a na základe výsledkov navrhneme optimálnu SEO stratégiu s jasnou cenou. Kontaktujte nás pre bezplatný audit a cenovú ponuku na mieru.' },
  { q: 'Ako dlho trvá SEO, kým uvidím výsledky?', a: 'SEO optimalizácia webstránok nie je okamžitý kanál — prvé výsledky sa zvyčajne objavujú po 3 až 6 mesiacoch. Technická SEO optimalizácia a on-page zmeny sú viditeľné skôr. Dlhodobá organická návštevnosť rastie kontinuálne — na rozdiel od platenej reklamy, ktorá prestane fungovať, keď prestanete platiť.' },
  { q: 'Čo je lokálne SEO a potrebujem ho?', a: 'Lokálne SEO optimalizuje vašu viditeľnosť pre zákazníkov vo vašej geografickej oblasti. Ak máte fyzickú prevádzku alebo obsluhujete konkrétne mesto — Bratislava, okolie — lokálne SEO je nevyhnutné. Zahŕňa Google Business Profile, lokálne kľúčové slová a citácie vo firemných katalógoch.' },
  { q: 'Čo je AI SEO optimalizácia?', a: 'AI SEO optimalizácia je optimalizácia obsahu pre AI vyhľadávacie nástroje ako ChatGPT, Perplexity, Google AI Overviews a ďalšie. Tieto nástroje čítajú váš web inak ako tradičný Google algoritmus. Firmy, ktoré optimalizujú pre AI vyhľadávanie dnes, sa objavia v odpovediach AI nástrojov zajtra — čo je nový zdroj organickej návštevnosti.' },
  { q: 'Aký je rozdiel medzi SEO a Google Ads?', a: 'Google Ads je platená reklama — platíte za každé kliknutie a keď prestanete platiť, prestanete byť viditeľní. SEO optimalizácia buduje organickú návštevnosť, ktorá je vaša — bez ďalších nákladov. SEO trvá dlhšie, ale dlhodobo prináša vyšší ROI. Ideálna stratégia kombinuje oboje.' },
  { q: 'Čo zahŕňa SEO optimalizácia pre slovenský trh?', a: 'SEO optimalizácia pre slovenský trh vyžaduje znalosť lokálnych vyhľadávacích návykov, sezónnych trendov a konkurenčného prostredia. Zahŕňa keyword research Slovensko v slovenčine aj angličtine, lokálne SEO pre Bratislavu a okolie a obsahovú stratégiu, ktorá rezonuje so slovenským publikom.' },
];

const faqEn = [
  { q: 'How much does SEO optimization cost?', a: 'SEO optimization price depends on the project scope, industry competitiveness and goals. We start with a one-time SEO audit and based on the results we propose an optimal SEO strategy with a clear price. Contact us for a free audit and a custom quote.' },
  { q: 'How long does SEO take before I see results?', a: 'SEO optimization of websites is not an instant channel — the first results typically appear after 3 to 6 months. Technical SEO optimization and on-page changes are visible sooner. Long-term organic traffic grows continuously — unlike paid advertising, which stops working when you stop paying.' },
  { q: 'What is local SEO and do I need it?', a: 'Local SEO optimizes your visibility for customers in your geographic area. If you have a physical location or serve a specific city — Bratislava and surroundings — local SEO is essential. It includes Google Business Profile, local keywords and citations in business directories.' },
  { q: 'What is AI SEO optimization?', a: 'AI SEO optimization is the optimization of content for AI search tools like ChatGPT, Perplexity, Google AI Overviews and others. These tools read your website differently from the traditional Google algorithm. Businesses that optimize for AI search today will appear in AI tool responses tomorrow — a new source of organic traffic.' },
  { q: 'What is the difference between SEO and Google Ads?', a: 'Google Ads is paid advertising — you pay for every click and when you stop paying, you stop being visible. SEO optimization builds organic traffic that is yours — without ongoing costs. SEO takes longer but delivers higher long-term ROI. The ideal strategy combines both.' },
  { q: 'What does SEO optimization for the Slovak market include?', a: 'SEO optimization for the Slovak market requires knowledge of local search habits, seasonal trends and the competitive landscape. It includes keyword research Slovakia in Slovak and English, local SEO for Bratislava and surroundings and a content strategy that resonates with Slovak audiences.' },
];

/* ─── component ─────────────────────────────────────────────── */

export default function SEOPageClient() {
  const { locale } = useLanguage();
  const isSk = locale === 'sk';

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,255,218,0.07) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-5 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'SEO Optimalizácia Bratislava' : 'SEO Optimization Bratislava'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-10">
              {isSk
                ? 'SEO Optimalizácia Bratislava — Dostaňte Sa na Prvú Stránku Google'
                : 'SEO Optimization Bratislava — Get to the First Page of Google'}
            </h1>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 mb-10 max-w-4xl">
            {stats.map(({ value, labelSk, labelEn }) => (
              <div key={value} className="bg-navy/60 backdrop-blur-sm px-6 py-7 text-center">
                <p className="font-display font-bold text-4xl text-aqua mb-2">{value}</p>
                <p className="text-slate-text text-sm font-body leading-snug">{isSk ? labelSk : labelEn}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <p className="font-display text-xl font-bold text-slate-lightest mb-6">
              {isSk ? 'Nie ste na prvej stránke Google? Vaša konkurencia tam je.' : 'Not on the first page of Google? Your competition is.'}
            </p>
            <p className="text-slate-text text-lg font-body leading-relaxed max-w-3xl">
              {isSk
                ? 'SEO optimalizácia webstránok je dnes základná podmienka digitálneho úspechu — nie výhoda. Profesionálna SEO optimalizácia Bratislava od Dunajmedia spája technickú precíznosť s obsahovou stratégiou a ako prví na slovenskom trhu integrujeme AI SEO optimalizáciu pre vyhľadávanie budúcnosti. Bez ohľadu na to, či ste malá firma alebo zavedený biznis — zvýšenie organickej návštevnosti prostredníctvom správnej optimalizácie pre vyhľadávače je investícia s najvyšším dlhodobým ROI v digitálnom marketingu.'
                : 'SEO optimization of websites is today a basic condition of digital success — not an advantage. Professional SEO optimization in Bratislava from Dunajmedia combines technical precision with content strategy, and as the first on the Slovak market we integrate AI SEO optimization for the future of search. Whether you are a small business or an established company — increasing organic traffic through proper search engine optimization is the highest long-term ROI investment in digital marketing.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is SEO */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-6">
              {isSk ? 'Čo Je SEO Optimalizácia?' : 'What Is SEO Optimization?'}
            </h2>
            <p className="text-slate-text text-lg font-body leading-relaxed max-w-3xl">
              {isSk
                ? 'SEO — optimalizácia pre vyhľadávače — je súbor techník, ktoré zvyšujú pozície vo vyhľadávačoch ako Google. Keď niekto vyhľadá službu alebo produkt, ktorý ponúkate, Google rozhodne, ktoré weby zobrazí na prvej stránke. Cieľom SEO optimalizácie webstránok je zabezpečiť, aby bol váš web medzi prvými výsledkami — nie na strane 3, kde ho nikto nevidí. Google optimalizácia dnes zahŕňa technické aspekty webu, kvalitu obsahu, spätné odkazy aj rýchlosť načítania. Správna SEO stratégia od Dunajmedia pokrýva všetky tieto oblasti.'
                : 'SEO — search engine optimization — is a set of techniques that improve positions in search engines like Google. When someone searches for a service or product you offer, Google decides which websites to show on the first page. The goal of SEO optimization of websites is to ensure your site is among the top results — not on page 3 where nobody sees it. Google optimization today includes technical aspects of the website, content quality, backlinks and loading speed. A proper SEO strategy from Dunajmedia covers all of these areas.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO Services — 6 cards */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Naše SEO Služby' : 'Our SEO Services'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Komplexná profesionálna SEO optimalizácia pre slovenský trh — od technického auditu po AI-optimalizovaný obsah.'
                : 'Comprehensive professional SEO optimization for the Slovak market — from technical audit to AI-optimized content.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-6 rounded-2xl bg-navy-light border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-base mb-3">{isSk ? svc.titleSk : svc.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? svc.descSk : svc.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Prečo Je Dunajmedia Iná SEO Agentúra Bratislava' : 'Why Dunajmedia Is a Different SEO Agency in Bratislava'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Väčšina SEO agentúr robí rovnaké veci rovnakým spôsobom. Tu je to, čo nás odlišuje.'
                : 'Most SEO agencies do the same things the same way. Here is what makes us different.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyPoints.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-3">{isSk ? point.titleSk : point.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed mb-3">{isSk ? point.descSk : point.descEn}</p>
                {point.linkSk && (
                  <Link href="/services/tvorba-web-stranok" className="text-aqua text-sm font-body hover:underline inline-flex items-center gap-1">
                    {isSk ? 'Pozrite si naše služby tvorby web stránok' : 'See our web design services'}
                    <ArrowRight size={12} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Náš Postup SEO Optimalizácie' : 'Our SEO Optimization Process'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Transparentná SEO stratégia s merateľnými výsledkami v každom kroku.'
                : 'A transparent SEO strategy with measurable results at every step.'}
            </p>
          </motion.div>
          <div className="divide-y divide-white/8">
            {processSteps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid grid-cols-12 gap-6 py-8 lg:py-10 group">
                <div className="col-span-2 lg:col-span-1 flex items-start pt-1">
                  <span className="font-mono text-sm font-bold text-aqua tracking-widest">{step.number}</span>
                </div>
                <div className="col-span-10 lg:col-span-4 flex items-start">
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-slate-lightest group-hover:text-aqua transition-colors duration-300">
                    {isSk ? step.titleSk : step.titleEn}
                  </h3>
                </div>
                <div className="col-span-12 lg:col-span-7 pl-8 lg:pl-0">
                  <p className="text-slate-text font-body text-base leading-relaxed">{isSk ? step.descSk : step.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Audit Lead Magnet */}
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border border-aqua/30 bg-aqua/5 rounded-2xl p-8 lg:p-12">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/10">
              {isSk ? 'Bezplatný audit' : 'Free audit'}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-lightest mb-5">
              {isSk ? 'Bezplatný SEO Audit — Zistite, Kde Sa Nachádzate na Googli' : 'Free SEO Audit — Find Out Where You Rank on Google'}
            </h2>
            <p className="text-slate-text text-base font-body leading-relaxed mb-8">
              {isSk
                ? 'Nevyhnutným prvým krokom každej profesionálnej SEO optimalizácie je poznať aktuálny stav. Náš bezplatný SEO audit webstránky vám ukáže: kde sa nachádzate na Googli dnes, ktoré technické problémy bránia vášmu rastu, aký je potenciál zvýšenia organickej návštevnosti pre váš biznis a kde strácate zákazníkov, ktorí hľadajú presne to, čo ponúkate. Bez záväzkov. Bez platby. Len reálne dáta o vašom webe.'
                : 'The essential first step of any professional SEO optimization is knowing your current position. Our free website SEO audit will show you: where you rank on Google today, which technical issues are blocking your growth, what the potential is for increasing organic traffic for your business and where you are losing customers who are searching for exactly what you offer. No commitment. No payment. Just real data about your website.'}
            </p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-7 py-3.5 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua">
              {isSk ? 'Získajte bezplatný SEO audit' : 'Get your free SEO audit'}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Cena SEO Optimalizácie' : 'SEO Optimization Pricing'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk ? 'Transparentné SEO balíčky pre firmy každej veľkosti.' : 'Transparent SEO packages for businesses of every size.'}
            </p>
          </motion.div>
          <PricingTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
            <h2 className="font-display text-4xl font-bold text-slate-lightest">
              {isSk ? 'Časté Otázky o SEO' : 'FAQ About SEO'}
            </h2>
          </motion.div>
          <ServiceFAQ items={isSk ? faqSk : faqEn} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
            {isSk ? 'Začnite so SEO Dnes — Bezplatná Konzultácia' : 'Start With SEO Today — Free Consultation'}
          </h2>
          <p className="text-slate-text text-lg font-body mb-10">
            {isSk
              ? 'SEO pre firmy Bratislava nikdy nebolo dostupnejšie. Prvý krok je bezplatný — SEO audit vášho webu, ktorý vám ukáže presne, kde stojíte a čo je potrebné zmeniť. Konzultácia zadarmo, bez záväzkov.'
              : 'SEO for businesses in Bratislava has never been more accessible. The first step is free — a website SEO audit that shows you exactly where you stand and what needs to change. Free consultation, no commitment.'}
          </p>
          <Link href="/contact"
            className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua">
            {isSk ? 'Získajte bezplatný SEO audit' : 'Get your free SEO audit'}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTABanner />
      <ContactForm />
    </>
  );
}
