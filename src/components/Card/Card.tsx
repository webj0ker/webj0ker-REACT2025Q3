import React from 'react';

interface CardProps {
  name: string;
  description?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, onClick }) => (
  <div
    className="card"
    style={{ cursor: onClick ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    <h3>{name}</h3>
    {description && <p>{description}</p>}
  </div>
);

export default Card;
