import { useContext } from 'react';
import { ThemeContext } from './ThemeContextContext';

export const useTheme = () => useContext(ThemeContext);
