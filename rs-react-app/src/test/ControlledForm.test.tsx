import { render, screen, fireEvent } from '@testing-library/react';
import ControlledForm from '../components/ControlledForm/ControlledForm';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('ControlledForm', () => {
  it('renders all required fields', () => {
    render(
      <Provider store={store}>
        <ControlledForm onSuccess={() => {}} />
      </Provider>
    );
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept T&C/i)).toBeInTheDocument();
  });

  it('shows error for invalid name', async () => {
    render(
      <Provider store={store}>
        <ControlledForm onSuccess={() => {}} />
      </Provider>
    );
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.input(nameInput, { target: { value: 'ivan' } });
    fireEvent.blur(nameInput);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/First letter must be uppercase/i)).toBeInTheDocument();
  });

  // Добавь аналогичные тесты для других полей, успешной отправки и очистки ошибок
});
