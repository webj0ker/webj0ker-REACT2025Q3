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

test('Renders no more than 10 cards', () => {
  const results = Array.from({ length: 12 }, (_, i) => ({
    name: `Item ${i + 1}`,
    description: `Desc ${i + 1}`,
  }));
  renderWithStore(<CardList results={results} />);
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
});

test('Shows "no results" message when array is empty', () => {
  renderWithStore(<CardList results={[]} />);
  expect(screen.getByText(/no results/i)).toBeInTheDocument();
});

test('Displays name and description correctly', () => {
  const results = [{ name: 'Test', description: 'Desc' }];
  renderWithStore(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('Correctly handles the absence of description', () => {
  const results = [{ name: 'Test' }];
  renderWithStore(<CardList results={results} />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
});
