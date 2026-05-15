'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PricingTable from '@/components/PricingTable';
import CTABanner from '@/components/CTABanner';
import ContactForm from '@/components/ContactForm';
import ServiceFAQ from '@/components/ServiceFAQ';
import WorkShowcase from '@/components/WorkShowcase';

/* ─── data ─────────────────────────────────────────────────── */

const features = [
  {
    titleSk: 'Next.js miesto WordPress — výkonná webstránka s lepším SEO',
    titleEn: 'Next.js instead of WordPress — a high-performance website with better SEO',
    descSk: 'Kým väčšina agentúr na Slovensku stavia na WordPress, my používame Next.js 14. Výsledkom je výkonná webstránka s nadpriemernými Core Web Vitals skóre, ktoré Google priamo premieta do vyšších pozícií vo vyhľadávaní. Tvorba web stránok s SEO základom od prvého riadku kódu — nie ako dodatočná úprava.',
    descEn: 'While most agencies in Slovakia build on WordPress, we use Next.js 14. The result is a high-performance website with above-average Core Web Vitals scores, which Google directly translates into higher search rankings. Website creation with SEO built in from the first line of code — not as an afterthought.',
  },
  {
    titleSk: 'AI-driven SEO — SEO optimalizovaná webstránka od základov',
    titleEn: 'AI-driven SEO — an SEO-optimized website from the ground up',
    descSk: 'Každá stránka, ktorú tvoríme, je SEO optimalizovaná webstránka od základov — nie len technicky, ale aj obsahovo. Optimalizujeme pre Google aj pre AI vyhľadávanie, čo vám dáva výhodu oproti konkurencii, ktorá na AI vyhľadávanie ešte nereaguje.',
    descEn: 'Every page we create is an SEO-optimized website from the ground up — not just technically, but also in terms of content. We optimize for Google and AI search, giving you an advantage over competitors who have not yet responded to AI search.',
  },
  {
    titleSk: 'Dvojjazyčnosť SK/EN — vyššie pozície v Google',
    titleEn: 'SK/EN bilingual — higher rankings in Google',
    descSk: 'Dvojjazyčná webstránka nie je len o dosahovaní zahraničných zákazníkov. Google aktívne odmeňuje viacjazyčné weby vyššími pozíciami, pretože signalizujú relevantnosť pre širší okruh vyhľadávacích výrazov. Každý web dodávame s natívnou podporou slovenčiny a angličtiny — bez prekladačov, bez kompromisov v kvalite.',
    descEn: 'A bilingual website is not just about reaching international customers. Google actively rewards multilingual websites with higher rankings because they signal relevance for a wider range of search queries. We deliver every website with native Slovak and English support — no translation plugins, no compromise in quality.',
  },
  {
    titleSk: 'Rýchla tvorba web stránok — doručenie do 48 hodín',
    titleEn: 'Fast website creation — delivery in 48 hours',
    descSk: 'Náš Expres Start balíček zaručuje rýchlu tvorbu web stránok — plne funkčný jednostránkový web doručíme do 48 hodín od potvrdenia objednávky. Ideálne pre nové biznisy, relaunch alebo urgent projekty.',
    descEn: 'Our Expres Start package guarantees fast website creation — a fully functional one-page website delivered within 48 hours of order confirmation. Ideal for new businesses, relaunches or urgent projects.',
  },
  {
    titleSk: 'Kompletná starostlivosť po spustení — mesačný plán',
    titleEn: 'Complete post-launch care — monthly plan',
    descSk: 'Po spustení webu sa o vás staráme ďalej. Mesačný plán zahŕňa hosting, pravidelné aktualizácie, bezpečnostný monitoring a technickú podporu. Akékoľvek zmeny obsahu zariadime za vás — bez potreby technických znalostí.',
    descEn: 'After your website launches, we continue to take care of you. The monthly plan includes hosting, regular updates, security monitoring and technical support. Any content changes are handled for you — no technical knowledge required.',
  },
  {
    titleSk: 'Osobná zodpovednosť — žiadne handoffs',
    titleEn: 'Personal accountability — no handoffs',
    descSk: 'Váš projekt vedie od začiatku do konca ten istý človek. Žiadne odovzdávanie medzi oddeleniami, žiadne straty informácií, žiadne prekvapenia na faktúre.',
    descEn: 'Your project is led from start to finish by the same person. No handoffs between departments, no lost information, no surprises on the invoice.',
  },
];

