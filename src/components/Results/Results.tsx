import CardList from '../CardList/CardList';

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
  return <CardList results={results} onCardClick={onCardClick} />;
};

export default Results;
