'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { RootState } from '../../store';
import { unselectAll } from '../../store/selectedSlice';

const SelectedFlyout = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected.items);
  const count = selected.length;

  if (count === 0) return null;

  const handleUnselectAll = () => dispatch(unselectAll());

  const handleDownload = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['name,description']
        .concat(
          selected.map((item) => `"${item.name}","${item.description ?? ''}"`)
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${count}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