const types = [
  {
    titleSk: 'Firemná web stránka na mieru',
    titleEn: 'Custom company website',
    descSk: 'Profesionálna firemná web stránka so všetkými sekciami — o nás, služby, tím, kontakt. Moderná web stránka pre firmu, ktorá buduje dôveru a generuje dopyty.',
    descEn: 'A professional company website with all sections — about us, services, team, contact. A modern website for a company that builds trust and generates inquiries.',
  },
  {
    titleSk: 'Landing pages a one-page weby',
    titleEn: 'Landing pages and one-page websites',
    descSk: 'Rýchla tvorba web stránok pre konkrétnu službu, produkt alebo kampaň. Konverzne optimalizované s jasnou cestou ku kontaktu.',
    descEn: 'Fast website creation for a specific service, product or campaign. Conversion-optimized with a clear path to contact.',
  },
  {
    titleSk: 'Weby pre špecifické odvetvia',
    titleEn: 'Industry-specific websites',
    descSk: 'Architekti, advokátske kancelárie, kliniky, stavebné firmy, záhradníctva. Tvoríme profesionálne webové stránky, ktoré hovoria jazykom vašich zákazníkov a reflektujú profesionalitu vášho odboru.',
    descEn: 'Architects, law firms, clinics, construction companies, landscaping. We build professional websites that speak your customers\' language and reflect the professionalism of your field.',
  },
  {
    titleSk: 'Dvojjazyčné weby SK/EN na mieru',
    titleEn: 'Custom bilingual SK/EN websites',
    descSk: 'Pre firmy, ktoré obsluhujú slovenský aj medzinárodný trh. Tvorba web stránok na mieru Bratislava s natívnou dvojjazyčnosťou a Google-odmenovanou štruktúrou.',
    descEn: 'For businesses serving both Slovak and international markets. Custom website creation in Bratislava with native bilingual support and a Google-rewarded structure.',
  },
];

const techs = [
  {
    name: 'Next.js 14',
    descSk: 'Moderný React framework — základ každej výkonnej webstránky, ktorú tvoríme. Rýchlejší ako WordPress, bezpečnejší a lepšie hodnotený Googlom.',
    descEn: 'A modern React framework — the foundation of every high-performance website we create. Faster than WordPress, more secure and better rated by Google.',
  },
  {
    name: 'Tailwind CSS',
    descSk: 'Utility-first CSS framework pre konzistentný, responzívny web dizajn s minimálnym kódom a maximálnym výkonom.',
    descEn: 'Utility-first CSS framework for consistent, responsive web design with minimal code and maximum performance.',
  },
  {
    name: 'Framer Motion',
    descSk: 'Profesionálne animácie a interakcie, ktoré robia váš moderný web dizajn pamätateľným — bez spomalenia rýchlosti načítania.',
    descEn: 'Professional animations and interactions that make your modern web design memorable — without slowing down loading speed.',
  },
  {
    name: 'Vercel Hosting',
    descSk: 'Každý web hostujeme na Vercel — najrýchlejšej a najspoľahlivejšej platforme pre Next.js projekty. Hosting je súčasťou mesačného plánu starostlivosti.',
    descEn: 'We host every website on Vercel — the fastest and most reliable platform for Next.js projects. Hosting is included in the monthly care plan.',
  },
];

const processSteps = [
  {
    number: '01',
    titleSk: 'Bezplatná konzultácia a analýza',
    titleEn: 'Free consultation and analysis',
    descSk: 'Spoznáme váš biznis, cieľovú skupinu a konkurenciu. Navrhneme štruktúru modernej web stránky pre firmu na základe reálnych dát, nie dojmov.',
    descEn: 'We get to know your business, target audience and competition. We propose the structure of a modern website for your company based on real data, not impressions.',
  },
  {
    number: '02',
    titleSk: 'Dizajn na mieru',
    titleEn: 'Custom design',
    descSk: 'Navrhujeme profesionálny web dizajn od nuly podľa vašej značky. Predložíme na schválenie pred vývojom — bez surprises.',
    descEn: 'We design professional web design from scratch based on your brand. We present for approval before development — no surprises.',
  },
  {
    number: '03',
    titleSk: 'Vývoj výkonnej webstránky',
    titleEn: 'Development of a high-performance website',
    descSk: 'Programujeme na Next.js s dôrazom na rýchlosť, tvorbu web stránok s SEO základom a responzívny webdizajn Bratislava štandardu. Každý detail testujeme pred odovzdaním.',
    descEn: 'We develop on Next.js with a focus on speed, website creation with an SEO foundation and responsive web design to Bratislava standard. We test every detail before handover.',
  },
  {
    number: '04',
    titleSk: 'Spustenie, hosting a dlhodobá podpora',
    titleEn: 'Launch, hosting and long-term support',
    descSk: 'Spustíme vašu SEO optimalizovanú webstránku na Vercel hostingu. Mesačný plán zahŕňa hosting, aktualizácie, bezpečnosť a technickú podporu. S doménou vám pomôžeme pri výbere a registrácii.',
    descEn: 'We launch your SEO-optimized website on Vercel hosting. The monthly plan includes hosting, updates, security and technical support. We will guide you through domain selection and registration.',
  },
];

