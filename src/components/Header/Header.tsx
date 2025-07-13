import { Component } from 'react';
import SearchBar from '../SearchBar';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

class Header extends Component<HeaderProps> {
  render() {
    return (
      <header>
        <h1>Harry Potter all spells</h1>
        <div className="search-bar">
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </header>
    );
  }
}

export default Header;
