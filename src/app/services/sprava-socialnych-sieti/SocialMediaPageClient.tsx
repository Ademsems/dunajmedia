'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import CTABanner from '@/components/CTABanner';
import ContactForm from '@/components/ContactForm';
import ServiceFAQ from '@/components/ServiceFAQ';

/* ─── data ─────────────────────────────────────────────────── */

const platforms = [
  {
    name: 'Facebook',
    descSk: 'Správa Facebook stránky vrátane tvorby príspevkov, komunikácie s fanúšikmi, Facebook marketing pre firmy a platenej reklamy. Facebook zostáva najsilnejšou platformou pre B2C aj B2B komunikáciu na slovenskom trhu.',
    descEn: 'Facebook page management including post creation, fan communication, Facebook marketing for businesses and paid advertising. Facebook remains the strongest platform for B2C and B2B communication in the Slovak market.',
  },
  {
    name: 'Instagram',
    descSk: 'Správa Instagram účtu — organický obsah, reels, stories, Instagram marketing Bratislava a platená propagácia. Vizuálna platforma pre biznisy, ktoré chcú budovať silnú značku a zvýšenie dosahu na sociálnych sieťach.',
    descEn: 'Instagram account management — organic content, reels, stories, Instagram marketing Bratislava and paid promotion. A visual platform for businesses that want to build a strong brand and increase social media reach.',
  },
  {
    name: 'LinkedIn',
    descSk: 'Správa LinkedIn profilu pre B2B firmy, konzultantov a profesionálov. LinkedIn je najsilnejšia platforma pre získavanie obchodných kontaktov a budovanie firemnej autority.',
    descEn: 'LinkedIn profile management for B2B companies, consultants and professionals. LinkedIn is the strongest platform for acquiring business contacts and building company authority.',
  },
  {
    name: 'TikTok',
    descSk: 'TikTok marketing Slovensko — krátke videá, virálny obsah a organický rast pre biznisy, ktoré chcú osloviť mladšie publikum. TikTok rastie na slovenskom trhu rýchlejšie ako akákoľvek iná platforma.',
    descEn: 'TikTok marketing Slovakia — short videos, viral content and organic growth for businesses wanting to reach younger audiences. TikTok is growing in the Slovak market faster than any other platform.',
  },
  {
    name: 'YouTube',
    descSk: 'Správa YouTube kanála, tvorba video obsahu a optimalizácia pre vyhľadávanie. YouTube je druhý najväčší vyhľadávač na svete — vaše videá pracujú pre vás dlhodobo.',
    descEn: 'YouTube channel management, video content creation and search optimization. YouTube is the second largest search engine in the world — your videos work for you long-term.',
  },
];

