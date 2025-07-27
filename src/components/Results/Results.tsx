import SearchResults from '../SearchResults/SearchResults';
import Spinner from '../Spinner/Spinner';
import './Results.css';

interface ResultsProps {
  results: { name: string; description?: string }[];
  error?: string;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({ results, error, loading }) => (
  <main>
    {loading ? <Spinner /> : <SearchResults results={results} error={error} />}
  </main>
);

export default Results;
