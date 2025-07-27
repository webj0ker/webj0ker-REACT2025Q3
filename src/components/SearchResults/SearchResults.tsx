import CardList from '../CardList/CardList';

interface SearchResultsProps {
  results: { name: string; url?: string; description?: string }[];
  error?: string;
  onCardClick?: (name: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  error,
  onCardClick,
}) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <CardList results={results} onCardClick={onCardClick} />;
};

export default SearchResults;
