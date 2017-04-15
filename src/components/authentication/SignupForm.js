import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import {validateEmail} from '../../helpers/validator'

export default class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  };

  handleFormFields = (event, value) => {
    const field = event.target.name;
    this.setState({[field]: value})
  };

  handleSignup = () => {
    let errors = {};
    (this.state.fullName.length < 4) && (errors.fullName = 'Name is too short, *Required');
    !(this.state.email.length > 0) && (errors.email = 'Email is too short, *Required');
    !(validateEmail(this.state.email)) && (errors.email = 'Email is not valid, *Required');
    (this.state.password.length < 8) && (errors.password = 'Password is too short');
    (this.state.password !== this.state.confirmPassword) && (errors.confirmPassword = "passwords don't match");
    if (Object.keys(errors).length > 0) {
      this.setState({errors});
    } else {
      const errors = this.state.errors;
      for (var field in errors) {
        if (errors.hasOwnProperty(field)) {
          errors[field] = '';
        }
      }
      this.setState({errors: {}})
      this.props.handleSignUp({
        full_name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirmPassword
      });
    }
  };

  render() {
    return (
      <div className='login-form'>
      <div><h3>Login or Signup</h3></div>
      <div><TextField errorText={this.state.errors.fullName} name='fullName' floatingLabelText="Full Name" onChange={this.handleFormFields}/></div>
      <div><TextField errorText={this.state.errors.email} name='email' floatingLabelText="Email" onChange={this.handleFormFields}/></div>
      <div><TextField type='password' errorText={this.state.errors.password} name='password' floatingLabelText="password" onChange={this.handleFormFields}/></div>
      <div><TextField type='password' errorText={this.state.errors.confirmPassword} name='confirmPassword' floatingLabelText="confirm password" onChange={this.handleFormFields}/></div>
      <br/>
      <div>
        <FlatButton
          label={!this.props.aSyncCall && "signup"}
          onClick={this.handleSignup}>
          {this.props.aSyncCall && <CircularProgress size={30}/>}
        </FlatButton>
      </div>
    </div>);
  }
}

SignupForm.propTypes = {
};
