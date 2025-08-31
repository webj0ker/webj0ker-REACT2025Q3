import { useMemo } from 'react';
import { useCo2Data, type CountryData } from '../../hooks/useCo2Data';

export default function DataTable({
  search,
  year,
  sort,
  selectedColumns,
}: {
  search: string;
  year: number;
  sort: string;
  selectedColumns: string[];
}) {
  const { data, loading } = useCo2Data(year);

  const filteredSorted = useMemo(() => {
    let filtered = data.filter(row =>
      (row.country ?? '').toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'population') {
      filtered = [...filtered].sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
    } else if (sort === 'country') {
      filtered = [...filtered].sort((a, b) => a.country.localeCompare(b.country));
    }
    return filtered;
  }, [data, search, sort]);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {selectedColumns.map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredSorted.length === 0 ? (
          <tr>
            <td colSpan={selectedColumns.length}>No data</td>
          </tr>
        ) : (
          filteredSorted.map((row, idx) => (
            <tr key={idx}>
              {selectedColumns.map(col => (
                <td key={col}>{row[col as keyof CountryData] ?? 'N/A'}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}