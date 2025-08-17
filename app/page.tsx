'use client';
import './globals.css';

import { useState } from 'react';
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation';
import { useTheme } from '../src/context/useTheme';
import Header from '../src/components/Header/Header';
import Results from '../src/components/Results/Results';
import Pagination from '../src/components/Pagination/Pagination';
import SpellDetails from '../src/components/SpellDetails/SpellDetails';
import SelectedFlyout from '../src/components/SelectedFlyout/SelectedFlyout';
import { useGetSpellsQuery } from '../src/store/apiSlice';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
  const { theme, setTheme } = useTheme();

  const {
    data: results = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetSpellsQuery(undefined);

  const spells = Array.isArray(results) ? results : [];

  const filteredResults = searchTerm
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
    router.replace(`/?page=1`);
  };

  const handlePageChange = (newPage: number) => {
    router.replace(`/?page=${newPage}`);
  };

  const details = searchParams.get('details');

  const handleShowDetails = (name: string) => {
    router.replace(`/?page=${page}&details=${name}`);
  };

  const handleCloseDetails = () => {
    router.replace(`/?page=${page}`);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <nav className='navigation-top' style={{ marginBottom: 16 }}>
        <Link href="/">Home</Link> | <Link href="/about">About</Link>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <button style={{ marginLeft: 16 }} onClick={handleRefresh}>
          Refresh
        </button>
      </nav>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ flex: 1 }}>
          <Header onSearch={handleSearch} />
          <Results
            results={paginatedResults}
            error={error ? error.toString() : undefined}
            loading={isLoading || isFetching}
            onCardClick={handleShowDetails}
          />
          {!isLoading && !isFetching && (
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