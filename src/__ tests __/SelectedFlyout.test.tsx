import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/selectedSlice';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedFlyout from '../components/SelectedFlyout/SelectedFlyout';

type Item = { name: string; description?: string };

function renderWithStore(items: Item[] = []) {
  const store = configureStore({
    reducer: { selected: selectedReducer },
    preloadedState: { selected: { items } },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <SelectedFlyout />
      </Provider>
    ),
  };
}

test('не отображается, если ничего не выбрано', () => {
  renderWithStore();
  expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
});

test('отображает количество выбранных и кнопки', () => {
  renderWithStore([{ name: 'Test', description: 'Desc' }]);
  expect(screen.getByText(/1 item selected/i)).toBeInTheDocument();
  expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
  expect(screen.getByText(/Download/i)).toBeInTheDocument();
});

test('Unselect all очищает выбранные', () => {
  const { store } = renderWithStore([{ name: 'Test' }]);
  fireEvent.click(screen.getByText(/Unselect all/i));
  expect(store.getState().selected.items).toHaveLength(0);
});

test('Download создает ссылку для скачивания', () => {
  renderWithStore([{ name: 'Test', description: 'Desc' }]);
  const createElementSpy = jest.spyOn(document, 'createElement');
  fireEvent.click(screen.getByText(/Download/i));
  expect(createElementSpy).toHaveBeenCalledWith('a');
  createElementSpy.mockRestore();
});
