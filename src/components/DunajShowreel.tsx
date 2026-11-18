'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, FolderOpen, Layers, MousePointer, Monitor, PaintBucket, PenTool, Search, Square, Type } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type Lang = 'sk' | 'en';

interface Pill {
  text: string;
  highlight: boolean;
  x: number;
  y: number;
  rot: number;
}

interface Dict {
  hello: string;
  weAre: string;
  ourServices: string;
  pills: Pill[];
  notLuck: string;
  itsStrategy: string;
  strategyWord: string;
  blueprintCallout1: string;
  blueprintCallout2: string;
  blueprintCallout3: string;
  socialKitHighlight: string;
  experienceText: string[];
  brandingTitle: string;
  glocalSub: string;
  pillShowOff: string;
  pillStory: string;
  pillAudience: string;
  pillSpeed: string;
  finalTagline: string;
}

interface SceneProps {
  /** Normalised scene progress, 0 → 1 */
  t: number;
  dict: Dict;
}

/*
 * DunajShowreel — 9-act, 42 s agency film rendered live on a fixed 1920×1080
 * coordinate stage that is scaled to its container. Pure React/SVG, no assets.
 * Copy follows the site language (SK/EN) via LanguageContext.
 */
// ============================================================================
// TIMELINE (42.0 SECONDS TOTAL — 9 ACT CHOREOGRAPHY)
// ============================================================================
const TOTAL_DURATION = 42.0;


// ============================================================================
// BILINGUAL COPY DICTIONARY (SK & EN)
// ============================================================================
const COPY: Record<Lang, Dict> = {
  sk: {
    hello: 'Ahoj',
    weAre: 'Sme DunajMedia',
    ourServices: 'naše služby',
    pills: [
      { text: 'Tvorba Webu (Next.js)', highlight: true, x: -250, y: -175, rot: -6 },
      { text: 'AI SEO & GEO', highlight: false, x: 240, y: -160, rot: 8 },
      { text: 'Správa Sociálnych Sietí', highlight: false, x: -290, y: 155, rot: 5 },
      { text: 'Branding & Identita', highlight: false, x: -70, y: -230, rot: 2 },
      { text: 'Google & Meta Ads', highlight: false, x: 270, y: 40, rot: -4 },
      { text: 'UI/UX & Motion', highlight: false, x: 110, y: -85, rot: -11 },
      { text: 'Stratégia & Rast', highlight: false, x: 130, y: 165, rot: 3 }
    ],
    notLuck: 'Digitálny rast nie je náhoda',
    itsStrategy: 'je to',
    strategyWord: 'stratégia',
    blueprintCallout1: 'NEXT.JS ARCHITEKTÚRA — 99/100 RÝCHLOSŤ',
    blueprintCallout2: 'GEO & AI SCHÉMA — CITOVANÉ V CHATGPT',
    blueprintCallout3: 'KONVERZNÝ DIZAJN — DOPYTY OD PRVÉHO DŇA',
    socialKitHighlight: 'sociálne siete & AI SEO',
    experienceText: ['Viac ako', '11 rokov', 'skúseností'],
    brandingTitle: 'SYSTÉM ZNAČKY & TECHNOLÓGIA',
    glocalSub: 'Zakladajúca agentúra · Bratislava',
    pillShowOff: 'Ukážte svoju značku.',
    pillStory: 'Povedzte svoj príbeh',
    pillAudience: 'Ovládnite Google aj AI vyhľadávanie',
    pillSpeed: 'Web do 72h',
    finalTagline: 'Vaša digitálna a mediálna agentúra v Bratislave'
  },
  en: {
    hello: 'Hello',
    weAre: 'We are DunajMedia',
    ourServices: 'our services',
    pills: [
      { text: 'Web Design (Next.js)', highlight: true, x: -250, y: -175, rot: -6 },
      { text: 'AI SEO & GEO', highlight: false, x: 240, y: -160, rot: 8 },
      { text: 'Social Media Kit', highlight: false, x: -290, y: 155, rot: 5 },
      { text: 'Brand Identity', highlight: false, x: -70, y: -230, rot: 2 },
      { text: 'Google & Meta Ads', highlight: false, x: 270, y: 40, rot: -4 },
      { text: 'UI/UX & Motion', highlight: false, x: 110, y: -85, rot: -11 },
      { text: 'Growth Strategy', highlight: false, x: 130, y: 165, rot: 3 }
    ],
    notLuck: "Digital growth isn't luck",
    itsStrategy: "it's",
    strategyWord: 'strategy',
    blueprintCallout1: 'NEXT.JS ARCHITECTURE — SUB-SECOND LOAD',
    blueprintCallout2: 'GEO & AI SCHEMA — CITED BY CHATGPT & GEMINI',
    blueprintCallout3: 'CONVERSION UX — BUILT TO CAPTURE LEADS',
    socialKitHighlight: 'social media & AI SEO',
    experienceText: ['More than', '11 years of', 'experience'],
    brandingTitle: 'BRAND SYSTEM & ENGINEERING',
    glocalSub: 'Founding Agency · Bratislava',
    pillShowOff: 'Show off your brand.',
    pillStory: 'Tell your story',
    pillAudience: 'Dominate Google & AI search',
    pillSpeed: '72h Delivery',
    finalTagline: 'Full-Service Digital & Media Agency · Bratislava'
  }
};

// ============================================================================
// UTILITY MATH HELPERS FOR FRAME-ACCURATE INTERPOLATION
// ============================================================================
const clamp = (val: number, min = 0, max = 1) => Math.max(min, Math.min(max, val));
const progress = (t: number, start: number, end: number) => clamp((t - start) / (end - start), 0, 1);
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// ============================================================================
// OFFICIAL DUNAJMEDIA "un" BRANDMARK SVG (FROM Icon-blue.png & Icon-cyan.png)
// Exact interconnected 'un' wave ribbon from D[un]ajMedia
// ============================================================================
function DunajBrandmark({
  size = 120,
  color = '#00F0FF',
  showBezier = false,
  strokeProgress = 1,
  className = ''
}: {
  size?: number;
  color?: string;
  showBezier?: boolean;
  strokeProgress?: number;
  className?: string;
}) {
  const width = size * 1.3;
  const height = size;

  // Exact ribbon outline with quarter-circle top-left & bottom-right terminals
  const ribbonPath =
    'M 10 16 A 28 28 0 0 1 38 44 L 38 117 A 39 39 0 0 0 116 117 L 116 83 A 67 67 0 0 1 250 83 L 250 184 A 28 28 0 0 1 222 156 L 222 83 A 39 39 0 0 0 144 83 L 144 117 A 67 67 0 0 1 10 117 L 10 16 Z';

  // Centerline path for progressive blueprint drawing
  const centerLinePath =
    'M 24 20 L 24 117 A 53 53 0 0 0 130 117 L 130 83 A 53 53 0 0 1 236 83 L 236 180';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 200"
      fill="none"
      className={`overflow-visible select-none shrink-0 ${className}`}
    >
      <defs>
        <filter id="brandmarkGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {showBezier ? (
        <>
          {/* Translucent Inner Ribbon Fill */}
          <path
            d={ribbonPath}
            fill={color}
            fillOpacity={0.18 * strokeProgress}
            stroke={color}
            strokeWidth="3.5"
            filter="url(#brandmarkGlow)"
            strokeDasharray="1200"
            strokeDashoffset={(1 - strokeProgress) * 1200}
          />
          {/* Progressive Center Spine */}
          <path
            d={centerLinePath}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray="600"
            strokeDashoffset={(1 - strokeProgress) * 600}
            strokeOpacity="0.85"
          />
          {/* Bezier Anchor Nodes & Handles for Blueprint Scene */}
          {strokeProgress > 0.35 && (
            <g opacity={clamp((strokeProgress - 0.35) * 2, 0, 1)}>
              {/* Top-left terminal node */}
              <circle cx="10" cy="16" r="5" fill="#060913" stroke={color} strokeWidth="2.5" />
              <circle cx="38" cy="44" r="5" fill="#060913" stroke={color} strokeWidth="2.5" />
              {/* U-Bowl bottom tangent handle */}
              <line x1="25" y1="184" x2="129" y2="184" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="25" cy="184" r="4" fill={color} />
              <circle cx="77" cy="184" r="5.5" fill="#060913" stroke={color} strokeWidth="2.5" />
              <circle cx="129" cy="184" r="4" fill={color} />
              {/* N-Arch top tangent handle */}
              <line x1="131" y1="16" x2="235" y2="16" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="131" cy="16" r="4" fill={color} />
              <circle cx="183" cy="16" r="5.5" fill="#060913" stroke={color} strokeWidth="2.5" />
              <circle cx="235" cy="16" r="4" fill={color} />
              {/* Bottom-right terminal node */}
              <circle cx="222" cy="156" r="5" fill="#060913" stroke={color} strokeWidth="2.5" />
              <circle cx="250" cy="184" r="5" fill="#060913" stroke={color} strokeWidth="2.5" />
            </g>
          )}
        </>
      ) : (
        <path d={ribbonPath} fill={color} />
      )}
    </svg>
  );
}