const serviceCards = [
  {
    titleSk: 'Komunikačná Stratégia Sociálnych Sietí',
    titleEn: 'Social Media Communication Strategy',
    descSk: 'Každá správna social media stratégia pre firmu začína analýzou — kto sú vaši zákazníci, kde trávia čas, čo ich zaujíma a ako komunikuje vaša konkurencia. Na základe toho zostavíme komunikačnú stratégiu sociálnych sietí s jasným tónom, témami a cieľmi pre každú platformu.',
    descEn: 'Every proper social media strategy for a company starts with analysis — who your customers are, where they spend time, what interests them and how your competition communicates. Based on this we build a social media communication strategy with a clear tone, topics and goals for each platform.',
  },
  {
    titleSk: 'Tvorba Obsahu a Kreatívnych Príspevkov',
    titleEn: 'Content and Creative Post Creation',
    descSk: 'Tvorba obsahu pre sociálne siete je srdcom každej úspešnej social media prítomnosti. Vytvárame kreatívny obsah pre sociálne siete — grafiky, texty, reels, stories a videá — navrhnuté tak, aby zaujali, informovali a motivovali k akcii. Tvorba príspevkov podľa schváleného obsahového kalendára, konzistentne a v správnom načasovaní. Navyše využívame AI tvorbu obsahu pre sociálne siete na zvýšenie rýchlosti a konzistentnosti výstupu bez kompromisu v kvalite.',
    descEn: 'Content creation for social media is the heart of every successful social media presence. We create creative content for social media — graphics, texts, reels, stories and videos — designed to engage, inform and motivate action. Post creation follows an approved content calendar, consistently and at the right time. We also use AI content creation for social media to increase speed and consistency of output without compromising quality.',
  },
  {
    titleSk: 'Community Management',
    titleEn: 'Community Management',
    descSk: 'Community management je komunikácia s vašim publikom v mene vašej firmy — odpovede na komentáre, správy, recenzie a reakcie. Rýchla a profesionálna odozva buduje dôveru a lojalitu zákazníkov. Ignorovaný komentár je stratená príležitosť.',
    descEn: 'Community management is communication with your audience on behalf of your company — responding to comments, messages, reviews and reactions. Fast and professional response builds customer trust and loyalty. An ignored comment is a lost opportunity.',
  },
  {
    titleSk: 'Platená Reklama na Sociálnych Sieťach',
    titleEn: 'Paid Advertising on Social Networks',
    descSk: 'Organický dosah nestačí. Platená reklama na sociálnych sieťach — Facebook Ads, Instagram Ads, LinkedIn Ads — umožňuje presne cieliť na vašich ideálnych zákazníkov podľa veku, polohy, záujmov a správania. Reklama na sociálnych sieťach s jasným ROI — každé euro musí mať zmysel.',
    descEn: 'Organic reach is not enough. Paid advertising on social networks — Facebook Ads, Instagram Ads, LinkedIn Ads — allows precise targeting of your ideal customers by age, location, interests and behavior. Advertising on social networks with clear ROI — every euro must make sense.',
  },
  {
    titleSk: 'Meranie Výsledkov Sociálnych Sietí a Reporting',
    titleEn: 'Social Media Results Measurement and Reporting',
    descSk: 'Meranie výsledkov sociálnych sietí je to, čo oddeľuje profesionálnu správu od amatérskej. Mesačné reporty s reálnymi číslami — dosah, engagement, rast sledovateľov, kliknutia, konverzie. Viete presne, čo funguje a za čo platíte. Žiadne dohady.',
    descEn: 'Social media results measurement is what separates professional management from amateur. Monthly reports with real numbers — reach, engagement, follower growth, clicks, conversions. You know exactly what is working and what you are paying for. No guesswork.',
  },
];

const whyPoints = [
  {
    titleSk: 'AI Tvorba Obsahu pre Sociálne Siete',
    titleEn: 'AI Content Creation for Social Media',
    descSk: 'Využívame AI tvorbu obsahu pre sociálne siete — rýchlejšia produkcia, konzistentný tón značky, viac variantov na testovanie. AI nenahrádza kreativitu — zosilňuje ju. Výsledkom je viac kvalitného obsahu za rovnaký čas a cenu.',
    descEn: 'We use AI content creation for social media — faster production, consistent brand tone, more variants for testing. AI does not replace creativity — it amplifies it. The result is more quality content for the same time and price.',
  },
  {
    titleSk: 'Dvojjazyčný Obsah SK/EN — Väčší Dosah',
    titleEn: 'Bilingual Content SK/EN — Greater Reach',
    descSk: 'Tvoríme obsah v slovenčine aj angličtine. Google odmeňuje dvojjazyčné weby vyššími pozíciami — a to isté platí pre sociálne siete pri dosahovaní medzinárodného publika. Zvýšenie dosahu na sociálnych sieťach cez dvojjazyčnosť je stratégia, ktorú konkurencia väčšinou ignoruje.',
    descEn: 'We create content in Slovak and English. Google rewards bilingual websites with higher rankings — and the same applies to social media when reaching international audiences. Increasing social media reach through bilingual content is a strategy most competitors ignore.',
  },
  {
    titleSk: 'Sociálne Siete Integrované s Webom a SEO',
    titleEn: 'Social Media Integrated with Website and SEO',
    descSk: 'Sociálne siete a web fungujú ako jeden celok — preto každú social media stratégiu navrhujeme v kontexte vašej webovej stránky. Zaujíma vás aj tvorba webu? Pozrite si naše služby tvorby web stránok.',
    descEn: 'Social media management for businesses at Dunajmedia is not an isolated service — it is integrated with your website and SEO strategy. Social media and website work as one unit.',
    hasWebLink: true,
  },
  {
    titleSk: 'Transparentná Správa Sociálnych Sietí Bratislava Cena',
    titleEn: 'Transparent Social Media Management Bratislava Price',
    descSk: 'Správa sociálnych sietí Bratislava cena je u nás fixná a transparentná. Viete presne, čo dostanete každý mesiac — žiadne skryté poplatky, žiadne nejasné fakturácie. Správa sociálnych sietí cena zodpovedá hodnote, ktorú dostanete.',
    descEn: 'Social media management Bratislava price at Dunajmedia is fixed and transparent. You know exactly what you get every month — no hidden fees, no unclear billing. Social media management price matches the value you receive.',
  },
];

