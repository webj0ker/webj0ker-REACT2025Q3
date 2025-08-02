import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, unselectItem } from '../../store/selectedSlice';
import { RootState } from '../../store';

interface CardProps {
  name: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selected.items.some((item) => item.name === name)
  );

  const handleChange = () => {
    if (isSelected) {
      dispatch(unselectItem(name));
    } else {
      dispatch(selectItem({ name, description }));
    }
  };

  return (
    <div className="card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
        style={{ marginBottom: 8 }}
      />
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
