import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
} from '../store/selectedSlice';

const item = { name: 'Test', description: 'Desc' };

test('selectItem добавляет элемент', () => {
  const state = reducer({ items: [] }, selectItem(item));
  expect(state.items).toContainEqual(item);
});

test('unselectItem удаляет элемент', () => {
  const state = reducer({ items: [item] }, unselectItem('Test'));
  expect(state.items).toHaveLength(0);
});

test('unselectAll очищает все', () => {
  const state = reducer({ items: [item] }, unselectAll());
  expect(state.items).toHaveLength(0);
});
