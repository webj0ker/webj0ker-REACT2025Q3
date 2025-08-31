export default function ColumnSelectorModal({ columns, selected, onChange, onClose }: {
  columns: string[];
  selected: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
}) {
  return (
    <div className="modal">
      <h3>Select columns</h3>
      {columns.map(col => (
        <label key={col}>
          <input
            type="checkbox"
            checked={selected.includes(col)}
            onChange={() => {
              onChange(
                selected.includes(col)
                  ? selected.filter(c => c !== col)
                  : [...selected, col]
              );
            }}
          />
          {col}
        </label>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
}