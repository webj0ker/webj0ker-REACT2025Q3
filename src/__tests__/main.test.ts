test('main.tsx loads without errors', async () => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  await import('../main');
});
