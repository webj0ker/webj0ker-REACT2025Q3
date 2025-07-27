import CardList from '../CardList/CardList';

interface SearchResultsProps {
  results: { name: string; url?: string }[];
  error?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <CardList results={results} />;
};

export default SearchResults;
