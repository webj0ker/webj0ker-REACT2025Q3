import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from '../pages/About/About';

describe('About', () => {
  it('renders author and RS School link', () => {
    render(<About />);
    expect(screen.getByText(/About This App/i)).toBeInTheDocument();
    expect(screen.getByText(/Author:/i)).toBeInTheDocument();
    expect(screen.getByText(/RS School React Course/i)).toBeInTheDocument();
  });
});
