import { useEffect, useState } from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import Pagination from './components/Pagination/Pagination';
import About from './pages/About/About';
import SpellDetails from './components/SpellDetails/SpellDetails';
import SelectedFlyout from './components/SelectedFlyout/SelectedFlyout';
import './App.css';

interface Spell {
  name: string;
  description?: string;
}

const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const [results, setResults] = useState<Spell[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handleSearch = (searchTerm: string) => {
    setLoading(true);
    setError(undefined);

    const apiUrl = searchTerm
      ? `https://hp-api.onrender.com/api/spells?name=${searchTerm.toLowerCase()}`
      : 'https://hp-api.onrender.com/api/spells';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Spell[]) => {
        const filtered = searchTerm
          ? data.filter((spell) =>
              spell.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : data;
        setResults(filtered);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || undefined);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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

  return (
    <div>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
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
                    error={error}
                    loading={loading}
                    onCardClick={handleShowDetails}
                  />
                  {!loading && (
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
                {details && (
                  <SpellDetails
                    spell={results.find((spell) => spell.name === details)}
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