const processSteps = [
  {
    number: '01',
    titleSk: 'Stratégia a Obsahový Kalendár',
    titleEn: 'Strategy and Content Calendar',
    descSk: 'Na začiatku každého mesiaca zostavíme obsahový plán — témy, formáty, načasovanie a social media stratégia pre firmu na daný mesiac. Schválite pred publikovaním.',
    descEn: 'At the start of every month we build a content plan — topics, formats, timing and social media strategy for your company for that month. You approve before publishing.',
  },
  {
    number: '02',
    titleSk: 'Tvorba Kreatívneho Obsahu',
    titleEn: 'Creative Content Creation',
    descSk: 'Tvoríme kreatívny obsah pre sociálne siete — grafiky, texty, reels, stories. Tvorba príspevkov v súlade s vašou značkou a schváleným kalendárom.',
    descEn: 'We create creative content for social media — graphics, texts, reels, stories. Post creation in line with your brand and approved calendar.',
  },
  {
    number: '03',
    titleSk: 'Publikovanie a Community Management',
    titleEn: 'Publishing and Community Management',
    descSk: 'Príspevky publikujeme v optimálnom čase pre váš typ publika. Community management prebieha priebežne — komentáre, správy a reakcie sú vybavované rýchlo a profesionálne.',
    descEn: 'Posts are published at the optimal time for your audience type. Community management runs continuously — comments, messages and reactions are handled promptly and professionally.',
  },
  {
    number: '04',
    titleSk: 'Platená Propagácia na Sociálnych Sieťach',
    titleEn: 'Paid Social Media Promotion',
    descSk: 'Ak je v pláne platená reklama na sociálnych sieťach, nastavíme a optimalizujeme kampane pre maximálny výsledok pri danom rozpočte.',
    descEn: 'If paid advertising on social networks is in the plan, we set up and optimize campaigns for maximum results within the given budget.',
  },
  {
    number: '05',
    titleSk: 'Meranie a Mesačný Report',
    titleEn: 'Measurement and Monthly Report',
    descSk: 'Na konci mesiaca dostanete prehľadný report — meranie výsledkov sociálnych sietí, kľúčové metriky a odporúčania pre ďalší mesiac.',
    descEn: 'At the end of the month you receive a clear report — social media results measurement, key metrics and recommendations for the following month.',
  },
];

const faqSk = [
  { q: 'Koľko stojí správa sociálnych sietí?', a: 'Správa sociálnych sietí cena závisí od počtu platforiem, frekvencie príspevkov a rozsahu služieb. Pozrite si naše balíčky vyššie alebo nás kontaktujte pre individuálnu ponuku. Správa sociálnych sietí Bratislava cena je u nás vždy fixná — bez skrytých poplatkov.' },
  { q: 'Ako často budete pridávať príspevky?', a: 'Závisí od zvoleného balíčka. Štandardne odporúčame 3-5 príspevkov týždenne pre aktívnu propagáciu na sociálnych sieťach. Tvorba príspevkov je plánovaná dopredu v obsahovom kalendári, ktorý vždy schvaľujete.' },
  { q: 'Čo je community management?', a: 'Community management je aktívna správa komunikácie medzi vašou firmou a sledovateľmi — odpovede na komentáre, správy a recenzie. Je kľúčovou súčasťou profesionálnej správy sociálnych sietí, pretože ignorovaná správa od zákazníka je stratená dôvera.' },
  { q: 'Oplatí sa správa sociálnych sietí pre malé firmy?', a: 'Absolútne. Správa sociálnych sietí pre firmy akejkoľvek veľkosti prináša výsledky, ak je robená správne. Malé firmy majú na sociálnych sieťach výhodu — môžu komunikovať autentickejšie a osobnejšie než veľké korporácie. Facebook marketing pre firmy a Instagram marketing Bratislava sú dnes cenovo dostupné pre každý biznis.' },
  { q: 'Spravujete aj TikTok?', a: 'Áno. TikTok marketing Slovensko je rastúca príležitosť, najmä pre biznisy zamerané na mladšie publikum. Tvoríme krátke videá a obsah optimalizovaný pre TikTok algoritmus. Zvýšenie dosahu na sociálnych sieťach cez TikTok môže byť dnes rýchlejšie a lacnejšie než cez akúkoľvek inú platformu.' },
  { q: 'Aký je rozdiel medzi organickým obsahom a platenou reklamou na sociálnych sieťach?', a: 'Organický obsah — tvorba príspevkov, stories, reels — buduje dlhodobé vzťahy a dôveru. Platená reklama na sociálnych sieťach prináša okamžitý dosah a presné cielenie. Najlepšia social media stratégia pre firmu kombinuje oboje — organický obsah buduje komunitu, platená reklama na sociálnych sieťach prináša nových zákazníkov.' },
];

