import SearchResults from '../SearchResults/SearchResults';
import Spinner from '../Spinner/Spinner';
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
}) => (
  <main>
    {loading ? (
      <Spinner />
    ) : (
      <SearchResults
        results={results}
        error={error}
        onCardClick={onCardClick}
      />
    )}
  </main>
);

export default Results;
