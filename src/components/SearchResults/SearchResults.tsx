import { Component } from 'react';
import CardList from '../CardList/CardList';

interface SearchResultsProps {
  results: { name: string; url?: string }[];
  error?: string;
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { results, error } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    }

    return <CardList results={results} />;
  }
}

export default SearchResults;
