'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { gaEvent } from '@/lib/gtag';

interface MenuItem {
  href: string;
  title: string;
  desc: string;
}

type NavEntry =
  | { kind: 'link'; id: string; href: string; labelKey: string }
  | {
      kind: 'menu';
      id: string;
      labelKey: string;
      /** i18n path of the MenuItem[] shown in the panel */
      itemsKey: string;
      /** Optional landing page for the group itself (Services → /services) */
      href?: string;
      allKey?: string;
      /** Optional helper link at the bottom of the panel */
      helperKey?: string;
    };

// Agency groups About / How We Work / Our Work — those three are no longer
// top-level links.
const navEntries: NavEntry[] = [
  { kind: 'link', id: 'home', href: '/', labelKey: 'nav.home' },
  { kind: 'menu', id: 'agency', labelKey: 'nav.agency.label', itemsKey: 'nav.agency.items', helperKey: 'nav.agency.helper' },
  { kind: 'menu', id: 'services', labelKey: 'nav.services', itemsKey: 'nav.servicesMenu.items', href: '/services', allKey: 'nav.servicesMenu.all' },
  { kind: 'link', id: 'blog', href: '/blog', labelKey: 'nav.blog' },
  { kind: 'link', id: 'pricing', href: '/pricing', labelKey: 'nav.pricing' },
  { kind: 'link', id: 'contact', href: '/contact', labelKey: 'nav.contact' },
];

const EASE_EXPO = [0.19, 1, 0.22, 1] as const;
const HIDE_AFTER_PX = 140;
const SCROLL_DELTA_PX = 6;

