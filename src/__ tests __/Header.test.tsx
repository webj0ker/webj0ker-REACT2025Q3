import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('renders title and search bar', () => {
    render(<Header onSearch={() => {}} />);
    expect(screen.getByText(/Harry Potter all spells/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
