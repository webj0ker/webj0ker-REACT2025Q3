import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';

beforeEach(() => {
  const mockResponse = {
    ok: true,
    json: () => Promise.resolve([{ name: 'Test', description: 'Desc' }]),
  };
  jest
    .spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve(mockResponse as Response));
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Renders the application title', async () => {
  render(
    <ThemeProvider>
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    </ThemeProvider>
  );
  await waitFor(() =>
    expect(
      screen.getByRole('heading', { name: /harry potter/i })
    ).toBeInTheDocument()
  );
});

test('Handles a successful API response', async () => {
  render(
    <ThemeProvider>
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    </ThemeProvider>
  );

  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument()
  );
});
