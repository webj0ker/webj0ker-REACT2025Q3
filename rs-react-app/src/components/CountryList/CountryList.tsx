import { useState } from 'react';
import CountryCard from '../CountryCard/CountryCard';

const defaultColumns = ['year', 'population', 'co2', 'co2_per_capita'];

interface CountryListProps {
  data: Record<string, any>;
}

export default function CountryList({ data }: CountryListProps) {
  const [columns, setColumns] = useState<string[]>(defaultColumns);
  const [year, setYear] = useState<number | undefined>(undefined);

  return (
    <div>
      {Object.entries(data).map(([country, yearly]) => (
        <CountryCard
          key={country}
          name={country}
          yearly={yearly.data}
          columns={columns}
          year={year}
        />
      ))}
    </div>
  );
}