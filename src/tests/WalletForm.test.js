import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import store from '../redux/store';

describe('Teste:', () => {
  test('Elementos da tabela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const firstItem = screen.getByRole('table', /Descrição/);
    expect(firstItem).toBeInTheDocument();
    const lastItem = screen.getByText('Editar/Excluir');
    expect(lastItem).toBeInTheDocument();
  });
  test('Enviar/deletar despesa', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId('value-input');
    userEvent.type(value, '10');
    expect(value).toHaveValue(10);
    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'mercado');
    expect(description).toHaveValue('mercado');
    const addButton = screen.getByRole('button', /Adicionar despesa/);
    userEvent.click(addButton);
    await screen.findByText('Dólar Americano/Real Brasileiro');
    const deleteBtn = screen.getByTestId('delete-btn');
    userEvent.click(deleteBtn);
    const checkStore = store.getState();
    expect(checkStore.wallet.expenses.length).toBe(0);
  });
});
