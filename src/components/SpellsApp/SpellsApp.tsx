'use client';

import { useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useTheme } from '../../context/useTheme';
import Header from '../Header/Header';
import Results from '../Results/Results';
import Pagination from '../Pagination/Pagination';
import SpellDetails from '../SpellDetails/SpellDetails';
import SelectedFlyout from '../SelectedFlyout/SelectedFlyout';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

const ITEMS_PER_PAGE = 10;

interface Spell {
  name: string;
  description?: string;
  [key: string]: unknown;
}

export default function SpellsApp({ initialSpells }: { initialSpells: Spell[] }) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const lang = params?.lang as string;

  const [searchTerm, setSearchTerm] = useState(searchParams?.get('q') || '');
  const page = Number(searchParams?.get('page')) || 1;
  const details = searchParams?.get('details');

  const { theme, setTheme } = useTheme();

  const filteredResults: Spell[] = searchTerm
    ? initialSpells.filter((spell) =>
        spell.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : initialSpells;

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('q', term);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('page', String(newPage));
    router.push(`?${newParams.toString()}`);
  };

  const handleShowDetails = (name: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('details', name);
    router.push(`?${newParams.toString()}`);
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.delete('details');
    router.push(`?${newParams.toString()}`);
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div>
      <nav className='navigation-top'>
        <Link href={`/${lang}`}>{t('Home')}</Link>
        <Link href={`/${lang}/about`}>{t('About')}</Link>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">{t('ThemeLight')}</option>
          <option value="dark">{t('ThemeDark')}</option>
        </select>
        <LocaleSwitcher />
        <button onClick={handleRefresh}>{t('Refresh')}</button>
      </nav>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <Header onSearch={handleSearch} initialSearchTerm={searchTerm} />
          <Results
            results={paginatedResults}
            loading={false}
            onCardClick={handleShowDetails}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {details && (
          <SpellDetails
            spell={filteredResults.find((spell) => spell.name === details)}
            onClose={handleCloseDetails}
          />
        )}
      </div>
      <SelectedFlyout />
    </div>
  );
}