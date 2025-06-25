import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const result = curr.exchangeRates[curr.currency].ask * curr.value;
      return acc + result;
    }, 0);
    return (
      <div>
        <h1 className="title">💸 Controle de Despesas</h1>
        <h4 data-testid="email-field">
          Usuário:
          { user.email}
        </h4>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
