import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLoginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { dispatch, history } = this.props;

    const emailRequirements = /^[a-z0-9.]+@[a-z0-9]+\.(com)$/i;
    const isEmailValid = emailRequirements.test(email);
    const min = 6;
    const isPasswordValid = password.length >= min;

    if (!isEmailValid || !isPasswordValid) {
      this.setState({
        emailError: !isEmailValid,
        passwordError: !isPasswordValid,
      });
      return;
    }

    this.setState({ emailError: false, passwordError: false });
    dispatch(addLoginAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;

    const containerStyle = {
      maxWidth: '400px',
      margin: '80px auto',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    };

    const inputStyle = (hasError) => ({
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      borderRadius: '6px',
      border: hasError ? '2px solid #e74c3c' : '1px solid #ccc',
      fontSize: '16px',
      outlineColor: hasError ? '#e74c3c' : '#4CAF50',
    });

    const buttonStyle = {
      width: '100%',
      padding: '12px',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '10px',
    };

    return (
      <div style={ containerStyle }>
        <h1 style={ { textAlign: 'center', marginBottom: '20px' } }> Login</h1>
        <form htmlFor="Login" onSubmit={ this.handleSubmit }>
          <label htmlFor="email">Email:</label>
          <input
            data-testid="email-input"
            name="email"
            value={ email }
            type="email"
            placeholder={ emailError ? 'Insira um email válido' : 'Digite seu email' }
            onChange={ this.handleChange }
            style={ inputStyle(emailError) }
          />

          <label htmlFor="password">Senha:</label>
          <input
            data-testid="password-input"
            name="password"
            value={ password }
            type="password"
            placeholder={ passwordError ? 'Mínimo 6 caracteres' : 'Digite sua senha' }
            onChange={ this.handleChange }
            style={ inputStyle(passwordError) }
          />

          <button type="submit" style={ buttonStyle }>Entrar</button>
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
