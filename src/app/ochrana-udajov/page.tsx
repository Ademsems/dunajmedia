import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov | Dunajmedia',
  description: 'Zásady ochrany osobných údajov spoločnosti Dunajmedia v súlade s GDPR.',
};

const sections = [
  {
    title: '1. Prevádzkovateľ',
    content:
      'Prevádzkovateľom vašich osobných údajov je Adem Sems Asha — Dunajmedia, so sídlom Obchodná 12, 811 06 Bratislava, Slovenská republika.',
  },
  {
    title: '2. Rozsah spracúvaných údajov',
    content:
      'Spracúvame údaje, ktoré nám dobrovoľne poskytnete prostredníctvom kontaktného formulára: meno, e-mailová adresa, prípadne telefónne číslo.',
  },
  {
    title: '3. Účel spracovania',
    content: 'Vaše údaje spracúvame za účelom:',
    list: [
      'Vybavenia vašej požiadavky alebo dopytu.',
      'Poskytovania našich služieb.',
      'Marketingovej komunikácie (ak ste na ňu udelili súhlas).',
    ],
  },
  {
    title: '4. Právny základ',
    content:
      'Právnym základom spracovania je váš súhlas (čl. 6 ods. 1 písm. a) GDPR) alebo nevyhnutnosť na plnenie zmluvy, ktorej ste zmluvnou stranou.',
  },
  {
    title: '5. Doba uchovávania',
    content:
      'Údaje uchovávame po dobu nevyhnutnú na dosiahnutie účelu, maximálne však po dobu 5 rokov, alebo kým neodvoláte svoj súhlas.',
  },
  {
    title: '6. Vaše práva',
    content:
      'Máte právo požadovať prístup k vašim údajom, ich opravu, vymazanie alebo obmedzenie spracúvania. Taktiež máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR.',
  },
];

export default function Page() {
  return (
    <LegalPage
      title="Zásady ochrany osobných údajov"
      lastUpdated="Január 2025"
      sections={sections}
    />
  );
}
