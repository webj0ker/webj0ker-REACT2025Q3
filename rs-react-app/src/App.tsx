import './App.css';
import Co2DataLoader from './components/Co2DataLoader/Co2DataLoader';
import {useState, useCallback } from 'react';

function App() {
  const [year, setYear] = useState<number | null>(null);
  const [region, setRegion] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const handleYearChange = useCallback((y: number) => setYear(y), []);
  const handleRegionChange = useCallback((r: string) => setRegion(r), []);
  const handleSearch = useCallback((s: string) => setSearch(s), []);
  const handleSort = useCallback((s: string) => setSort(s), []);

  return (
    <div className="app-container">
      <h1>CO2 Emissions Dashboard</h1>
      <Co2DataLoader />
    </div>
  );
}

export default App;


