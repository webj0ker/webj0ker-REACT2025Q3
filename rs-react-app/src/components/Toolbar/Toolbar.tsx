const years = Array.from({ length: 20 }, (_, i) => 2023 - i);

export default function Toolbar({
  search,
  setSearch,
  year,
  setYear,
  sort,
  setSort,
}: {
  search: string;
  setSearch: (v: string) => void;
  year: number;
  setYear: (v: number) => void;
  sort: string;
  setSort: (v: string) => void;
}) {
  return (
    <div className="toolbar">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select value={year} onChange={e => setYear(Number(e.target.value))}>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Sort by</option>
        <option value="population">Population</option>
        <option value="country">Country</option>
      </select>
    </div>
  );
}