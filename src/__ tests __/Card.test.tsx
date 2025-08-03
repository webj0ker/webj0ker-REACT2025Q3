import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card/Card';
import selectedReducer from '../store/selectedSlice';

function renderWithStore(props = {}) {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  return render(
    <Provider store={store}>
      <Card name="Test" description="Desc" {...props} />
    </Provider>
  );
}

test('Отображает имя и описание', () => {
  renderWithStore();
  expect(screen.getByText('Test')).toBeInTheDocument();
  expect(screen.getByText('Desc')).toBeInTheDocument();
});

test('Чекбокс работает', () => {
  renderWithStore();
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('onClick вызывается при клике по карточке', () => {
  const onClick = jest.fn();
  renderWithStore({ onClick });
  fireEvent.click(screen.getByText('Test'));
  expect(onClick).toHaveBeenCalled();
});

test('Корректно обрабатывает отсутствие description', () => {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  render(
    <Provider store={store}>
      <Card name="Test" />
    </Provider>
  );
  expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument();
  expect(screen.queryByText(/undefined/)).not.toBeInTheDocument();
});
