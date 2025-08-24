import { render, screen } from '@testing-library/react';
import CountryAutocomplete from '../components/CountryAutocomplete/CountryAutocomplete';

test('renders autocomplete input', () => {
  render(<CountryAutocomplete value="" onChange={() => {}} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
