import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

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

test('Делает начальный API-запрос при монтировании', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  await waitFor(() =>
    expect(
      screen.getByRole('heading', { name: /harry potter/i })
    ).toBeInTheDocument()
  );
});

test('Обрабатывает успешный ответ API', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument()
  );
});
