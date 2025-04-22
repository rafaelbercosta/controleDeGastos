import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Teste de login: ', () => {
  renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const btnEntrar = screen.getByText('Entrar');
  test('Atributos iniciais', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
  test('Envio', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByText('Entrar');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.type(password, 'testando');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
