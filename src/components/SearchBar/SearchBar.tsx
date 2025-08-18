'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Этот эффект синхронизирует инпут, если пользователь
  // меняет URL (например, кнопками "назад"/"вперед" в браузере)
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={t('Search') + '...'}
      />
      <button className="search-button" onClick={handleSearch}>
        {t('Search')}
      </button>
    </div>
  );
};

export default SearchBar;
