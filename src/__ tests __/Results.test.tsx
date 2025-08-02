import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';

test('Показывает ошибку при ошибке API', () => {
  render(<Results results={[]} loading={false} error="Ошибка" />);
  expect(screen.getByText(/Ошибка/i)).toBeInTheDocument();
});

test('Показывает ошибку для разных HTTP кодов', () => {
  render(<Results results={[]} loading={false} error="404 Not Found" />);
  expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();

  render(
    <Results results={[]} loading={false} error="500 Internal Server Error" />
  );
  expect(screen.getByText(/500 Internal Server Error/i)).toBeInTheDocument();
});
