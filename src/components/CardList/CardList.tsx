import Card from '../Card/Card';

interface CardListProps {
  results: { name: string; description?: string }[];
  onCardClick?: (name: string) => void;
}

const CardList: React.FC<CardListProps> = ({ results, onCardClick }) => {
  const limitedResults = results.slice(0, 10); // Ограничиваем количество карточек до 10

  return (
    <div className="card-list">
      {limitedResults.length === 0 ? (
        <div>No results</div>
      ) : (
        limitedResults.map((result, index) => (
          <Card
            key={index}
            name={result.name}
            description={result.description}
            onClick={onCardClick ? () => onCardClick(result.name) : undefined}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
