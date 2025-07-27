import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import About from './pages/About/About';
import './App.css';

interface Spell {
  name: string;
  description?: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<Spell[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header onSearch={handleSearch} />
              <Results results={results} error={error} loading={loading} />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