const faqEn = [
  { q: 'How much does social media management cost?', a: 'Social media management price depends on the number of platforms, posting frequency and scope of services. See our packages above or contact us for a custom quote. Social media management Bratislava price is always fixed — no hidden fees.' },
  { q: 'How often will you post?', a: 'It depends on the chosen package. We typically recommend 3-5 posts per week for active social media promotion. Post creation is planned in advance in the content calendar, which you always approve.' },
  { q: 'What is community management?', a: 'Community management is the active management of communication between your company and your followers — responding to comments, messages and reviews. It is a key part of professional social media management, because an ignored customer message is lost trust.' },
  { q: 'Is social media management worth it for small businesses?', a: 'Absolutely. Social media management for businesses of any size delivers results when done correctly. Small businesses have an advantage on social media — they can communicate more authentically and personally than large corporations. Facebook marketing for businesses and Instagram marketing Bratislava are today affordable for every business.' },
  { q: 'Do you manage TikTok too?', a: 'Yes. TikTok marketing Slovakia is a growing opportunity, especially for businesses targeting younger audiences. We create short videos and content optimized for the TikTok algorithm. Increasing social media reach through TikTok can today be faster and cheaper than through any other platform.' },
  { q: 'What is the difference between organic content and paid advertising on social networks?', a: 'Organic content — post creation, stories, reels — builds long-term relationships and trust. Paid advertising on social networks delivers immediate reach and precise targeting. The best social media strategy for a company combines both — organic content builds community, paid advertising on social networks brings new customers.' },
];

/* ─── component ─────────────────────────────────────────────── */

