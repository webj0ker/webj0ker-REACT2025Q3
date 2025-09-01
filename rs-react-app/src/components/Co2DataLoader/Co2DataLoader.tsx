import CountryList from '../CountryList/CountryList';
import { useCo2Data } from '../../hooks/useCo2Data';

export default function Co2DataLoader() {
  const { data, loading } = useCo2Data();

  if (loading) return <div>Loading data...</div>;
  if (!data) return <div>Failed to load data</div>;

  return <CountryList data={data} />;
}