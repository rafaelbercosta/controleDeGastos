import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLoginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    isButtonDisabled: true,
    email: '',
    password: '' };

  handleChange = ({ target: { type, value } }) => {
    this.setState({ [type]: value }, () => {
      const { email, password } = this.state;
      const emailRequirements = /^[a-z0-9.]+@[a-z0-9]+\.(com)$/i;
      const min = 6;
      const enableButton = emailRequirements.test(email) && password.length >= min;
      this.setState({ isButtonDisabled: !enableButton });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addLoginAction(email));
    history.push('/carteira');
  };

  render() {
    const { isButtonDisabled, email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form htmlFor="Login">
          <label htmlFor="email">
            Email:
            <input
              data-testid="email-input"
              name="email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              name="password"
              value={ password }
              type="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
