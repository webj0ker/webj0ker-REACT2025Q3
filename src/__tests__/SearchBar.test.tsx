import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';

beforeEach(() => {
  localStorage.clear();
});

test('Renders search field and button', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Shows saved search query from localStorage when mounted', () => {
  localStorage.setItem('searchTerm', 'test');
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toHaveValue('test');
});

test('Shows an empty field if there is no saved query.', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('Updates the field value as the user types.', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'hello' } });
  expect(input).toHaveValue('hello');
});

test('Saves the search query to localStorage when the button is clicked', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'hello' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('hello');
});

test('Trims spaces before saving', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: '  hello  ' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('hello');
});

test('Calls onSearch with the correct parameter', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'query' } });
  fireEvent.click(screen.getByRole('button'));
  expect(onSearch).toHaveBeenCalledWith('query');
});

test('Overwrites the value in localStorage on new search', () => {
  localStorage.setItem('searchTerm', 'old');
  render(<SearchBar onSearch={jest.fn()} />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'new' } });
  fireEvent.click(screen.getByRole('button'));
  expect(localStorage.getItem('searchTerm')).toBe('new');
});
