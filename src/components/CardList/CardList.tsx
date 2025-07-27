import Card from '../Card/Card';

interface CardListProps {
  results: { name: string; description?: string }[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
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
          />
        ))
      )}
    </div>
  );
};

export default CardList;
