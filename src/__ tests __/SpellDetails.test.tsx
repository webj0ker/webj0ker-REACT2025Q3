import { render, screen, fireEvent } from '@testing-library/react';
import SpellDetails from '../components/SpellDetails/SpellDetails';

test('показывает детали заклинания', () => {
  render(
    <SpellDetails
      spell={{ name: 'Test', description: 'Desc' }}
      onClose={() => {}}
    />
  );
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('показывает сообщение, если нет данных', () => {
  render(<SpellDetails onClose={() => {}} />);
  expect(screen.getByText(/No details found/i)).toBeInTheDocument();
});

test('кнопка Close работает', () => {
  const onClose = jest.fn();
  render(<SpellDetails spell={{ name: 'Test' }} onClose={onClose} />);
  fireEvent.click(screen.getByText(/Close/i));
  expect(onClose).toHaveBeenCalled();
});
