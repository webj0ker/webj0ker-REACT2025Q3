'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { RootState } from '../../store';
import { unselectAll } from '../../store/selectedSlice';
import { createCsvContent } from '../../actions/downloadCsv';

const SelectedFlyout = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected.items);
  const count = selected.length;

  if (count === 0) return null;

  const handleUnselectAll = () => dispatch(unselectAll());

  const handleDownload = async () => {
    // 1. Получаем CSV-строку с сервера
    const csvContent = await createCsvContent(selected);

    // 2. Создаем Blob и временный URL
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // 3. Создаем ссылку в памяти
    const link = document.createElement('a');
    link.href = url;
    link.download = `${count}_items.csv`;

    // 4. "Кликаем" по ней, чтобы начать скачивание
    link.click();

    // 5. Очищаем временный URL из памяти браузера
    URL.revokeObjectURL(url);
  };

  return (
    <div className="selected-flyout">
      <span>{t('selectedItems', { count })}</span>
      <button onClick={handleUnselectAll}>{t('UnselectAll')}</button>
      <button onClick={handleDownload}>{t('Download')}</button>
    </div>
  );
};

export default SelectedFlyout;
