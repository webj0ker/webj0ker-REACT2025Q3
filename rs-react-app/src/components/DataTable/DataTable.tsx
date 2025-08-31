export default function DataTable({ data }: { data: any[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per Capita</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.year}>
            <td>{row.year ?? 'N/A'}</td>
            <td>{row.population ?? 'N/A'}</td>
            <td>{row.co2 ?? 'N/A'}</td>
            <td>{row.co2_per_capita ?? 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}