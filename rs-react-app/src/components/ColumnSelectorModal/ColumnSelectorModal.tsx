import { useState } from 'react';
import { ALL_COLUMNS, type ColumnKey } from '../Columns/Columns';

interface ColumnSelectorModalProps {
  selectedColumns: ColumnKey[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<ColumnKey[]>>;
  onClose: () => void;
}

export default function ColumnSelectorModal({
  selectedColumns,
  setSelectedColumns,
  onClose,
}: ColumnSelectorModalProps) {
  const [local, setLocal] = useState<ColumnKey[]>(selectedColumns);

  const handleToggle = (key: ColumnKey) => {
    setLocal(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    );
  };

  const handleSelect = () => {
    setSelectedColumns(local);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ minWidth: 400 }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div style={{ marginBottom: 24 }}>
          {ALL_COLUMNS.map(col => (
            <div key={col.key} style={{ marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={local.includes(col.key)}
                onChange={() => handleToggle(col.key)}
                id={col.key}
              />
              <label htmlFor={col.key} style={{ marginLeft: 8 }}>{col.label}</label>
            </div>
          ))}
        </div>
        <button
          style={{
            background: '#6ad1ff',
            color: '#fff',
            borderRadius: 22,
            padding: '10px 32px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            margin: '0 auto',
            display: 'block',
          }}
          onClick={handleSelect}
        >
          Select
        </button>
      </div>
    </div>
  );
}
