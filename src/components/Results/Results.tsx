import './Results.css';

interface ResultsProps {
  results: { name: string; description?: string }[];
  error?: string;
  loading: boolean;
  onCardClick?: (name: string) => void;
}

const Results: React.FC<ResultsProps> = ({
  results,
  error,
  loading,
  onCardClick,
}) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!results || results.length === 0) return <div>No results</div>;
  return (
    <div>
      {results.map((result) => (
        <div key={result.name} onClick={() => onCardClick?.(result.name)}>
          <h3>{result.name}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