export default function SocialMediaPageClient() {
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
              {isSk ? 'Správa Sociálnych Sietí Bratislava' : 'Social Media Management Bratislava'}
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-lightest leading-tight mb-6">
              {isSk
                ? 'Správa Sociálnych Sietí Bratislava — Sledovatelia, Ktorí Nakupujú'
                : 'Social Media Management Bratislava — Followers Who Actually Buy'}
            </h1>
            <p className="font-display text-xl font-bold text-slate-lightest mb-6">
              {isSk
                ? 'Máte stovky sledovateľov, ale telefón nezvonia? Lajky sú pekné. Zákazníci sú lepší. Profesionálna správa sociálnych sietí Bratislava od Dunajmedia premieňa vašu online prítomnosť na reálny biznis — nie len na čísla dosahu.'
                : 'Hundreds of followers but the phone stays silent? Likes are nice. Customers are better. Professional social media management in Bratislava from Dunajmedia turns your online presence into real business — not just reach numbers.'}
            </p>
            <p className="text-slate-text text-lg font-body leading-relaxed max-w-3xl">
              {isSk
                ? 'Social media marketing dnes nie je voliteľný doplnok — je to miesto, kde sú vaši zákazníci každý deň. Správa sociálnych sietí pre firmy v Bratislave a na celom Slovensku vyžaduje konzistentnosť, kreativitu a stratégiu. Nestačí pridávať príspevky — každá propagácia na sociálnych sieťach musí mať jasný cieľ, cieľovú skupinu a merateľné výsledky. V Dunajmedia to robíme pre vás — od komunikačnej stratégie sociálnych sietí až po mesačné reporty.'
                : 'Social media marketing is no longer an optional add-on — it is where your customers are every single day. Social media management for businesses in Bratislava and across Slovakia requires consistency, creativity and strategy. Posting is not enough — every social media promotion must have a clear goal, target audience and measurable results. At Dunajmedia we handle all of this for you — from the social media communication strategy to monthly reports.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Platformy, Ktoré Spravujeme' : 'Platforms We Manage'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Spravujeme vaše profily tam, kde sa nachádza vaša cieľová skupina — bez ohľadu na platformu.'
                : 'We manage your profiles where your target audience is — regardless of platform.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, i) => (
              <motion.div key={platform.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-6 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-4 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-aqua text-xl mb-3">{platform.name}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? platform.descSk : platform.descEn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we include — 5 service cards */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Čo Zahŕňa Naša Správa Sociálnych Sietí' : 'What Our Social Media Management Includes'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Komplexná správa sociálnych sietí pre firmy — od stratégie po meranie výsledkov.'
                : 'Comprehensive social media management for businesses — from strategy to results measurement.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="p-7 rounded-2xl bg-navy-light border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-3">{isSk ? card.titleSk : card.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed">{isSk ? card.descSk : card.descEn}</p>
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
              {isSk ? 'Prečo Je Dunajmedia Iná' : 'Why Dunajmedia Is Different'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Väčšina agentúr správy sociálnych sietí robí obsah. My robíme výsledky.'
                : 'Most social media management agencies create content. We create results.'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyPoints.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-navy border border-white/8 hover:border-aqua/25 transition-all duration-300 group">
                <div className="w-8 h-0.5 bg-aqua mb-5 group-hover:w-12 transition-all duration-300" />
                <h3 className="font-display font-bold text-slate-lightest text-lg mb-3">{isSk ? point.titleSk : point.titleEn}</h3>
                <p className="text-slate-text text-sm font-body leading-relaxed mb-3">{isSk ? point.descSk : point.descEn}</p>
                {point.hasWebLink && (
                  <Link href="/services/tvorba-web-stranok" className="text-aqua text-sm font-body hover:underline inline-flex items-center gap-1">
                    {isSk ? 'Pozrite si naše služby tvorby web stránok.' : 'See our web design services.'}
                    <ArrowRight size={12} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Process */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Náš Mesačný Postup' : 'Our Monthly Process'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Správa sociálnych sietí pre firmy funguje ako hodinky — každý mesiac rovnaký profesionálny postup.'
                : 'Social media management for businesses runs like clockwork — the same professional process every month.'}
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

      {/* Pricing */}
      <section className="py-24 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-8">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest">
              {isSk ? 'Cena Správy Sociálnych Sietí' : 'Social Media Management Pricing'}
            </h2>
            <p className="text-slate-text text-lg font-body mt-4 max-w-2xl">
              {isSk
                ? 'Správa sociálnych sietí je individuálna služba — cena závisí od počtu platforiem, frekvencie obsahu a rozsahu. Kontaktujte nás pre bezplatnú konzultáciu a cenovú ponuku na mieru.'
                : 'Social media management is an individual service — the price depends on the number of platforms, content frequency and scope. Contact us for a free consultation and a custom quote.'}
            </p>
          </motion.div>
          <Link href="/contact"
            className="group inline-flex items-center gap-2 bg-aqua text-navy font-display font-bold px-7 py-3.5 rounded-xl hover:bg-aqua-electric transition-all duration-300 shadow-aqua">
            {isSk ? 'Získajte cenovú ponuku' : 'Get a quote'}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
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
      <section className="py-20 bg-navy-light relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-lightest mb-5">
            {isSk ? 'Začnite Premieňať Sledovateľov na Zákazníkov' : 'Start Turning Followers Into Customers'}
          </h2>
          <p className="text-slate-text text-lg font-body mb-10">
            {isSk
              ? 'Profesionálna správa sociálnych sietí Bratislava od Dunajmedia — s AI tvorbou obsahu, dvojjazyčnou komunikáciou a merateľnými výsledkami. Prvá konzultácia je bezplatná.'
              : 'Professional social media management Bratislava from Dunajmedia — with AI content creation, bilingual communication and measurable results. First consultation is free.'}
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