export default function Navbar() {
  const { t, tArray } = useLanguage();
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const hoverOpened = useRef(false);
  const desktopNavRef = useRef<HTMLUListElement>(null);

  // Smart header: transparent at the top, glides away on scroll-down and
  // back in (frosted) on scroll-up.
  useEffect(() => {
    lastY.current = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 20);
      if (y < HIDE_AFTER_PX) {
        setHidden(false);
      } else if (y - lastY.current > SCROLL_DELTA_PX) {
        setHidden(true);
      } else if (lastY.current - y > SCROLL_DELTA_PX) {
        setHidden(false);
      }
      lastY.current = y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileGroup(null);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    // Tap / click outside closes an open panel (touch devices have no mouseleave)
    const onPointerDown = (e: PointerEvent) => {
      if (!desktopNavRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const open = (id: string) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isEntryActive = (entry: NavEntry) => {
    if (entry.kind === 'link') return pathname === entry.href;
    if (entry.href && pathname.startsWith(entry.href)) return true;
    return tArray<MenuItem>(entry.itemsKey).some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    );
  };

  // The header stays put while any menu is open so it never slides away from under the pointer.
  const isHidden = hidden && !mobileOpen && !openMenu;
  const solid = !atTop || mobileOpen;

  const linkClass = (active: boolean) =>
    `link-underline relative inline-flex items-center gap-1 px-1 py-2 mx-2 text-sm font-body transition-colors duration-300 ${
      active ? 'text-aqua' : 'text-slate-light hover:text-slate-lightest'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[transform,background-color,border-color,box-shadow] duration-500 ease-expo ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        solid
          ? 'bg-navy/80 backdrop-blur-xl border-white/10 shadow-[0_10px_40px_rgba(2,8,20,0.35)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Image
                src="/branding/dunajmedia-logo.svg"
                alt="Dunajmedia"
                width={181}
                height={30}
                priority
                unoptimized
                className="h-6 sm:h-7 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <ul ref={desktopNavRef} className="hidden lg:flex items-center">
            {navEntries.map((entry) => {
              const active = isEntryActive(entry);

              if (entry.kind === 'link') {
                return (
                  <li key={entry.id}>
                    <Link href={entry.href} data-active={active} className={linkClass(active)}>
                      {t(entry.labelKey)}
                    </Link>
                  </li>
                );
              }

              const items = tArray<MenuItem>(entry.itemsKey);
              const isOpen = openMenu === entry.id;
              const panelId = `nav-panel-${entry.id}`;
              const triggerInner = (
                <>
                  {t(entry.labelKey)}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-500 ease-expo ${isOpen ? 'rotate-180' : ''}`}
                  />
                </>
              );

              return (
                <li
                  key={entry.id}
                  className="relative"
                  onMouseEnter={() => {
                    hoverOpened.current = true;
                    open(entry.id);
                  }}
                  onMouseLeave={() => {
                    hoverOpened.current = false;
                    scheduleClose();
                  }}
                  // Link triggers open on focus (Enter navigates); button triggers toggle on click
                  onFocus={entry.href ? () => open(entry.id) : undefined}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
                  }}
                >
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      data-active={active}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={linkClass(active)}
                    >
                      {triggerInner}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      data-active={active}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        // A panel opened by hover stays open when the trigger is clicked
                        isOpen && !hoverOpened.current ? setOpenMenu(null) : open(entry.id)
                      }
                      className={linkClass(active)}
                    >
                      {triggerInner}
                    </button>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE_EXPO }}
                        style={{ transformOrigin: 'top left' }}
                        className="absolute top-full -left-4 pt-3 z-50"
                      >
                        <div className="w-[340px] rounded-2xl border border-white/10 bg-[#0B1626]/95 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] overflow-hidden">
                          <ul className="divide-y divide-white/8">
                            {items.map((item) => {
                              const itemActive = pathname === item.href;
                              return (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="group flex items-start justify-between gap-4 px-5 py-4 hover:bg-white/[0.04] transition-colors duration-300"
                                  >
                                    <span>
                                      <span
                                        className={`block font-display font-bold text-[15px] leading-tight transition-colors duration-300 ${
                                          itemActive ? 'text-aqua' : 'text-slate-lightest group-hover:text-aqua'
                                        }`}
                                      >
                                        {item.title}
                                      </span>
                                      <span className="block mt-1 text-xs font-body text-slate-text leading-snug">
                                        {item.desc}
                                      </span>
                                    </span>
                                    <ArrowRight
                                      size={14}
                                      className="mt-1 flex-shrink-0 text-aqua opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-expo"
                                    />
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>

                          {entry.href && entry.allKey && (
                            <Link
                              href={entry.href}
                              className="group flex items-center justify-between px-5 py-3.5 border-t border-white/8 bg-white/[0.02] text-xs font-mono uppercase tracking-widest text-slate-text hover:text-aqua transition-colors duration-300"
                            >
                              {t(entry.allKey)}
                              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          )}

                          {entry.helperKey && (
                            <Link
                              href="/contact"
                              className="group flex items-center justify-between gap-3 px-5 py-3.5 border-t border-white/8 bg-white/[0.02] text-xs font-body text-slate-text hover:text-aqua transition-colors duration-300"
                            >
                              <span>{t(entry.helperKey)}</span>
                              <ArrowRight size={13} className="flex-shrink-0 text-aqua group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* CTA Button — visible on all breakpoints, compact on mobile */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Link
              href="/contact"
              onClick={() => gaEvent('cta_click', {
                event_category: 'engagement',
                event_label: 'cta_button_click',
              })}
              className="btn-kinetic group flex items-center gap-1.5 lg:gap-2 bg-aqua text-navy font-display font-semibold text-xs lg:text-sm px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-lg hover:bg-aqua-electric shadow-aqua whitespace-nowrap"
            >
              {t('nav.cta')}
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-text hover:text-slate-lightest transition-colors"
              aria-label={t('nav.menu_toggle')}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="lg:hidden overflow-hidden bg-[#0B1626]/95 backdrop-blur-2xl border-t border-white/8"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 max-h-[calc(100svh-7rem)] overflow-y-auto divide-y divide-white/8">
              {navEntries.map((entry, i) => {
                const active = isEntryActive(entry);

                if (entry.kind === 'link') {
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: EASE_EXPO }}
                    >
                      <Link
                        href={entry.href}
                        className={`block py-3.5 font-display font-semibold text-lg transition-colors duration-200 ${
                          active ? 'text-aqua' : 'text-slate-lightest hover:text-aqua'
                        }`}
                      >
                        {t(entry.labelKey)}
                      </Link>
                    </motion.div>
                  );
                }

                const items = tArray<MenuItem>(entry.itemsKey);
                const groupOpen = mobileGroup === entry.id;
                const groupId = `nav-group-${entry.id}`;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EASE_EXPO }}
                  >
                    {/* Accordion trigger */}
                    <button
                      type="button"
                      onClick={() => setMobileGroup(groupOpen ? null : entry.id)}
                      aria-expanded={groupOpen}
                      aria-controls={groupId}
                      className={`w-full flex items-center justify-between py-3.5 font-display font-semibold text-lg transition-colors duration-200 ${
                        active || groupOpen ? 'text-aqua' : 'text-slate-lightest hover:text-aqua'
                      }`}
                    >
                      <span>{t(entry.labelKey)}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ease-expo ${groupOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {groupOpen && (
                        <motion.div
                          id={groupId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: EASE_EXPO }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-3 pl-3 border-l border-aqua/20 ml-1 space-y-1">
                            {entry.href && entry.allKey && (
                              <li>
                                <Link
                                  href={entry.href}
                                  className={`block px-3 py-2 text-sm font-mono uppercase tracking-wider transition-colors duration-200 ${
                                    pathname === entry.href ? 'text-aqua' : 'text-slate-text hover:text-aqua'
                                  }`}
                                >
                                  {t(entry.allKey)}
                                </Link>
                              </li>
                            )}
                            {items.map((item) => (
                              <li key={item.href}>
                                <Link href={item.href} className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                                  <span
                                    className={`block font-display font-semibold text-[15px] ${
                                      pathname === item.href ? 'text-aqua' : 'text-slate-lightest'
                                    }`}
                                  >
                                    {item.title}
                                  </span>
                                  <span className="block mt-0.5 text-xs font-body text-slate-text leading-snug">
                                    {item.desc}
                                  </span>
                                </Link>
                              </li>
                            ))}
                            {entry.helperKey && (
                              <li>
                                <Link
                                  href="/contact"
                                  className="group flex items-center gap-2 px-3 py-2 text-xs font-body text-slate-text hover:text-aqua transition-colors duration-200"
                                >
                                  <span>{t(entry.helperKey)}</span>
                                  <ArrowRight size={12} className="flex-shrink-0 text-aqua group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </li>
                            )}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
