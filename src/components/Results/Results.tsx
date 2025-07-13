import { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Spinner from '../Spinner/Spinner';
import './Results.css';

interface ResultsProps {
  results: { name: string; description?: string }[];
  error?: string;
  loading: boolean;
  throwError: () => void;
}

class Results extends Component<ResultsProps> {
  render() {
    const { results, error, loading, throwError } = this.props;

    return (
      <main>
        {loading ? (
          <Spinner />
        ) : (
          <SearchResults results={results} error={error} />
        )}
        <button className="throw-error-button" onClick={throwError}>
          Throw Error
        </button>
      </main>
    );
  }
}

export default Results;
