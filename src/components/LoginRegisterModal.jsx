import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastr";

import { connect } from 'react-redux'
import { login, register } from '../store/modules/auth'
import { bindActionCreators } from 'redux'

class LoginRegisterModal extends Component {

  state = {
      registering: false,
  }

  onLogin = () => {
    this.props.login(
      this.loginEmailField.value,
      this.loginPasswordField.value,
    ).then(() => { if (this.props.error === null) {this.props.onClose() }} );
  }

  onRegister = () => {
    this.props.register(
      this.firstNameField.value,
      this.lastNameField.value,
      this.emailField.value,
      this.passwordField.value,
    ).then(() => { if (this.props.error === null) {this.props.onClose() }} )
  }

  onCloseModal = () => {
    this.setState({
      registering: false,
    })
    this.props.onClose();
  }

  render() {
    const { registering } = this.state;
    const { isOpen, isLoggingIn, error } = this.props;
    return (<div>
        {isOpen && <div className="underlay" />}
        <ToastContainer
          ref={ref => this.toastr = ref}
          className="toast-top-right"
        />
        {isOpen && (<div>
          {registering ? <div className="login-modal">
            <div className="cross" onClick={this.onCloseModal} style={{ cursor: 'pointer' }}>x</div>
              <h2>Register</h2>
              <input type="text" placeholder="First name" ref={ref => this.firstNameField = ref} />
              <input type="text" placeholder="Last name" ref={ref => this.lastNameField = ref} />
              <input type="email" placeholder="Email" ref={ref => this.emailField = ref} />
              <input type="password" placeholder="Password" ref={ref => this.passwordField = ref} />
              <div className="form-footer">
                  <span onClick={() => { this.setState({ registering: false }) }}>or click here to login</span>
                  <button className="button" onClick={() => { this.onRegister() }}>Register</button>
              </div>
              {error && (
                <div className="error-box">{error}</div>
              )}
          </div> : 
          <div className="login-modal">
            <div className="cross" onClick={this.onCloseModal} style={{ cursor: 'pointer' }}>x</div>
              
              <h2>Login</h2>
              <input type="email" placeholder="Email" ref={ref => this.loginEmailField = ref} />
              <input type="password" placeholder="Password" ref={ref => this.loginPasswordField = ref} />
              <div className="form-footer">
                  <span onClick={() => { this.setState({ registering: true }) }}>or click here to register</span>
                  <button className="button" onClick={() => { this.onLogin() }} disabled={isLoggingIn}>{isLoggingIn ? 'Logging in...' : 'Login'}</button>
              </div>
              {error && (
                <div className="error-box">{error}</div>
              )}
          </div>}
        </div>)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  authorized: state.auth.authorized,
  user: state.auth.user,
  isLoggingIn: state.auth.isLoggingIn,
  isRegistering: state.auth.isRegistering,
  error: state.auth.error,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  register,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterModal);