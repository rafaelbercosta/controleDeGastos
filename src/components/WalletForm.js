import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestFetch, updateExpenses } from '../redux/actions';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,

  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(requestFetch());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitHandleChange = async () => {
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    await dispatch(updateExpenses(this.state));

    this.setState(() => ({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,

    }));
  };

  render() {
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const category = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { value, description, currency, method, tag } = this.state;
    const { coins } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              id="value-input"
              name="value"
              type="number"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description-input"
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <select
            type="text"
            data-testid="method-input"
            id="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {payment.map((type, index) => (
              <option
                key={ index }
                value={ type }
              >
                {type}
              </option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            { category.map((type, i) => (
              <option
                key={ i }
                value={ type }
              >
                {type}
              </option>
            ))}

          </select>
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {coins.map((t, index) => (
              <option
                key={ index }
                value={ t }
              >
                {t}
              </option>))}
          </select>
        </form>
        <button
          type="button"
          onClick={ this.submitHandleChange }
          className="adicionar-despesa-btn"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});
WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  coins: propTypes.string.isRequired,
};
export default connect(mapStateToProps)(WalletForm);
