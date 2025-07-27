import React from 'react';

interface CardProps {
  name: string;
  description?: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => (
  <div className="card">
    <h3>{name}</h3>
    {description && <p>{description}</p>}
  </div>
);

export default Card;
