import React from 'react';
import DataTable from '../DataTable/DataTable';

interface CountryCardProps {
  name: string;
  yearly: any[];
  columns: string[];
  year?: number;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(function CountryCard({ name, yearly, columns, year }) {
  const selectedYear = year
    ? yearly.find((row) => row.year === year)
    : yearly[yearly.length - 1];

  return (
    <div className="country-card">
      <h2>{name}</h2>
      <div>Population: {selectedYear?.population ?? 'N/A'}</div>
      <div>ISO: {selectedYear?.iso_code ?? 'N/A'}</div>
      <DataTable data={yearly} columns={columns} selectedYear={year} />
    </div>
  );
});

export default CountryCard;