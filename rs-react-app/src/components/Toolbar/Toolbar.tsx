export default function Toolbar({ years, selectedYear, onYearChange, regions, selectedRegion, onRegionChange, search, onSearch, sort, onSort }: any) {
  return (
    <div className="toolbar">
      <select value={selectedYear} onChange={e => onYearChange(Number(e.target.value))}>
        {years.map((y: number) => <option key={y} value={y}>{y}</option>)}
      </select>
      <select value={selectedRegion} onChange={e => onRegionChange(e.target.value)}>
        <option value="">All regions</option>
        {regions.map((r: string) => <option key={r} value={r}>{r}</option>)}
      </select>
      <input value={search} onChange={e => onSearch(e.target.value)} placeholder="Search country..." />
      <select value={sort} onChange={e => onSort(e.target.value)}>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="pop-asc">Population ↑</option>
        <option value="pop-desc">Population ↓</option>
      </select>
    </div>
  );
}