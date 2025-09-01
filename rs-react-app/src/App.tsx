import './App.css';
import { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import DataTable from './components/DataTable/DataTable';
import ColumnSelectorModal from './components/ColumnSelectorModal/ColumnSelectorModal';
import type { ColumnKey } from './components/Columns/Columns';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [sort, setSort] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<ColumnKey[]>([
    'country', 'iso', 'population', 'year', 'co2', 'co2PerCapita'
  ]);

  return (
    <div className="app-container">
      <h1>Climate Data Viewer</h1>
      <Toolbar
        search={search}
        setSearch={setSearch}
        year={year}
        setYear={setYear}
        sort={sort}
        setSort={setSort}
      />
      <button className="select-columns-btn" onClick={() => setIsModalOpen(true)}>
        Select columns
      </button>
      <DataTable
        search={search}
        year={year}
        sort={sort}
        selectedColumns={selectedColumns}
      />
      {isModalOpen && (
        <ColumnSelectorModal
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;


