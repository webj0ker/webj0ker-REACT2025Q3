import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList/CardList';
test('Рендерит не более 10 карточек', () => {
  const results = Array.from({ length: 12 }, (_, i) => ({
    name: `Item ${i + 1}`,
    description: `Desc ${i + 1}`,
  }));
  render(<CardList results={results} />);
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
});
test('Показывает сообщение "no results" при пустом массиве', () => {
  render(<CardList results={[]} />);
  expect(screen.getByText(/no results/i)).toBeInTheDocument();
});
test('Корректно отображает имя и описание', () => {
  const results = [{ name: 'Test', description: 'Desc' }];
  render(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});
test('Корректно обрабатывает отсутствие description', () => {
  const results = [{ name: 'Test' }];
  render(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
});
