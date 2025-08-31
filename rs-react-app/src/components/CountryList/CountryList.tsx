import { useCo2Data } from '../../hooks/useCo2Data';
import CountryCard from '../CountryCard/CountryCard';

export default function CountryList() {
  const data = useCo2Data();
  if (!data) return null;

  return (
    <div>
      {Object.entries(data).map(([country, yearly]) => (
        <CountryCard key={country} name={country} yearly={yearly} />
      ))}
    </div>
  );
}