const faqSk = [
  { q: 'Koľko stojí tvorba web stránky?', a: 'Cena tvorby web stránok začína od €349 za jednostránkový web s doručením do 48 hodín. Weby s viacerými stránkami od €549. Presná cena závisí od rozsahu projektu — kontaktujte nás pre bezplatnú konzultáciu.' },
  { q: 'Ako dlho trvá tvorba web stránky?', a: 'Rýchla tvorba web stránok je naša špecialita. Jednostránkový web doručíme do 48 hodín, web s 10 stranami do 72 hodín. Komplexné projekty trvajú 2 a viac týždňov podľa rozsahu.' },
  { q: 'Prečo je Next.js lepší ako WordPress?', a: 'Next.js dosahuje výrazne lepšie Core Web Vitals skóre, čo priamo ovplyvňuje pozície vo vyhľadávačoch. Výsledkom je výkonná webstránka, ktorá načíta 3× rýchlejšie než typický WordPress web. Navyše je bezpečnejšia — bez pluginov, bez zraniteľností.' },
  { q: 'Čo je responzívny web dizajn?', a: 'Responzívny web dizajn znamená, že vaša moderná web stránka pre firmu vyzerá a funguje perfektne na všetkých zariadeniach — počítač, tablet, mobil. Dnes je to štandard. Všetky naše weby sú plne responzívne.' },
  { q: 'Zahŕňa cena aj hosting?', a: 'Hosting je súčasťou mesačného plánu starostlivosti, nie jednorazovej ceny webu. Mesačný poplatok zahŕňa Vercel hosting, pravidelné aktualizácie, bezpečnostný monitoring a technickú podporu. S výberom a registráciou domény vám poradíme bezplatne.' },
  { q: 'Prečo má dvojjazyčná webstránka lepšie pozície v Google?', a: 'Google odmeňuje dvojjazyčné a viacjazyčné weby vyššími pozíciami, pretože pokrývajú väčší počet vyhľadávacích výrazov a signalizujú relevantnosť pre širšie publikum. Profesionálna tvorba web stránok Bratislava s natívnou dvojjazyčnosťou vám dáva viditeľnú výhodu oproti jednojazyčnej konkurencii.' },
];

const faqEn = [
  { q: 'How much does a website cost?', a: 'Website creation prices start from €349 for a one-page website with 48-hour delivery. Multi-page websites from €549. The exact price depends on the project scope — contact us for a free consultation.' },
  { q: 'How long does website creation take?', a: 'Fast website creation is our specialty. A one-page website is delivered in 48 hours, a 10-page website within 72 hours. Complex projects take 2 or more weeks depending on scope.' },
  { q: 'Why is Next.js better than WordPress?', a: 'Next.js achieves significantly better Core Web Vitals scores, which directly impacts search engine rankings. The result is a high-performance website that loads 3× faster than a typical WordPress site. It is also more secure — no plugins, no vulnerabilities.' },
  { q: 'What is responsive web design?', a: 'Responsive web design means your modern company website looks and works perfectly on all devices — desktop, tablet, mobile. Today this is a standard. All our websites are fully responsive.' },
  { q: 'Does the price include hosting?', a: 'Hosting is part of the monthly care plan, not the one-time website price. The monthly fee includes Vercel hosting, regular updates, security monitoring and technical support. We will guide you through domain selection and registration free of charge.' },
  { q: 'Why does a bilingual website rank higher in Google?', a: 'Google rewards bilingual and multilingual websites with higher rankings because they cover a larger number of search queries and signal relevance to a broader audience. Professional website creation in Bratislava with native bilingual support gives you a visible advantage over monolingual competitors.' },
];

/* ─── component ─────────────────────────────────────────────── */

