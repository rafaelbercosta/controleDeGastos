import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Teste de aributos do(a): ', () => {
  test('email', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
  });
  test('password', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
  });
  test('botão entrar', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const btnEntrar = screen.getByText('Entrar');
    expect(btnEntrar).toBeInTheDocument();
  });
});