// ============================================================================
// OFFICIAL DUNAJMEDIA FULL LOGO ("D[un]ajMedia")
// Matches Brandmark-blue.png (light mode) & Brandmark-cyan.png (dark mode)
// ============================================================================
function DunajLogo({
  size = 72,
  theme = 'dark', // 'dark' -> White D[un]aj + Cyan Media | 'light' -> #172336 Navy | 'mono-dark' -> #060913
  brandmarkAccent = false,
  className = ''
}: {
  size?: number;
  theme?: 'dark' | 'light' | 'mono-dark';
  brandmarkAccent?: boolean;
  className?: string;
}) {
  const primaryColor =
    theme === 'light' ? '#172336' : theme === 'mono-dark' ? '#060913' : '#FFFFFF';
  const mediaColor =
    theme === 'light' ? '#172336' : theme === 'mono-dark' ? '#060913' : '#00F0FF';
  const unColor = brandmarkAccent
    ? '#00F0FF'
    : theme === 'light'
    ? '#172336'
    : theme === 'mono-dark'
    ? '#060913'
    : '#FFFFFF';

  const markHeight = Math.round(size * 0.74);

  return (
    <div
      className={`inline-flex items-baseline select-none leading-none tracking-[-0.03em] font-sans-clean ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      <span style={{ color: primaryColor, fontWeight: 600 }}>D</span>
      <span
        className="inline-flex items-center mx-[0.02em]"
        style={{ transform: `translateY(${size * 0.06}px)` }}
      >
        <DunajBrandmark size={markHeight} color={unColor} />
      </span>
      <span style={{ color: primaryColor, fontWeight: 600 }}>aj</span>
      <span style={{ color: mediaColor, fontWeight: 600 }}>Media</span>
    </div>
  );
}

const SLOW_WINDOWS: Array<[number, number]> = [
  [30.7, 33.5],
  [39.8, 41.0]
];
/** Frame shown when the user prefers reduced motion: the final logo lockup. */
const STILL_FRAME_TIME = 41.5;

export default function DunajShowreel({ className = '' }: { className?: string }) {
  const { locale, t: tr } = useLanguage();
  const lang: Lang = locale === 'en' ? 'en' : 'sk';
  const dict = COPY[lang];

  const containerRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(0.3);
  const [currentTime, setCurrentTime] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const lastFrameTimeRef = useRef<number | null>(null);

  const t = reduceMotion ? STILL_FRAME_TIME : currentTime;

  // Sharp scaling of the 1920×1080 stage to whatever width the frame has
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) setStageScale(rect.width / 1920);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      mq.removeEventListener('change', apply);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Only burn frames while the film is on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // First visit of the session: let the preloader curtain lift before "Ahoj" starts
  useEffect(() => {
    const introPending = !document.documentElement.hasAttribute('data-intro');
    const timer = setTimeout(() => setStarted(true), introPending ? 2100 : 0);
    return () => clearTimeout(timer);
  }, []);

  const playing = started && inView && tabVisible && !reduceMotion;

  // Seamless loop; 20% slower pacing inside the two slow windows
  useEffect(() => {
    if (!playing) {
      lastFrameTimeRef.current = null;
      return;
    }
    let raf = 0;
    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) lastFrameTimeRef.current = timestamp;
      const rawDelta = (timestamp - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = timestamp;

      setCurrentTime((prev) => {
        const slow = SLOW_WINDOWS.some(([from, to]) => prev >= from && prev <= to);
        const next = prev + (slow ? rawDelta * 0.8 : rawDelta);
        return next >= TOTAL_DURATION ? 0 : next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={tr('showreel.aria')}
      className={`relative w-full aspect-video overflow-hidden rounded-2xl sm:rounded-3xl border border-aqua/25 bg-[#060913] shadow-[0_25px_90px_rgba(0,0,0,0.6),0_0_44px_rgba(0,240,255,0.14)] ${className}`}
    >
      {/* Scaled 1920×1080 fixed-coordinate stage (decorative; described by the aria-label above) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: `scale(${stageScale})`,
          transformOrigin: 'top left'
        }}
        className="overflow-hidden select-none font-sans-clean"
      >
        {t >= 0 && t < 4.5 && <Scene1Hello t={progress(t, 0, 4.2)} dict={dict} />}
        {t >= 4.0 && t < 8.5 && <Scene2WeAre t={progress(t, 4.2, 8.2)} dict={dict} />}
        {t >= 8.0 && t < 13.5 && <Scene3Services t={progress(t, 8.2, 13.2)} dict={dict} />}
        {t >= 13.0 && t < 17.8 && <Scene4StrategyBlueprint t={progress(t, 13.2, 17.5)} dict={dict} />}
        {t >= 17.3 && t < 22.8 && <Scene5DeliverablesScatter t={progress(t, 17.5, 22.5)} />}
        {t >= 22.3 && t < 30.0 && <Scene6StudioWorkspace t={progress(t, 22.5, 29.8)} />}
        {t >= 29.6 && t < 34.8 && <Scene7SocialCloud t={progress(t, 29.8, 34.6)} dict={dict} />}
        {t >= 34.4 && t < 38.7 && <Scene8BrandSystem t={progress(t, 34.6, 38.5)} dict={dict} />}
        {t >= 38.3 && t <= 42.0 && <Scene9Finale t={progress(t, 38.5, 42.0)} dict={dict} />}

        {/* Subtle film grain across all scenes */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] z-50 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// SCENE 1 (0:00 - 4.2s): GIANT KINETIC "HELLO / AHOJ" + ORBITING AQUA DOT
// Mirrors 00:00 - 00:01 of Sprk Header video
// ============================================================================
function Scene1Hello({ t, dict }: SceneProps) {
  // Smooth vertical drum roll of the stacked "Ahoj / Hello" typography
  const drumOffset = easeInOutCubic(clamp(t * 1.2, 0, 1)) * -310;
  // Orbit angle in radians
  const angle = t * Math.PI * 2.4;
  const rx = 740;
  const ry = 175;
  const tiltDeg = 8 - t * 10;
  const dotX = Math.cos(angle) * rx;
  const dotY = Math.sin(angle) * ry;

  // Curtain wipe to deep navy at the very end of Scene 1
  const wipeProgress = easeInOutCubic(progress(t, 0.82, 1.0));

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex items-center justify-center overflow-hidden">
      {/* Subtle architectural grid lines */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'linear-gradient(to right, #CBD5E1 1px, transparent 1px), linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '120px 120px'
        }}
      />

      {/* Giant Kinetic Drum Roll Typography */}
      <div
        className="relative flex flex-col items-center justify-center leading-[0.88] tracking-[-0.05em] font-extrabold text-[#060913] select-none"
        style={{
          fontSize: '360px',
          transform: `translateY(${drumOffset + 150}px)`
        }}
      >
        <div className="py-4">{dict.hello}</div>
        <div className="py-4 flex items-center">
          <span>{dict.hello}</span>
          <span className="inline-block w-14 h-14 rounded-full bg-[#00F0FF] ml-4 shadow-[0_0_40px_#00F0FF]" />
        </div>
        <div className="py-4">{dict.hello}</div>
      </div>

      {/* Tilted Elliptical Orbit Path + Orbiting Electric Aqua Dot */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: `rotate(${tiltDeg}deg)` }}
      >
        <svg width="1700" height="500" viewBox="-850 -250 1700 500" className="overflow-visible">
          <ellipse
            cx="0"
            cy="0"
            rx={rx}
            ry={ry}
            fill="none"
            stroke="#060913"
            strokeWidth="3.5"
            strokeDasharray="1600"
            strokeDashoffset={(1 - easeOutExpo(clamp(t * 2, 0, 1))) * 1600}
          />
          {/* Glowing Orbiting Aqua Sphere */}
          <circle
            cx={dotX}
            cy={dotY}
            r="26"
            fill="#00F0FF"
            stroke="#060913"
            strokeWidth="5"
          />
        </svg>
      </div>

      {/* Curtain Transition into Scene 2 */}
      {wipeProgress > 0 && (
        <div
          className="absolute inset-0 bg-[#060913] z-20"
          style={{ transform: `translateY(${(1 - wipeProgress) * 100}%)` }}
        />
      )}
    </div>
  );
}

// ============================================================================
// SCENE 2 (4.2s - 8.2s): "WE ARE DUNAJMEDIA|" TYPEWRITER & URL PILL
// Mirrors 00:02 - 00:03 of Sprk Header video
// ============================================================================
function Scene2WeAre({ t, dict }: SceneProps) {
  const fullText = dict.weAre;
  const typedCount = Math.floor(clamp(progress(t, 0.08, 0.58), 0, 1) * fullText.length);
  const visibleText = fullText.slice(0, typedCount);
  const pillScale = easeOutBack(progress(t, 0.48, 0.78));
  const exitWipe = easeInOutCubic(progress(t, 0.85, 1.0));

  return (
    <div className="absolute inset-0 bg-[#060913] flex flex-col justify-between items-center overflow-hidden">
      {/* Top Electric Aqua Bar (like the red bar in Sprk) */}
      <div
        className="w-full bg-[#00F0FF] shadow-[0_0_50px_rgba(0,240,255,0.5)]"
        style={{ height: `${easeOutExpo(clamp(t * 3, 0, 1)) * 68}px` }}
      />

      {/* Center Typewriter Headline */}
      <div className="flex flex-col items-center justify-center my-auto px-12">
        <div className="flex items-center justify-center text-[176px] font-extrabold tracking-[-0.04em] text-white leading-none">
          <span>
            {visibleText.includes('DunajMedia') ? (
              <>
                {visibleText.replace('DunajMedia', '')}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#00D2FF]">
                  DunajMedia
                </span>
              </>
            ) : (
              visibleText
            )}
          </span>
          {/* Blinking Electric Aqua Caret */}
          <span
            className="inline-block w-[6px] h-[170px] bg-[#00F0FF] ml-4 shadow-[0_0_25px_#00F0FF]"
            style={{ opacity: Math.floor(t * 8) % 2 === 0 ? 1 : 0.15 }}
          />
        </div>

        {/* Sleek Outlined URL Pill */}
        <div
          style={{
            transform: `scale(${pillScale})`,
            opacity: clamp(progress(t, 0.45, 0.65), 0, 1)
          }}
          className="mt-14 w-[920px] h-[74px] rounded-full border-2 border-white/80 bg-[#0B1224]/80 flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.18)]"
        >
          <span className="text-[32px] font-bold tracking-wide text-white">
            www.dunajmedia.sk
          </span>
        </div>
      </div>

      <div className="h-12" />

      {/* Wipe to Off-White Scene 3 */}
      {exitWipe > 0 && (
        <div
          className="absolute inset-0 bg-[#F4F6FA] z-20"
          style={{ transform: `translateX(${(1 - exitWipe) * 100}%)` }}
        />
      )}
    </div>
  );
}

// ============================================================================
// SCENE 3 (8.2s - 13.2s): "OUR SERVICES" PILL AVALANCHE + PULSE ARROW
// Mirrors 00:04 - 00:06 of Sprk Header video
// ============================================================================
function Scene3Services({ t, dict }: SceneProps) {
  // Camera pan left when the circular Aqua arrow button is clicked at t > 0.78
  const panLeft = easeInOutCubic(progress(t, 0.78, 1.0)) * -1920;
  const btnScale = easeOutBack(progress(t, 0.45, 0.68));
  const btnClick = t > 0.72 && t < 0.8 ? 0.88 : 1;

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] overflow-hidden flex items-center justify-center">
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transform: `translateX(${panLeft}px)` }}
      >
        {/* Giant Center "naše služby / our services" */}
        <h2
          className="text-[215px] font-extrabold text-[#060913] tracking-[-0.045em] leading-none z-10"
          style={{
            transform: `scale(${0.9 + 0.1 * easeOutExpo(clamp(t * 3, 0, 1))})`
          }}
        >
          {dict.ourServices}
        </h2>

        {/* Physics-Animated Service Pills Clustering Around Center */}
        {dict.pills.map((pill, idx) => {
          const startT = 0.08 + idx * 0.06;
          const p = easeOutBack(progress(t, startT, startT + 0.28));
          const dropY = (1 - p) * -450;
          return (
            <div
              key={idx}
              style={{
                transform: `translate(${pill.x}px, ${pill.y + dropY}px) rotate(${pill.rot * p}deg) scale(${clamp(p, 0, 1.08)})`,
                opacity: clamp(p * 2, 0, 1)
              }}
              className={`absolute z-20 px-12 py-5 rounded-full border-[2.5px] bg-[#F4F6FA] shadow-[0_14px_35px_rgba(6,9,19,0.08)] whitespace-nowrap ${
                pill.highlight
                  ? 'border-[#060913] text-[#00A8B5] font-extrabold ring-4 ring-[#00F0FF]/30'
                  : 'border-[#060913] text-[#060913] font-medium'
              } text-[64px] tracking-tight`}
            >
              {pill.text}
            </div>
          );
        })}

        {/* Circular Electric Aqua Arrow CTA Button (Bottom Right) */}
        <div
          style={{
            transform: `scale(${btnScale * btnClick})`,
            opacity: clamp(progress(t, 0.45, 0.6), 0, 1)
          }}
          className="absolute bottom-20 right-36 w-[250px] h-[250px] rounded-full bg-[#060913] border-4 border-[#00F0FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,240,255,0.5)] z-30"
        >
          <ArrowRight className="w-28 h-28 text-[#00F0FF] stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCENE 4 (13.2s - 17.5s): "DIGITAL GROWTH ISN'T LUCK — IT'S STRATEGY" + BLUEPRINT
