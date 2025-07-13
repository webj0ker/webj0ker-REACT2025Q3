import { Component } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

class SearchBar extends Component<SearchBarProps> {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm.trim());
    this.props.onSearch(searchTerm.trim());
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
