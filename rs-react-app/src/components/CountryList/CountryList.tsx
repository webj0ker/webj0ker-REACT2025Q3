import { useMemo } from 'react';
import CountryCard from '../CountryCard/CountryCard';
import { useCo2Data } from '../../hooks/useCo2Data';

export default function CountryList({ filter, search, sort, year, columns }: any) {
  const data = useCo2Data();
  if (!data) return null;

  const countries = useMemo(() => {
    let arr = Object.entries(data);
    return arr;
  }, [data, filter, search, sort, year, columns]);

  return (
    <div>
      {countries.map(([country, yearly]) => (
        <CountryCard key={country} name={country} yearly={Array.isArray(yearly) ? yearly : []} columns={columns} year={year} />
      ))}
    </div>
  );
}