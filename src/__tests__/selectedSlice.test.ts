import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
} from '../store/selectedSlice';

const item = { name: 'Test', description: 'Desc' };

test('selectItem adds an element', () => {
  const state = reducer({ items: [] }, selectItem(item));
  expect(state.items).toContainEqual(item);
});

test('unselectItem removes an item', () => {
  const state = reducer({ items: [item] }, unselectItem('Test'));
  expect(state.items).toHaveLength(0);
});

test('unselectAll clears everything', () => {
  const state = reducer({ items: [item] }, unselectAll());
  expect(state.items).toHaveLength(0);
});
