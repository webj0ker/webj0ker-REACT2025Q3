'use client';
import SearchBar from '../SearchBar/SearchBar';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, initialSearchTerm }) => {
  const t = useTranslations();

  return (
    <header>
      <h1>{t('Title')}</h1>
      <div className="search-bar">
        <SearchBar onSearch={onSearch} initialValue={initialSearchTerm} />
      </div>
    </header>
  );
};

export default Header;