import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card/Card';

test('Отображает имя и описание', () => {
  render(<Card name="Test" description="Desc" />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('Корректно обрабатывает отсутствие description', () => {
  render(<Card name="Test" />);
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
});
