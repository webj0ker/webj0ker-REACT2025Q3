import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { unselectAll } from '../../store/selectedSlice';

const SelectedFlyout = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected.items);

  if (selected.length === 0) return null;

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
    link.setAttribute('download', `${selected.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="selected-flyout">
      <span>
        {selected.length} item{selected.length > 1 ? 's' : ''} selected
      </span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default SelectedFlyout;