export default function WebDesignPageClient() {
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
              {isSk ? 'Tvorba Web Stránok Bratislava' : 'Web Design Bratislava'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {isSk
                ? 'Tvorba Web Stránok Bratislava — Moderné Weby, Ktoré Predávajú'
                : 'Web Design Bratislava — Modern Websites That Actually Sell'}
            </h1>
            <p className="text-slate-text text-lg font-body leading-relaxed max-w-3xl">
              {isSk
                ? 'Vaša webová stránka je váš najdôležitejší obchodný nástroj — nie len vizitka, ale predajca pracujúci 24 hodín denne. V Dunajmedia tvoríme profesionálne webové stránky na mieru pre bratislavské a slovenské firmy, ktoré chcú vyniknúť online. Každý web je výkonná webstránka postavená na Next.js — rýchla, SEO optimalizovaná a navrhnutá tak, aby premieňala návštevníkov na zákazníkov. Webdizajn Bratislava nikdy nebol modernejší ani dostupnejší — a my dokazujeme, že vysoká kvalita a rýchle doručenie môžu ísť ruka v ruke.'
                : 'Your website is your most important business tool — not just a business card, but a salesperson working 24 hours a day. At Dunajmedia we create professional custom websites for Bratislava and Slovak businesses that want to stand out online. Every site is a high-performance website built on Next.js — fast, SEO-optimized and designed to convert visitors into customers. Web design in Bratislava has never been more modern or accessible — and we prove that high quality and fast delivery can go hand in hand.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Dunajmedia — 6 feature cards */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <span className="inline-block font-mono text-xs text-aqua uppercase tracking-widest mb-4 border border-aqua/20 px-3 py-1 rounded-full bg-aqua/5">
              {isSk ? 'Naša výhoda' : 'Our advantage'}
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mt-2">
              {isSk ? 'Prečo si firmy vyberajú Dunajmedia' : 'Why Businesses Choose Dunajmedia'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Nie všetky weby sú rovnaké. Tu je to, čo nás odlišuje od väčšiny agentúr na slovenskom trhu.'
                : 'Not all websites are equal. Here is what sets us apart from most agencies in the Slovak market.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-6 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-base mb-3">{isSk ? f.titleSk : f.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? f.descSk : f.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we can build */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Čo Vieme Vytvoriť' : 'What We Can Build'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Tvoríme rôzne typy moderných web stránok pre firmy — od jednoduchých prezentačných webov po komplexné riešenia pre špecifické odvetvia.'
                : 'We create various types of modern websites for businesses — from simple presentation sites to complex solutions for specific industries.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((type, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-navy-light border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-4 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-3">{isSk ? type.titleSk : type.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? type.descSk : type.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Technológie, Ktoré Používame' : 'Technologies We Use'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Voľba technológií priamo ovplyvňuje rýchlosť, SEO a dlhodobú udržateľnosť vášho webu. Používame len moderný tech-stack.'
                : 'The choice of technologies directly impacts the speed, SEO and long-term sustainability of your website. We use only a modern tech stack.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techs.map((tech, i) => (
              <motion.div key={tech.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <p className="font-display font-bold text-2xl text-aqua mb-3">{tech.name}</p>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? tech.descSk : tech.descEn}</p>
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
              {isSk ? 'Náš Postup Tvorby Web Stránky' : 'Our Website Creation Process'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Transparentný postup od prvého hovoru po spustenie — a ďaleko za neho.'
                : 'A transparent process from the first call to launch — and well beyond it.'}
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

      {/* Live Demos */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Pozrite Si Naše Živé Ukážky' : 'See Our Live Demos'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Každá ukážka nižšie je plne funkčná webstránka na mieru Bratislava od Dunajmedia. Toto je štandard kvality, ktorý dostane aj váš biznis.'
                : 'Every demo below is a fully custom website from Dunajmedia Bratislava. This is the quality standard your business gets too.'}
            </p>
          </motion.div>
          <WorkShowcase />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Cena Tvorby Web Stránok' : 'Website Creation Pricing'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Transparentné a fixné ceny — žiadne skryté poplatky. Cena tvorby web stránok závisí od rozsahu projektu.'
                : 'Transparent and fixed prices — no hidden fees. The price of website creation depends on the scope of the project.'}
            </p>
          </motion.div>
          <PricingTable />
          <p className="text-slate-text text-sm font-body mt-8 max-w-2xl">
            {isSk
              ? 'Mesačný plán starostlivosti zahŕňa hosting na Vercel, pravidelné aktualizácie, bezpečnostný monitoring a technickú podporu — všetko za fixný mesačný poplatok.'
              : 'The monthly care plan includes hosting on Vercel, regular updates, security monitoring and technical support — all for a fixed monthly fee.'}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10">
            <h2 className="font-display text-4xl font-bold text-slate-lightest">
              {isSk ? 'Časté Otázky' : 'FAQ'}
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
            {isSk
              ? 'Začnime vašu profesionálnu tvorbu web stránok dnes'
              : "Let's start your professional website creation today"}
          </h2>
          <p className="text-slate-text text-lg font-body mb-10">
            {isSk
              ? 'Prvá konzultácia je bezplatná a nezáväzná. Povieme vám presne, čo vaša moderná web stránka pre firmu potrebuje a za koľko ju doručíme.'
              : 'The first consultation is free and non-binding. We will tell you exactly what your modern company website needs and at what price we will deliver it.'}
          </p>
          <Link href="/contact"
            className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-8 py-4 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua">
            {isSk ? 'Získajte bezplatnú konzultáciu' : 'Get a free consultation'}
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTABanner />
      <ContactForm />
    </>
  );
}
