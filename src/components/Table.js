import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changingExpenses } from '../redux/actions';

class Table extends Component {
  delete = ({ target }) => {
    const { expenses, newExpenses } = this.props;
    const getId = expenses.filter((e) => e.id !== +target.id);
    newExpenses(getId);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-wrapper">
        <table>

          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          <tbody>
            {
              expenses.map(({
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
                id,
              }) => (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>{ Number(value * exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>Real</td>
                  <td>

                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.delete }
                      id={ id }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  newExpenses: (state) => dispatch(changingExpenses(state)),
});
Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  newExpenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
