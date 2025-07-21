import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
function ProblemChild() {
  throw new Error('Test error');
  return null;
}
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
});
test('Перехватывает ошибку и показывает fallback UI', () => {
  render(
    <ErrorBoundary>
      {' '}
      <ProblemChild />{' '}
    </ErrorBoundary>
  );
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
test('Показывает кнопку Go Back и восстанавливает UI', () => {
  const { rerender } = render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
  fireEvent.click(screen.getByText(/go back/i));
  rerender(
    <ErrorBoundary key="recovered">
      <div>Recovered UI</div>
    </ErrorBoundary>
  );
  expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  expect(screen.getByText(/recovered ui/i)).toBeInTheDocument();
});
