import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/useTheme';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');
  });

  it('sets default theme to light if nothing in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('restores theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  it('changes theme and saves to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByText('Dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');

    await userEvent.click(screen.getByText('Light'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });
});
