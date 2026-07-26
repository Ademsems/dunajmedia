import type { Metadata } from 'next';
import GrandApartmanClient from './GrandApartmanClient';

export const metadata: Metadata = {
  title: 'Grand Apartman — Prípadová štúdia',
  description:
    'Prípadová štúdia: dvojjazyčná webová stránka pre luxusné apartmány Grand Apartman v Podhájskej.',
  robots: { index: false },
};

export default function GrandApartmanPage() {
  return <GrandApartmanClient />;
}
