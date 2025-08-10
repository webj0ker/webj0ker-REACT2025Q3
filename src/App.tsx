import { useState } from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import { useTheme } from './context/useTheme';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import Pagination from './components/Pagination/Pagination';
import About from './pages/About/About';
import SpellDetails from './components/SpellDetails/SpellDetails';
import SelectedFlyout from './components/SelectedFlyout/SelectedFlyout';
import { useGetSpellsQuery } from './store/apiSlice';
import './App.css';

const ITEMS_PER_PAGE = 10;

interface Spell {
  name: string;
  description?: string;
  [key: string]: unknown;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
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
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const details = searchParams.get('details');

  const handleShowDetails = (name: string) => {
    setSearchParams({ page: String(page), details: name });
  };

  const handleCloseDetails = () => {
    setSearchParams({ page: String(page) });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          style={{ marginLeft: 16 }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <button style={{ marginLeft: 16 }} onClick={handleRefresh}>
          Refresh
        </button>
      </nav>
      <div style={{ display: 'flex' }}>
        <Routes>
          <Route
            path="/"
            element={
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
                    spell={filteredResults.find(
                      (spell) => spell.name === details
                    )}
                    onClose={handleCloseDetails}
                  />
                )}
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
      <SelectedFlyout />
    </div>
  );
};

export default App;
