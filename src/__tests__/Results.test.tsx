import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';

test('Shows loading indicator', () => {
  render(<Results results={[]} loading={true} error={undefined} />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('Shows error message', () => {
  render(<Results results={[]} loading={false} error="Error" />);
  expect(screen.getByText(/Error/i)).toBeInTheDocument();
});

test('Displays results when results is not empty', () => {
  render(
    <Results
      results={[{ name: 'Test Spell', description: 'Test Description' }]}
      loading={false}
      error={undefined}
    />
  );
  expect(screen.getByText('Test Spell')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});
