'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '../../src/context/useTheme';
import Header from '../../src/components/Header/Header';
import Results from '../../src/components/Results/Results';
import Pagination from '../../src/components/Pagination/Pagination';
import SpellDetails from '../../src/components/SpellDetails/SpellDetails';
import SelectedFlyout from '../../src/components/SelectedFlyout/SelectedFlyout';
import { useGetSpellsQuery } from '../../src/store/apiSlice';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from '../../src/components/LocaleSwitcher/LocaleSwitcher';

// Link is now imported directly from 'next-intl'

const ITEMS_PER_PAGE = 10;

interface Spell {
  name: string;
  description?: string;
  [key: string]: unknown;
}

export default function HomeLocalePage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Получаем параметры из URL
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('q') || '');
  const page = Number(searchParams?.get('page') ?? 1) || 1;
  const details = searchParams ? searchParams.get('details') : null;

  const { theme, setTheme } = useTheme();

  const {
    data: results = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetSpellsQuery(undefined);

  const spells: Spell[] = Array.isArray(results) ? (results as Spell[]) : [];

  const filteredResults: Spell[] = searchTerm
    ? spells.filter((spell) =>
        spell.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : spells;

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
  const paginatedResults = filteredResults.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams ? searchParams.toString() : '');
    newParams.set('q', term);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams ? searchParams.toString() : '');
    newParams.set('page', String(newPage));
    router.push(`?${newParams.toString()}`);
  };

  const handleShowDetails = (name: string) => {
    const newParams = new URLSearchParams((searchParams?.toString()) ?? '');
    newParams.set('details', name);
    router.push(`?${newParams.toString()}`);
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams((searchParams?.toString()) ?? '');
    newParams.delete('details');
    router.push(`?${newParams.toString()}`);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <nav className='navigation-top' >
        <Link href="/">{t('Home')}</Link>
        <Link href="/about">{t('About')}</Link>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">{t('ThemeLight')}</option>
          <option value="dark">{t('ThemeDark')}</option>
        </select>
        <LocaleSwitcher />
        <button onClick={handleRefresh}>
          {t('Refresh')}
        </button>
      </nav>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <Header onSearch={handleSearch} initialSearchTerm={''} />
          <Results
            results={paginatedResults}
            error={error ? String(error) : undefined}
            loading={isLoading || isFetching}
            onCardClick={handleShowDetails}
          />
          {!isLoading && !isFetching && totalPages > 1 && (
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