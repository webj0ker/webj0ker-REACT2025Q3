import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../components/Results/Results';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/selectedSlice';

const mockStore = configureStore({ reducer: { selected: selectedReducer } });

test('Shows error message', () => {
  render(
    <Provider store={mockStore}>
      <Results results={[]} loading={false} error="Error" />
    </Provider>
  );
  expect(screen.getByText(/Error/i)).toBeInTheDocument();
});

test('Displays results when results is not empty', () => {
  render(
    <Provider store={mockStore}>
      <Results
        results={[{ name: 'Test Spell', description: 'Test Description' }]}
        loading={false}
        error={undefined}
      />
    </Provider>
  );
  expect(screen.getByText('Test Spell')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});
