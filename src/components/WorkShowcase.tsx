'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const projects = [
  {
    image: '/barber-preview.jpg',
    url: 'https://barber.dunajmedia.sk/',
    titleSk: 'Prémiový Barbershop',
    titleEn: 'Premium Barbershop',
    categorySk: 'Barber & Holičstvo',
    categoryEn: 'Barber & Hair',
    descSk: 'Tmavá, štýlová stránka s video hero, rezervačným systémom, galériou a tímom.',
    descEn: 'Dark, stylish site with video hero, booking system, gallery and team section.',
    tags: ['Video Hero', 'Booking System', 'Gallery', 'SK/EN'],
  },
  {
    image: '/hairsalon-preview.jpg',
    url: 'https://hair-salon-ebon-seven.vercel.app/',
    titleSk: 'Luxusný Hair Salón',
    titleEn: 'Luxury Hair Salon',
    categorySk: 'Kadernícke štúdio',
    categoryEn: 'Hair Studio',
    descSk: 'Elegantná stránka pre kadernícke štúdiá s rezerváciami a galériou účesov.',
    descEn: 'Elegant site for hair studios with bookings and hairstyle gallery.',
    tags: ['Elegant Design', 'Booking System', 'Gallery', 'SK/EN'],
  },
  {
    image: '/salon-preview.jpg',
    url: 'https://salon.dunajmedia.sk/demo',
    titleSk: 'Beauty & Wellness Salón',
    titleEn: 'Beauty & Wellness Salon',
    categorySk: 'Kozmetika & Wellness',
    categoryEn: 'Beauty & Wellness',
    descSk: 'Sofistikovaná stránka pre beauty salóny a wellness štúdiá.',
    descEn: 'Sophisticated site for beauty salons and wellness studios.',
    tags: ['Premium Design', 'Booking System', 'Gallery', 'SK/EN'],
  },
];

interface WorkShowcaseProps {
  compact?: boolean;
}

export default function WorkShowcase({ compact = false }: WorkShowcaseProps) {
  const { language } = useLanguage();
  const isSk = language === 'sk';

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <motion.a
            key={project.url}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            style={{ transition: 'transform 0.4s ease' }}
            className="group block bg-[#0d1a2e] border border-white/8 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:border-aqua/20"
          >
            {/* Image area */}
            <div className="relative h-52 overflow-hidden">
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Image
                  src={project.image}
                  alt={isSk ? project.titleSk : project.titleEn}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-2 p-6">
                <p className="font-display text-xl font-bold text-white text-center">
                  {isSk ? project.titleSk : project.titleEn}
                </p>
                <p className="font-mono text-xs text-aqua uppercase tracking-widest">
                  {isSk ? project.categorySk : project.categoryEn}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-white/80 text-sm font-body">
                  <ExternalLink size={14} />
                  <span>Otvoriť live demo</span>
                </div>
              </div>

              {/* Live Demo badge */}
              <div className="absolute top-3 right-3 bg-emerald-500/90 text-white font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm z-10">
                Live Demo
              </div>
            </div>

            {/* Card body */}
            <div className="p-5">
              <div className="mb-3">
                <h3 className="font-display text-lg font-bold text-slate-lightest leading-snug">
                  {isSk ? project.titleSk : project.titleEn}
                </h3>
                <p className="font-mono text-xs text-aqua uppercase tracking-widest mt-1">
                  {isSk ? project.categorySk : project.categoryEn}
                </p>
              </div>

              {!compact && (
                <p className="text-slate-text text-sm font-body leading-relaxed mb-4">
                  {isSk ? project.descSk : project.descEn}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wide text-slate-text border border-white/10 bg-white/5 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {compact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 border border-aqua/30 text-aqua font-display font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-aqua hover:text-navy transition-all duration-300"
          >
            {isSk ? 'Zobraziť všetky ukážky' : 'View all demos'}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
