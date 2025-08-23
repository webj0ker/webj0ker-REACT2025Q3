import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './Tiles.css';

export default function Tiles() {
  const uncontrolled = useSelector((state: RootState) => state.form.uncontrolled);
  const controlled = useSelector((state: RootState) => state.form.controlled);

  return (
    <div className="tiles">
      <h2>Uncontrolled Form Data</h2>
      {uncontrolled.map((item, idx) => (
        <div key={idx} className="tile">{JSON.stringify(item)}</div>
      ))}
      <h2>Controlled Form Data</h2>
      {controlled.map((item, idx) => (
        <div key={idx} className="tile">{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}