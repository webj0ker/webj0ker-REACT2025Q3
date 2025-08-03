import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList/CardList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/selectedSlice';

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

test('Рендерит не более 10 карточек', () => {
  const results = Array.from({ length: 12 }, (_, i) => ({
    name: `Item ${i + 1}`,
    description: `Desc ${i + 1}`,
  }));
  renderWithStore(<CardList results={results} />);
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
});

test('Показывает сообщение "no results" при пустом массиве', () => {
  renderWithStore(<CardList results={[]} />);
  expect(screen.getByText(/no results/i)).toBeInTheDocument();
});

test('Корректно отображает имя и описание', () => {
  const results = [{ name: 'Test', description: 'Desc' }];
  renderWithStore(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('Корректно обрабатывает отсутствие description', () => {
  const results = [{ name: 'Test' }];
  renderWithStore(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
});
