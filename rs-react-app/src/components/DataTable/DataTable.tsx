interface DataTableProps {
  data: any[];
  columns: string[];
  selectedYear?: number;
}

const defaultColumns = ['year', 'population', 'co2', 'co2_per_capita'];

export default function DataTable({ data, columns, selectedYear }: DataTableProps) {
  const displayColumns = columns && columns.length > 0 ? columns : defaultColumns;

  return (
    <table>
      <thead>
        <tr>
          {displayColumns.map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.year}>
            {displayColumns.map(col => (
              <td key={col}>
                {row[col] !== undefined && row[col] !== null ? row[col] : 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}