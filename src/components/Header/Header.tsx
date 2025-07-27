import SearchBar from '../SearchBar/SearchBar';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => (
  <header>
    <h1>Harry Potter all spells</h1>
    <div className="search-bar">
      <SearchBar onSearch={onSearch} />
    </div>
  </header>
);

export default Header;
