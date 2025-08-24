import { render, screen } from '@testing-library/react';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all required fields', () => {
    render(<UncontrolledForm onSuccess={() => {}} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });
});
