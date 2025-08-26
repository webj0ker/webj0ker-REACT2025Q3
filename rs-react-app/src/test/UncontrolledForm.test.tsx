import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UncontrolledForm from '../components/UncontrolledForm/UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all required fields', () => {
    render(<UncontrolledForm onSuccess={jest.fn()} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
  });

  it('shows error messages for empty required fields', async () => {
    render(<UncontrolledForm onSuccess={jest.fn()} />);
    fireEvent.click(screen.getByText(/Submit/i));
    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  it('submits valid data', async () => {
    const onSuccess = jest.fn();
    render(<UncontrolledForm onSuccess={onSuccess} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Qwerty123!' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: 'Germany' } });
    fireEvent.click(screen.getByLabelText(/Accept Terms/i));
    fireEvent.click(screen.getByText(/Submit/i));
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
