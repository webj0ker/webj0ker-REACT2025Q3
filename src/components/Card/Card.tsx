import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, unselectItem } from '../../store/selectedSlice';
import { RootState } from '../../store';

interface CardProps {
  name: string;
  description?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, onClick }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selected.items.some((item) => item.name === name)
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(unselectItem(name));
    } else {
      dispatch(selectItem({ name, description }));
    }
  };

  return (
    <div
      className="card"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        style={{ marginBottom: 8 }}
      />
      <h3>{name}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Card;
