import DataTable from '../DataTable/DataTable';

export default function CountryCard({ name, yearly }: { name: string; yearly: any[] }) {
  const latest = yearly[yearly.length - 1];
  return (
    <div className="country-card">
      <h2>{name}</h2>
      <div>Population: {latest?.population ?? 'N/A'}</div>
      <div>ISO: {latest?.iso_code ?? 'N/A'}</div>
      <DataTable data={yearly} />
    </div>
  );
}