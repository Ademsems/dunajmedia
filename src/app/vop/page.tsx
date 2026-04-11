import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Všeobecné obchodné podmienky | Dunajmedia',
  description: 'Všeobecné obchodné podmienky Dunajmedia pre poskytovanie digitálnych služieb.',
};

const sections = [
  {
    title: '1. Základné ustanovenia',
    content:
      'Tieto VOP upravujú vzťahy medzi poskytovateľom služieb, ktorým je Adem Sems Asha (Dunajmedia), so sídlom Obchodná 12, 811 06 Bratislava, a objednávateľom.',
  },
  {
    title: '2. Predmet služieb',
    content:
      'Dunajmedia poskytuje služby v oblasti digitálneho marketingu, tvorby webových stránok a ďalších dohodnutých kreatívnych služieb. Presný rozsah prác je vždy definovaný v individuálnej objednávke.',
  },
  {
    title: '3. Objednávka a zmluva',
    content:
      'Zmluvný vzťah vzniká na základe písomného potvrdenia objednávky (e-mailom) alebo podpísaním zmluvy o dielo.',
  },
  {
    title: '4. Platobné podmienky',
    content:
      'Ceny za služby sú stanovené dohodou. Faktúra bude vystavená po dodaní služby, ak nie je v individuálnej dohode stanovené inak. Sme neplatcovia DPH.',
  },
  {
    title: '5. Práva a povinnosti',
    content:
      'Objednávateľ je povinný poskytnúť potrebnú súčinnosť a podklady. Poskytovateľ sa zaväzuje dodať dielo v dohodnutej kvalite a termíne.',
  },
  {
    title: '6. Duševné vlastníctvo',
    content:
      'Autorské práva k vytvorenému dielu prechádzajú na objednávateľa až po úplnom zaplatení dohodnutej ceny, ak nie je dohodnuté inak.',
  },
  {
    title: '7. Riešenie sporov',
    content:
      'Právne vzťahy sa riadia právnym poriadkom Slovenskej republiky. Subjektom alternatívneho riešenia spotrebiteľských sporov je Slovenská obchodná inšpekcia (SOI), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk.',
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Všeobecné obchodné podmienky"
      lastUpdated="Január 2025"
      sections={sections}
    />
  );
}