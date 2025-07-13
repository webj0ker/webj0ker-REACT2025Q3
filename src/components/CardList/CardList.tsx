import { Component } from 'react';
import Card from '../Card/Card';

interface CardListProps {
  results: { name: string; description?: string }[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;
    const limitedResults = results.slice(0, 10); // Ограничиваем количество карточек до 10

    return (
      <div className="card-list">
        {limitedResults.map((result, index) => (
          <Card
            key={index}
            name={result.name}
            description={result.description}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
