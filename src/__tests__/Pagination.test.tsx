import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

test('does not display on one page', () => {
  const { container } = render(
    <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
  );
  expect(container.querySelector('button')).toBeNull();
});

test('displays page buttons and responds to clicks', () => {
  const onPageChange = jest.fn();
  render(
    <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />
  );
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  fireEvent.click(screen.getByText('1'));
  expect(onPageChange).toHaveBeenCalledWith(1);
});
