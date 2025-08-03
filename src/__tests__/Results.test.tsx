import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/selectedSlice';

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  return render(<Provider store={store}>{ui}</Provider>);
}

test('Shows error when API error occurs', () => {
  renderWithStore(<Results results={[]} loading={false} error="Error" />);
  expect(screen.getByText(/Error/i)).toBeInTheDocument();
});

test('Shows error for different HTTP codes', () => {
  renderWithStore(
    <Results results={[]} loading={false} error="404 Not Found" />
  );
  expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();

  renderWithStore(
    <Results results={[]} loading={false} error="500 Internal Server Error" />
  );
  expect(screen.getByText(/500 Internal Server Error/i)).toBeInTheDocument();
});

test('Displays results when results is not empty', () => {
  renderWithStore(
    <Results
      results={[{ name: 'Test Spell', description: 'Test Description' }]}
      loading={false}
      error={undefined}
    />
  );
  expect(screen.getByText('Test Spell')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  // Should not show error
  expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
});
