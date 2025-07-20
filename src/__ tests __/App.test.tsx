import '@testing-library/jest-dom';
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
  render(<App />);
  await waitFor(() =>
    expect(
      screen.getByRole('heading', { name: /harry potter/i })
    ).toBeInTheDocument()
  );
});

test('Обрабатывает успешный ответ API', async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument()
  );
});
