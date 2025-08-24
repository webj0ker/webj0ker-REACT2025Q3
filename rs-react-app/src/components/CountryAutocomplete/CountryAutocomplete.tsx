import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function CountryAutocomplete({ value, onChange }: Props) {
  const countries = useSelector((state: RootState) => state.countries);

  return (
    <>
      <input
        list="countries"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="country"
        id="country"
      />
      <datalist id="countries">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
