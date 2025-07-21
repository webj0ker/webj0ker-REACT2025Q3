import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';

beforeEach(() => {
  localStorage.clear();
});

test('Рендерит поле поиска и кнопку', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Показывает сохранённый поисковый запрос из localStorage при монтировании', () => {
  localStorage.setItem('searchTerm', 'test');
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toHaveValue('test');
});

test('Показывает пустое поле, если сохранённого запроса нет', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('Обновляет значение поля при вводе пользователя', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(input).toHaveValue('hello');
});

test('Сохраняет поисковый запрос в localStorage при нажатии на кнопку', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'hello' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('hello');
});

test('Обрезает пробелы перед сохранением', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: '  hello  ' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('hello');
});

test('Вызывает onSearch с правильным параметром', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'query' } });
  fireEvent.click(screen.getByRole('button'));
  expect(onSearch).toHaveBeenCalledWith('query');
});

test('Перезаписывает значение в localStorage при новом поиске', () => {
  localStorage.setItem('searchTerm', 'old');
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'new' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('new');
});