// Mirrors 00:07 - 00:09 of Sprk Header video
// ============================================================================
function Scene4StrategyBlueprint({ t, dict }: SceneProps) {
  // Phase A (0.0 - 0.52): Typewriter "Digital growth isn't luck -> it's strategy"
  // Phase B (0.52 - 1.0): Zoom into glowing Navy & Aqua Vector Blueprint card
  const phaseB = easeInOutCubic(progress(t, 0.5, 0.72));
  const strokeDraw = easeInOutCubic(progress(t, 0.56, 0.94));

  // Typewriter logic for Phase A
  const showSecondPart = t > 0.28;
  const firstText = dict.notLuck;
  const typed1 = firstText.slice(0, Math.floor(progress(t, 0.02, 0.24) * firstText.length));
  const highlightWidth = easeOutExpo(progress(t, 0.34, 0.48)) * 100;

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex items-center justify-center overflow-hidden">
      {/* PHASE A: Minimalist Editorial Statement */}
      <div
        className="flex items-center justify-center text-[104px] text-[#060913] font-normal tracking-tight"
        style={{
          opacity: 1 - phaseB,
          transform: `scale(${1 - phaseB * 0.25})`
        }}
      >
        {!showSecondPart ? (
          <div className="flex items-center">
            <span>{typed1}</span>
            <span className="inline-block w-[4px] h-[110px] bg-[#060913] ml-6 animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-light">|</span>
            <span>{dict.itsStrategy}</span>
            <span className="relative inline-block px-5 py-1 font-bold text-[#060913]">
              <span
                className="absolute inset-0 bg-[#00F0FF] -z-10 rounded-lg shadow-[0_0_35px_rgba(0,240,255,0.6)]"
                style={{ width: `${highlightWidth}%` }}
              />
              {dict.strategyWord}
            </span>
          </div>
        )}
      </div>

      {/* PHASE B: Deep Navy Architectural Blueprint Card featuring the Official 'un' Brandmark */}
      {phaseB > 0 && (
        <div
          style={{
            opacity: phaseB,
            transform: `scale(${0.65 + phaseB * 0.35})`
          }}
          className="absolute w-[1420px] h-[820px] rounded-[44px] bg-[#060913] border-2 border-[#00F0FF]/40 shadow-[0_35px_100px_rgba(6,9,19,0.75)] overflow-hidden flex items-center justify-center"
        >
          {/* Blueprint Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />

          {/* Top Dimension Ruler Bar */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[780px] flex flex-col items-center">
            <span className="text-[#00F0FF] font-mono-code text-xl tracking-widest mb-2">
              D[UN]AJMEDIA LIGATURE · 8X BEZIER PRECISION
            </span>
            <div className="w-full h-3 border-t-2 border-x-2 border-[#00F0FF]/60" />
          </div>

          {/* Animated Glowing Vector 'un' Brandmark Blueprint + Technical Callouts */}
          <div className="relative flex items-center justify-center">
            <DunajBrandmark
              size={390}
              color="#00F0FF"
              showBezier={true}
              strokeProgress={strokeDraw}
            />

            {/* Technical Callout Lines & Labels */}
            <svg
              width="1320"
              height="680"
              viewBox="0 0 1320 680"
              className="absolute pointer-events-none overflow-visible"
              style={{ opacity: clamp(progress(t, 0.66, 0.9), 0, 1) }}
            >
              {/* Callout 1: Top-left U-stem terminal */}
              <polyline
                points="430,190 250,130 90,130"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.5"
              />
              <circle cx="430" cy="190" r="5" fill="#00F0FF" />
              <text x="60" y="108" fill="#00F0FF" className="font-mono-code text-[19px] font-bold">
                {dict.blueprintCallout1}
              </text>

              {/* Callout 2: Bottom U-bowl curve */}
              <polyline
                points="555,500 430,575 140,575"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.5"
              />
              <circle cx="555" cy="500" r="5" fill="#00F0FF" />
              <text x="90" y="610" fill="#00F0FF" className="font-mono-code text-[19px] font-bold">
                {dict.blueprintCallout2}
              </text>

              {/* Callout 3: Right N-arch & terminal */}
              <polyline
                points="890,460 1010,545 1230,545"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="2.5"
              />
              <circle cx="890" cy="460" r="5" fill="#00F0FF" />
              <text x="740" y="582" fill="#00F0FF" className="font-mono-code text-[19px] font-bold">
                {dict.blueprintCallout3}
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCENE 5 (17.5s - 22.5s): DESKTOP DELIVERABLES SCATTER & HAND CURSOR CLICK
// Mirrors 00:10 - 00:12 of Sprk Header video
// ============================================================================
function Scene5DeliverablesScatter({ t }: { t: number }) {
  // Camera pulls back from the center blueprint card to reveal all 6 surrounding deliverable cards
  const zoomOut = easeOutExpo(clamp(t * 2.2, 0, 1));
  const centerScale = 1 - zoomOut * 0.56;

  // Hand cursor glides in from bottom-right to click the center card
  const handP = easeInOutCubic(progress(t, 0.45, 0.85));
  const handX = 680 - handP * 540;
  const handY = 420 - handP * 290;
  const isClicking = t > 0.85 && t < 0.94;

  const cards = [
    {
      label: 'GrandApartman_Web.tsx',
      x: -630,
      y: -250,
      w: 390,
      h: 240,
      bg: 'bg-[#0B1224]',
      tag: 'CLIENT · NEXT.JS 14',
      title: 'Grand Apartman Podhájska',
      metric: '+310% Direct Bookings'
    },
    {
      label: 'AI_GEO_Schema.json',
      x: -210,
      y: -290,
      w: 360,
      h: 215,
      bg: 'bg-gradient-to-br from-[#060913] to-[#0F2942]',
      tag: 'AI SEARCH · GEO',
      title: 'Cited #1 in ChatGPT & Perplexity',
      metric: 'JSON-LD Entity Verified'
    },
    {
      label: 'RKC_Technology_B2B.webp',
      x: 260,
      y: -270,
      w: 350,
      h: 220,
      bg: 'bg-[#0B1224]',
      tag: 'B2B TECH · SLOVAKIA',
      title: 'Advanced Navigation SK',
      metric: '0.6s Global Edge Load'
    },
    {
      label: 'WeAreGlocal_Network.pdf',
      x: 650,
      y: -240,
      w: 370,
      h: 230,
      bg: 'bg-white text-[#060913]',
      light: true,
      tag: 'FOUNDING AGENCY',
      title: 'The Glocal Network',
      metric: 'International Reach'
    },
    {
      label: 'SocialMedia_Reels.mp4',
      x: -610,
      y: 210,
      w: 340,
      h: 270,
      bg: 'bg-[#081A33]',
      tag: 'REELS & CONTENT',
      title: 'Short-Form Video & Brand Kit',
      metric: 'IG · FB · LinkedIn · X'
    },
    {
      label: 'GoogleAds_ROAS.csv',
      x: 560,
      y: 230,
      w: 440,
      h: 230,
      bg: 'bg-[#0B1224]',
      tag: 'PAID SEARCH · PPC',
      title: 'High-Intent Lead Capture',
      metric: 'GA4 Conversion Synced'
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex items-center justify-center overflow-hidden">
      {/* Surrounding Scatter of Multi-Discipline Agency Deliverables */}
      {cards.map((c, i) => {
        const appear = easeOutBack(progress(t, 0.08 + i * 0.05, 0.42 + i * 0.05));
        const labelTyped = c.label.slice(
          0,
          Math.floor(progress(t, 0.22 + i * 0.05, 0.58 + i * 0.05) * c.label.length)
        );
        return (
          <div
            key={i}
            style={{
              transform: `translate(${c.x * zoomOut}px, ${c.y * zoomOut}px) scale(${appear})`,
              opacity: clamp(appear * 1.5, 0, 1)
            }}
            className="absolute flex flex-col items-center"
          >
            <div
              style={{ width: c.w, height: c.h }}
              className={`${c.bg} rounded-3xl p-6 border ${
                c.light ? 'border-slate-300' : 'border-[#00F0FF]/30'
              } shadow-[0_20px_50px_rgba(6,9,19,0.16)] flex flex-col justify-between overflow-hidden relative`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-mono-code font-bold px-2.5 py-1 rounded-full ${
                    c.light ? 'bg-[#060913] text-[#00F0FF]' : 'bg-[#00F0FF]/15 text-[#00F0FF]'
                  }`}
                >
                  {c.tag}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
              </div>

              <div>
                <div className={`text-2xl font-extrabold leading-tight ${c.light ? 'text-[#060913]' : 'text-white'}`}>
                  {c.title}
                </div>
                <div className="text-sm font-mono-code text-[#00D2FF] mt-1 font-semibold">
                  {c.metric}
                </div>
              </div>
            </div>

            {/* Highlighted Filename Pill Underneath (Just like Sprk 00:11) */}
            {labelTyped.length > 0 && (
              <div className="mt-3 px-4 py-1 rounded-md bg-[#00F0FF] text-[#060913] font-mono-code font-bold text-lg shadow-sm">
                {labelTyped}
              </div>
            )}
          </div>
        );
      })}

      {/* Center Blueprint Card (`Dunaj_Brandmark.svg`) */}
      <div
        style={{
          transform: `scale(${centerScale * (isClicking ? 0.94 : 1)})`
        }}
        className="relative flex flex-col items-center z-20 transition-transform duration-75"
      >
        <div className="w-[1060px] h-[620px] rounded-[40px] bg-[#060913] border-4 border-[#00F0FF] shadow-[0_25px_80px_rgba(6,9,19,0.35)] flex flex-col items-center justify-center p-10 relative">
          <div className="text-[#00F0FF] font-mono-code text-xl tracking-widest uppercase mb-6">
            DUNAJMEDIA FULL-STACK SYSTEM · D[UN]AJMEDIA
          </div>
          <div className="flex items-center gap-10">
            <DunajBrandmark size={185} color="#00F0FF" showBezier={true} strokeProgress={1} />
          </div>
          <div className="mt-7">
            <DunajLogo size={78} theme="dark" brandmarkAccent={true} />
          </div>
          <div className="mt-6 flex items-center gap-4 text-slate-300 font-mono-code text-xl">
            <span>WEB</span>
            <span className="text-[#00F0FF]">◆</span>
            <span>AI SEO &amp; GEO</span>
            <span className="text-[#00F0FF]">◆</span>
            <span>SOCIAL</span>
            <span className="text-[#00F0FF]">◆</span>
            <span>BRANDING</span>
          </div>
        </div>
        <div className="mt-5 px-6 py-2 rounded-lg bg-[#00F0FF] text-[#060913] font-mono-code font-extrabold text-3xl shadow-md">
          Dunaj_Brandmark.svg
        </div>
      </div>

      {/* Animated Hand Pointer Cursor (Mirrors 00:11 in Sprk) */}
      <div
        style={{
          transform: `translate(${handX}px, ${handY}px) scale(${isClicking ? 0.85 : 1})`
        }}
        className="absolute z-40 pointer-events-none drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
      >
        {/* Click Ripple */}
        {isClicking && (
          <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full border-4 border-[#00F0FF] animate-ping" />
        )}
        <svg width="95" height="110" viewBox="0 0 24 28" fill="none">
          <path
            d="M7 2V15L4.2 12.8C3.4 12.2 2.2 12.3 1.6 13.1C1 13.8 1.1 14.9 1.8 15.6L8.5 22.5C9.8 23.8 11.6 24.5 13.5 24.5H18C20.5 24.5 22.5 22.5 22.5 20V11.5C22.5 10.4 21.6 9.5 20.5 9.5C19.9 9.5 19.4 9.8 19 10.2V9.5C19 8.4 18.1 7.5 17 7.5C16.4 7.5 15.9 7.8 15.5 8.2V7.5C15.5 6.4 14.6 5.5 13.5 5.5C12.9 5.5 12.4 5.8 12 6.2V2C12 0.9 11.1 0 10 0H9C7.9 0 7 0.9 7 2Z"
            fill="#FFFFFF"
            stroke="#060913"
            strokeWidth="1.8"
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// SCENE 6 (22.5s - 29.8s): INTERACTIVE CREATIVE STUDIO UI SIMULATION
// Mirrors 00:13 - 00:29 of Sprk Header video (File -> Open -> Resize -> Paint Bucket -> Save)
// ============================================================================
function Scene6StudioWorkspace({ t }: { t: number }) {
  // Timeline sub-phases inside the 7.3s Studio Simulation:
  // 0.00 - 0.16: Click File -> Open dropdown
  // 0.16 - 0.34: File dialog modal open -> select 'dm.' mark -> click Open
  // 0.34 - 0.56: 'dm.' placed on canvas -> Bounding Box tool active -> scale up 'dm.'
  // 0.56 - 0.72: Type tool 'T' active -> types 'www.dunajmedia.sk' below 'dm.'
  // 0.72 - 0.88: Paint Bucket tool active -> clicks canvas -> floods background to Midnight Navy #060913!
  // 0.88 - 1.00: File -> Save / Deploy clicked -> clean full-bleed dark brand screen

  const isMenuOpen = (t > 0.05 && t < 0.17) || (t > 0.88 && t < 0.95);
  const isModalOpen = t >= 0.17 && t < 0.34;
  const hasLogoOnCanvas = t >= 0.34;
  const showBoundingBox = t >= 0.38 && t < 0.57;
  const logoScale = t < 0.42 ? 0.55 : 0.55 + easeOutBack(progress(t, 0.42, 0.55)) * 0.55;
  const isDarkCanvas = t >= 0.76;
  const uiHidden = t >= 0.95;

  // Active left-dock tool index
  let activeTool = 0; // 0: Pointer, 1: Pen, 2: BoundingBox, 3: Bucket, 4: Type, 5: Zoom
  if (t >= 0.38 && t < 0.57) activeTool = 2;
  else if (t >= 0.57 && t < 0.72) activeTool = 4;
  else if (t >= 0.72 && t < 0.88) activeTool = 3;

  // URL typing in step 4
  const urlString = 'www.dunajmedia.sk';
  const typedUrl = t >= 0.58 ? urlString.slice(0, Math.floor(progress(t, 0.58, 0.71) * urlString.length)) : '';

  // Animated studio cursor coordinates (x, y in 1920x1080 space)
  let cx = 420;
  let cy = 240;
  if (t < 0.15) {
    cx = 360;
    cy = 125; // Clicking File -> Open
  } else if (t < 0.34) {
    const p = progress(t, 0.17, 0.32);
    cx = 1050 + p * 430;
    cy = 340 + p * 145; // Moving to Open button in modal
  } else if (t < 0.56) {
    const p = progress(t, 0.38, 0.54);
    cx = 1080 + p * 85;
    cy = 420 - p * 65; // Dragging top-right bounding box handle
  } else if (t < 0.72) {
    cx = 860;
    cy = 720; // Typing URL
  } else if (t < 0.88) {
    const p = progress(t, 0.72, 0.77);
    cx = 140 + p * 340;
    cy = 600 - p * 40; // Clicking canvas with Paint Bucket
  } else {
    cx = 360;
    cy = 240; // Clicking File -> Save
  }

  return (
    <div
      className={`absolute inset-0 transition-colors duration-300 flex flex-col overflow-hidden ${
        isDarkCanvas ? 'bg-[#060913]' : 'bg-[#EAECEF]'
      }`}
    >
      {/* TOP MENU BAR (File, Edit, View, Window, Help) */}
      {!uiHidden && (
        <div className="h-[68px] w-full bg-white border-b border-slate-200 flex items-center px-[330px] gap-28 text-[22px] text-[#060913] font-medium z-30 relative">
          <div className={`px-6 py-2 ${isMenuOpen ? 'bg-[#060913] text-white' : ''}`}>File</div>
          <div>Edit</div>
          <div>View</div>
          <div>GEO & SEO</div>
          <div>Deploy</div>

          {/* Dropdown Menu under File */}
          {isMenuOpen && (
            <div className="absolute top-[68px] left-[330px] w-[260px] bg-white border border-slate-200 shadow-2xl py-2 text-[20px] text-slate-700 flex flex-col">
              <div className="px-6 py-2.5">New</div>
              <div
                className={`px-6 py-2.5 ${
                  t < 0.2 ? 'bg-[#060913] text-[#00F0FF] font-bold' : ''
                }`}
              >
                Open
              </div>
              <div className="px-6 py-2.5">Open recent</div>
              <div className="border-t border-slate-200 my-1" />
              <div
                className={`px-6 py-2.5 ${
                  t > 0.85 ? 'bg-[#060913] text-[#00F0FF] font-bold' : ''
                }`}
              >
                Save & Deploy
              </div>
              <div className="px-6 py-2.5">Export Next.js</div>
            </div>
          )}
        </div>
      )}

      {/* LEFT FLOATING TOOL DOCK (Mirrors 00:13 - 00:27 in Sprk) */}
      {!uiHidden && (
        <div className="absolute left-[96px] top-[250px] w-[104px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-200 py-5 flex flex-col items-center gap-6 z-30">
          {[
            { icon: MousePointer, id: 0 },
            { icon: PenTool, id: 1 },
            { icon: Square, id: 2 },
            { icon: PaintBucket, id: 3 },
            { icon: Type, id: 4 },
            { icon: Search, id: 5 }
          ].map((tool) => {
            const IconComp = tool.icon;
            const active = activeTool === tool.id;
            return (
              <div
                key={tool.id}
                className={`w-[68px] h-[68px] flex items-center justify-center transition-colors ${
                  active ? 'bg-[#060913] text-[#00F0FF]' : 'text-[#060913]'
                }`}
              >
                <IconComp className="w-8 h-8" />
              </div>
            );
          })}

          {/* Brand Color Swatches (Electric Aqua & Deep Midnight Navy) */}
          <div className="relative w-[68px] h-[68px] mt-2">
            <div className="w-[44px] h-[44px] bg-[#00F0FF] border-2 border-[#060913] absolute top-0 left-0 z-10 shadow-sm" />
            <div className="w-[44px] h-[44px] bg-[#060913] absolute bottom-0 right-0" />
          </div>
        </div>
      )}

      {/* STEP 2 MODAL: "My Documents" File Open Dialog */}
      {isModalOpen && (
        <div className="absolute top-[220px] left-[880px] w-[740px] h-[430px] bg-white border-2 border-slate-400 shadow-2xl p-8 flex flex-col justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="flex-1 border-2 border-slate-400 px-4 py-2.5 text-slate-600 font-mono-code text-xl">
              DunajMedia_Identity / Brandmark
            </div>
            <div className="w-14 h-12 border-2 border-slate-400 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-[#060913]" />
            </div>
          </div>

          <div className="flex gap-6 flex-1 my-5">
            <div className="w-24 flex flex-col gap-3 items-center justify-center">
              <div className="w-20 h-20 border-2 border-slate-300 flex items-center justify-center">
                <Monitor className="w-10 h-10 text-slate-700" />
              </div>
              <div className="w-20 h-20 bg-[#060913] text-white flex items-center justify-center">
                <Layers className="w-10 h-10 text-[#00F0FF]" />
              </div>
            </div>

            {/* File Preview Box in Open Modal: Official 'un' Brandmark */}
            <div className="flex-1 border-2 border-slate-400 p-5 flex items-center gap-5">
              <div className="w-44 h-40 bg-[#060913] flex items-center justify-center rounded-lg shadow-md p-4">
                <DunajBrandmark size={96} color="#00F0FF" />
              </div>
              <div className="text-left font-mono-code text-sm text-slate-600 space-y-1">
                <div className="font-bold text-[#060913] text-base">Brandmark-cyan.svg</div>
                <div>d[un]ajmedia ligature</div>
                <div className="text-[#0099A8] font-semibold">Vector Master</div>
              </div>
            </div>

            <div className="w-40 flex flex-col justify-end gap-3">
              <div
                className={`py-3 text-center border-2 border-[#060913] font-bold text-xl ${
                  t > 0.27 ? 'bg-[#060913] text-[#00F0FF]' : 'text-[#060913]'
                }`}
              >
                Open
              </div>
              <div className="py-3 text-center border-2 border-slate-400 text-slate-500 text-xl">
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
      {/* CENTER CANVAS OBJECT: OFFICIAL DUNAJMEDIA "un" BRANDMARK & FULL LOGO + BOUNDING BOX + URL */}
      {hasLogoOnCanvas && (
        <div className="m-auto flex flex-col items-center justify-center relative">
          <div
            style={{ transform: `scale(${logoScale})` }}
            className="relative px-20 py-14 flex flex-col items-center justify-center gap-6"
          >
            {/* 8-Handle Vector Bounding Box (Active during resize step) */}
            {showBoundingBox && (
              <div className="absolute inset-0 border-[3px] border-[#060913]">
                {[
                  '-top-3 -left-3',
                  '-top-3 left-1/2 -translate-x-1/2',
                  '-top-3 -right-3',
                  'top-1/2 -translate-y-1/2 -left-3',
                  'top-1/2 -translate-y-1/2 -right-3',
                  '-bottom-3 -left-3',
                  '-bottom-3 left-1/2 -translate-x-1/2',
                  '-bottom-3 -right-3'
                ].map((pos, i) => (
                  <div key={i} className={`w-6 h-6 bg-[#060913] absolute ${pos}`} />
                ))}
              </div>
            )}

            {/* Official 'un' Brandmark Emblem */}
            <DunajBrandmark
              size={195}
              color={isDarkCanvas ? '#00F0FF' : '#172336'}
            />

            {/* Official Full 'D[un]ajMedia' Wordmark */}
            <DunajLogo
              size={112}
              theme={isDarkCanvas ? 'dark' : 'light'}
              brandmarkAccent={isDarkCanvas}
            />
          </div>

          {/* Typed URL Underneath */}
          {typedUrl && (
            <div
              className={`mt-10 text-[44px] font-bold tracking-tight transition-colors duration-300 ${
                isDarkCanvas ? 'text-white' : 'text-[#172336]'
              }`}
            >
              {typedUrl}
            </div>
          )}
        </div>
      )}

      {/* STUDIO CURSOR */}
      {!uiHidden && (
        <div
          style={{ transform: `translate(${cx}px, ${cy}px)` }}
          className="absolute top-0 left-0 z-50 pointer-events-none transition-transform duration-75"
        >
          {activeTool === 3 ? (
            <div className="w-14 h-14 rounded-full bg-[#060913] border-2 border-[#00F0FF] flex items-center justify-center shadow-xl">
              <PaintBucket className="w-7 h-7 text-[#00F0FF]" />
            </div>
          ) : (
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 2L20 11L12 13L9 21L4 2Z"
                fill="#060913"
                stroke="#00F0FF"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCENE 7 (29.8s - 34.6s): SOCIAL MEDIA, AI SEO CLOUD & "11+ YEARS" BOUNDING BOX
// Mirrors 00:30 - 00:37 of Sprk Header video
// ============================================================================
function Scene7SocialCloud({ t, dict }: SceneProps) {
  // Phase 1 (0.00 - 0.22): Yellow/Aqua marker highlight "sociálne siete & AI SEO"
  // Phase 2 (0.20 - 0.72): 3D Camera fly-through of floating client testimonial & social proof cards
  // Phase 3 (0.72 - 1.00): Snaps to "More than 11 years of experience" inside vector bounding box

  const isPhase1 = t < 0.22;
  const isPhase2 = t >= 0.18 && t < 0.74;
  const isPhase3 = t >= 0.72;

  const cloudProgress = progress(t, 0.18, 0.74);
  const boxProgress = easeOutExpo(progress(t, 0.78, 0.96));

  const proofCards = [
    {
      name: 'Simon Wheeler',
      role: 'Grand Apartman · Podhájska',
      quote: '“One person took the time to read what we wanted... now we have the perfect site.”',
      badge: '★ 5.0 Client Review',
      color: 'bg-white text-[#060913] border-slate-200',
      x: -420,
      y: -160,
      z: 1.2
    },
    {
      name: 'Google Search Console',
      role: 'Bratislava SEO & GEO',
      quote: '#1 Ranking Architecture + JSON-LD Entity Citations in ChatGPT & Perplexity',
      badge: 'AI SEO VERIFIED',
      color: 'bg-[#060913] text-white border-[#00F0FF]',
      x: 380,
      y: -190,
      z: 1.45
    },
    {
      name: 'Social Media & Reels Kit',
      role: 'Instagram · Facebook · LinkedIn',
      quote: 'High-retention vertical Reels, bilingual copywriting & branded carousel systems.',
      badge: '+240% Engagement',
      color: 'bg-[#00F0FF] text-[#060913] border-[#060913]',
      x: -360,
      y: 210,
      z: 1.65
    },
    {
      name: 'RKC Technology',
      role: 'advancednavigation.sk',
      quote: 'B2B international technical platform built on Next.js 14 & Edge CDN.',
      badge: '99/100 Speed Score',
      color: 'bg-[#0B1224] text-white border-white/20',
      x: 410,
      y: 185,
      z: 1.3
    },
    {
      name: '72-Hour Turnaround',
      role: 'Od €349 · Zero Lock-In',
      quote: '100% client domain ownership, transparent pricing, zero agency jargon.',
      badge: 'DUNAJMEDIA STANDARD',
      color: 'bg-[#FF3366] text-white border-white/20',
      x: 0,
      y: 40,
      z: 1.85
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#F4F6FA] flex items-center justify-center overflow-hidden">
      {/* PHASE 1: Marker Highlight Title */}
      {isPhase1 && (
        <div className="px-10 py-3 bg-[#00F0FF] text-[#060913] text-[84px] font-bold tracking-tight shadow-[0_0_50px_rgba(0,240,255,0.6)]">
          {dict.socialKitHighlight}
        </div>
      )}

      {/* PHASE 2: 3D Parallax Cloud of Client Proof, Social & SEO Cards */}
      {isPhase2 && (
        <div className="relative w-full h-full flex items-center justify-center">
          {proofCards.map((card, idx) => {
            // Fly from deep zoom (scale 2.4 -> 0.65) just like 00:31-00:35 in Sprk
            const scale = 2.3 - cloudProgress * 1.45 * (idx * 0.12 + 0.8);
            const tx = card.x * (1.5 - cloudProgress * 0.65);
            const ty = card.y * (1.5 - cloudProgress * 0.65);
            return (
              <div
                key={idx}
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${clamp(scale, 0.45, 2.5)})`,
                  zIndex: idx + 10
                }}
                className={`w-[540px] rounded-[32px] p-8 border-2 shadow-[0_25px_70px_rgba(6,9,19,0.18)] ${card.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-2xl">{card.name}</div>
                    <div className="text-sm opacity-75 font-mono-code">{card.role}</div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono-code font-bold bg-black/15 border border-current">
                    {card.badge}
                  </span>
                </div>
                <p className="text-2xl font-semibold leading-snug">{card.quote}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* PHASE 3: "More than 11 years of experience" inside Vector Bounding Box */}
      {isPhase3 && (
        <div className="relative flex items-center justify-center">
          <div className="relative px-24 py-16 text-center">
            {/* Vector Bounding Box + Rotation Stem (Mirrors 00:37 in Sprk) */}
            {boxProgress > 0 && (
              <div
                style={{ opacity: boxProgress, transform: `scale(${0.92 + 0.08 * boxProgress})` }}
                className="absolute inset-0 border-[3px] border-[#060913]"
              >
                {/* Top Rotation Handle */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-[3px] border-[#060913] bg-white" />
                  <div className="w-[3px] h-10 bg-[#060913]" />
                </div>

                {/* 8 Square Resize Handles */}
                {[
                  '-top-3 -left-3',
                  '-top-3 left-1/2 -translate-x-1/2',
                  '-top-3 -right-3',
                  'top-1/2 -translate-y-1/2 -left-3',
                  'top-1/2 -translate-y-1/2 -right-3',
                  '-bottom-3 -left-3',
                  '-bottom-3 left-1/2 -translate-x-1/2',
                  '-bottom-3 -right-3'
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 bg-white border-[3px] border-[#060913] absolute ${pos}`}
                  />
                ))}
              </div>
            )}

            <div className="text-[118px] font-extrabold text-[#060913] leading-[0.94] tracking-[-0.04em]">
              <div>{dict.experienceText[0]}</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#060913] via-[#0099A8] to-[#060913]">
                {dict.experienceText[1]}
              </div>
              <div>{dict.experienceText[2]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SCENE 8 (34.6s - 38.5s): 4-UP LOGO GRID -> COLOR SPEC, TYPOGRAPHY & WEAREGLOCAL
// Mirrors 00:40 - 00:57 of Sprk Header video
// ============================================================================
function Scene8BrandSystem({ t, dict }: SceneProps) {
  // Phase 1 (0.00 - 0.38): 4-Quadrant Official Brandmark & Logo Grid
  // Phase 2 (0.38 - 1.00): Left Pantone/HEX Color Spec Grid + Right Typography Specimen & WeAreGlocal Dossier

  const isPhase1 = t < 0.38;
  const dossierSlide = easeOutBack(progress(t, 0.58, 0.92));

  if (isPhase1) {
    const p = easeOutExpo(clamp(t * 3.2, 0, 1));
    const quadrants = [
      { bg: 'bg-[#060913]', logoTheme: 'dark', markColor: '#00F0FF', bracket: 'border-[#00F0FF]', subText: 'text-[#00F0FF]' },
      { bg: 'bg-[#F4F6FA]', logoTheme: 'light', markColor: '#172336', bracket: 'border-[#172336]', subText: 'text-[#172336]' },
      { bg: 'bg-[#00F0FF]', logoTheme: 'mono-dark', markColor: '#060913', bracket: 'border-[#060913]', subText: 'text-[#060913]' },
      { bg: 'bg-[#0B1224]', logoTheme: 'dark', markColor: '#00F0FF', bracket: 'border-[#00F0FF]', subText: 'text-white' }
    ];
    return (
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 overflow-hidden">
        {quadrants.map((q, idx) => (
          <div
            key={idx}
            style={{ opacity: clamp(p * 1.5 - idx * 0.15, 0, 1) }}
            className={`${q.bg} flex items-center justify-center relative border border-white/5`}
          >
            {/* Corner Framing Brackets */}
            <div className="relative px-16 py-10 flex flex-col items-center gap-5">
              <div className={`w-12 h-16 border-l-[8px] border-b-[8px] ${q.bracket} absolute bottom-0 left-0`} />
              <div className={`w-12 h-16 border-r-[8px] border-t-[8px] ${q.bracket} absolute top-0 right-0`} />

              <DunajBrandmark size={92} color={q.markColor} />
              <DunajLogo
                size={76}
                theme={q.logoTheme as 'dark' | 'light' | 'mono-dark'}
                brandmarkAccent={q.logoTheme === 'dark'}
              />

              <div className={`font-mono-code text-base tracking-[0.28em] uppercase ${q.subText} opacity-80`}>
                D[UN]AJMEDIA · BRATISLAVA
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 grid grid-cols-12 bg-[#EAECEF] overflow-hidden">
      {/* LEFT HALF (6 COLS): PANTONE / HEX COLOR SPECIFICATION SHEET (Mirrors 00:53 in Sprk) */}
      <div className="col-span-6 grid grid-cols-2 grid-rows-2 relative">
        {/* Top half full-width Electric Aqua */}
        <div className="col-span-2 bg-[#00F0FF] text-[#060913] p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-serif-italic text-5xl">Electric Aqua</span>
            <span className="font-mono-code font-bold text-xl">PRIMARY ACCENT</span>
          </div>
          <div className="font-mono-code text-xl space-y-1">
            <div>HEX &nbsp;&nbsp;&nbsp;&nbsp;#00F0FF</div>
            <div>RGB &nbsp;&nbsp;&nbsp;&nbsp;0 / 240 / 255</div>
            <div>TOKEN &nbsp;&nbsp;--dunaj-aqua</div>
          </div>
        </div>

        {/* Bottom Left: Surface Slate / Bone */}
        <div className="bg-[#0B1224] text-white p-10 flex flex-col justify-between border-t border-white/10">
          <div className="font-serif-italic text-4xl text-[#00F0FF]">Surface Navy</div>
          <div className="font-mono-code text-lg text-slate-300 space-y-1">
            <div>HEX &nbsp;&nbsp;#0B1224</div>
            <div>RGB &nbsp;&nbsp;11 / 18 / 36</div>
            <div>UI &nbsp;&nbsp;&nbsp;GLASS CARDS</div>
          </div>
        </div>

        {/* Bottom Right: Deep Midnight Navy */}
        <div className="bg-[#060913] text-white p-10 flex flex-col justify-between border-t border-l border-white/10">
          <div className="font-serif-italic text-4xl">Midnight Navy</div>
          <div className="font-mono-code text-lg text-slate-300 space-y-1">
            <div>HEX &nbsp;&nbsp;#060913</div>
            <div>RGB &nbsp;&nbsp;6 / 9 / 19</div>
            <div>BASE &nbsp;CANVAS</div>
          </div>
        </div>

        {/* 3D Textured WeAreGlocal Founding Agency Dossier Binder (Mirrors 00:56 in Sprk) */}
        {dossierSlide > 0 && (
          <div
            style={{
              transform: `translate(${(1 - dossierSlide) * -500}px, ${(1 - dossierSlide) * 350}px) rotate(-14deg)`
            }}
            className="absolute -bottom-16 -left-10 w-[860px] h-[540px] bg-[#F8FAFC] rounded-3xl shadow-[0_35px_90px_rgba(6,9,19,0.55)] border-4 border-white p-14 flex flex-col justify-between z-20"
          >
            {/* Binder Rings */}
            <div className="flex gap-20 -mt-20 ml-12">
              <div className="w-8 h-20 rounded-full border-[8px] border-[#060913]" />
              <div className="w-8 h-20 rounded-full border-[8px] border-[#060913]" />
            </div>

            <div className="my-auto flex flex-col items-start pl-10">
              <div className="px-4 py-1.5 rounded-full bg-[#060913] text-[#00F0FF] font-mono-code text-base font-bold mb-4">
                GLOBAL AGENCY NETWORK
              </div>
              <div className="text-[76px] font-extrabold text-[#060913] leading-[0.95] tracking-tight">
                The Glocal
                <br />
                <span className="text-[#0099A8]">Network</span>
              </div>
              <div className="mt-3 text-2xl font-semibold text-slate-600">{dict.glocalSub}</div>
            </div>

            {/* Side Index Tabs (Marketing, Technology, Strategy) */}
            <div className="absolute -right-12 top-16 flex flex-col gap-3">
              {['Web & Next.js', 'AI SEO & GEO', 'Growth & Ads'].map((tab, i) => (
                <div
                  key={i}
                  className="bg-[#060913] text-white font-mono-code text-sm px-4 py-6 rounded-r-xl border-r-4 border-[#00F0FF] writing-mode-vertical shadow-lg"
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT HALF (6 COLS): TYPOGRAPHY SPECIMEN (Mirrors 00:43 & 00:54 in Sprk) */}
      <div className="col-span-6 bg-[#060913] text-white p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between border-b border-white/15 pb-10">
          <div>
            <div className="font-serif-italic text-[112px] leading-[0.88] text-[#00F0FF]">
              Instrument
            </div>
            <div className="font-display font-extrabold text-[88px] leading-none tracking-tight mt-2">
              &amp; Syne Sans
            </div>
          </div>
          <div className="font-mono-code text-right text-slate-400 text-lg space-y-1">
            <div>DUNAJMEDIA TYPE SYSTEM</div>
            <div className="text-[#00F0FF]">SK / EN LOCALIZED</div>
            <div>4 WEIGHTS · EDITORIAL</div>
          </div>
        </div>

        <div className="my-auto space-y-3">
          <div className="font-mono-code text-2xl tracking-[0.2em] text-slate-300">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
          <div className="font-mono-code text-2xl tracking-[0.2em] text-slate-400">
            abcdefghijklmnopqrstuvwxyz 0123456789
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1 text-[82px] leading-[0.95] tracking-tight">
            <div className="font-light text-slate-400">Light</div>
            <div className="font-normal text-slate-200">Regular</div>
            <div className="font-semibold text-white">Medium</div>
            <div className="font-extrabold text-[#00F0FF]">ExtraBold</div>
          </div>

          <div className="font-serif-italic text-[290px] leading-[0.75] text-white/90 select-none">
            Aa
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCENE 9 (38.5s - 42.0s): CONCENTRIC ORBITAL RINGS, PILLS & FINAL LOCKUP
// Mirrors 00:58 - 01:14 of Sprk Header video (20% slower in 39.8s - 41.0s)
// ============================================================================
function Scene9Finale({ t, dict }: SceneProps) {
  // Phase 1 (0.00 - 0.36): Concentric multi-color orbital rings spinning around official "un" Brandmark
  // Phase 2 (0.36 - 0.72): Vibrant kinetic pills ("#", "Tell your story", "Dominate Google & AI") — falls in 39.8s–41.0s slow window!
  // Phase 3 (0.72 - 1.00): Final high-contrast D[un]ajMedia Logo + 'un' Brandmark lockup

  const isPhase1 = t < 0.37;
  const isPhase2 = t >= 0.35 && t < 0.73;
  const isPhase3 = t >= 0.71;

  const rot = t * 240;

  return (
    <div className="absolute inset-0 bg-[#060913] flex items-center justify-center overflow-hidden">
      {/* PHASE 1: Concentric Spinning Orbital Rings Around Official 'un' Brandmark */}
      {isPhase1 && (
        <div className="relative flex items-center justify-center">
          <svg width="1200" height="1200" viewBox="-600 -600 1200 1200" className="overflow-visible">
            {[
              { r: 490, color: '#00F0FF', dash: '1900 1200', dir: 1, width: 64 },
              { r: 380, color: '#172336', dash: '1400 1000', dir: -1.3, width: 64 },
              { r: 270, color: '#00D2FF', dash: '1000 800', dir: 1.6, width: 64 },
              { r: 165, color: '#FFFFFF', dash: '650 500', dir: -2, width: 48 }
            ].map((ring, idx) => (
              <circle
                key={idx}
                cx="0"
                cy="0"
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth={ring.width}
                strokeLinecap="round"
                strokeDasharray={ring.dash}
                style={{ transform: `rotate(${rot * ring.dir}deg)` }}
              />
            ))}
          </svg>

          {/* Center Official 'un' Brandmark Emblem */}
          <div className="absolute flex items-center justify-center">
            <DunajBrandmark size={145} color="#00F0FF" />
          </div>
        </div>
      )}

      {/* PHASE 2: Kinetic Strategy & Value Pills (39.8s - 41.0s — runs 20% slower) */}
      {isPhase2 && (
        <div className="flex flex-col items-center gap-7 scale-105">
          {/* Row 1 */}
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 rounded-full bg-[#172336] border-4 border-[#00F0FF] text-white flex items-center justify-center shadow-lg">
              <DunajBrandmark size={74} color="#00F0FF" />
            </div>
            <div
              className="w-40 h-40 rounded-full border-4 border-[#00F0FF]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, #00F0FF 0px, #00F0FF 10px, transparent 10px, transparent 20px)'
              }}
            />
            <div className="px-14 h-40 rounded-full bg-[#00F0FF] text-[#060913] flex items-center justify-center text-[64px] font-bold shadow-[0_0_50px_rgba(0,240,255,0.45)]">
              {dict.pillStory}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-8">
            <div className="px-16 h-40 rounded-full border-[3px] border-white text-white flex items-center justify-center text-[64px] font-medium">
              {dict.pillAudience}
            </div>
            {/* Spinning Starburst */}
            <svg
              width="150"
              height="150"
              viewBox="-75 -75 150 150"
              style={{ transform: `rotate(${rot}deg)` }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="-70"
                  x2="0"
                  y2="70"
                  stroke="#00F0FF"
                  strokeWidth="5"
                  transform={`rotate(${i * 22.5})`}
                />
              ))}
            </svg>
          </div>

          {/* Row 3 */}
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 rounded-full bg-[#00F0FF]" />
            <div className="w-[360px] h-40 rounded-full bg-[#172336] border-2 border-[#00F0FF]/50 flex items-center justify-end p-3">
              <div className="w-32 h-32 rounded-full bg-[#00F0FF]" />
            </div>
            <div className="px-14 h-40 rounded-full bg-white text-[#060913] flex items-center justify-center text-[60px] font-bold">
              {dict.pillSpeed}
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Final High-Contrast Official Brand Lockup */}
      {isPhase3 && (
        <div className="absolute inset-0 bg-[#060913] flex flex-col items-center justify-center">
          {/* Electric Aqua Outer Frame */}
          <div className="absolute inset-0 border-[32px] border-[#00F0FF] pointer-events-none opacity-95" />

          <div
            style={{
              transform: `scale(${easeOutBack(progress(t, 0.73, 0.93))})`
            }}
            className="flex flex-col items-center"
          >
            {/* Official Cyan 'un' Brandmark */}
            <DunajBrandmark size={185} color="#00F0FF" />

            {/* Official 'D[un]ajMedia' Full Wordmark */}
            <div className="mt-8">
              <DunajLogo size={128} theme="dark" brandmarkAccent={true} />
            </div>

            <div className="mt-8 px-10 py-3 rounded-full border-2 border-[#00F0FF]/50 bg-[#0B1224] text-[40px] font-bold text-white tracking-tight shadow-[0_0_40px_rgba(0,240,255,0.2)]">
              www.dunajmedia.sk
            </div>
            <div className="mt-4 text-2xl font-mono-code font-semibold text-[#00F0FF]">
              {dict.finalTagline}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
