import React, {PropTypes} from 'react';
import GoogleLogin from 'react-google-login';
import googleClientId from '../../settings'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {PulseLoader} from 'halogen';

// const styles = {
//   googleSigninDisabled: {
//     cursor: 'wait',
//   }
// }

export default class LoginForm extends React.Component {
  constructor () {
    super();
    this.state={
      email: '',
      password: ''
    };
  }

  handleLogin = () => {
    this.props.handleLogIn(this.state.email, this.state.password);
  }

  googleAuthSuccess = (response) => {
    let payLoad = {
      userInfo: response.profileObj,
      tokenId: response.tokenId
    };
    this.props.handleOAuthLogIn(true, payLoad);
  }

  googleAuthfailed = (response) => {
    this.props.handleOAuthLogIn(false, 'failed to login...');
  }

  render() {
    return (
      <div className='login-form'>
      <div><h3>Login or Signup</h3></div>
      <div><TextField floatingLabelText="email" onChange={(event, val)=>this.setState({email: val})}/></div>
      <div><TextField type='password' floatingLabelText="password" onChange={(event, val)=>this.setState({password: val})}/></div>
      <br/>
      <div>
        <FlatButton label="signup" onClick={this.props.handleSignUp}></FlatButton>
        <RaisedButton
          label={!this.props.aSyncCall && "login"}
          primary={true}
          onClick={() => this.props.handleLogIn(this.state.email, this.state.password)}>
            {this.props.aSyncCall && <PulseLoader color="#FFFFFF" size="6px"/> }
        </RaisedButton>
      </div>
      <div className="google-wrapper">
        <GoogleLogin
          clientId={googleClientId}
          buttonText={'google signin'}
          className='google-login-button'
          onSuccess={this.googleAuthSuccess}
          onFailure={this.googleAuthfailed}>
            {<div>
              <i className="fa fa-google-plus-official" aria-hidden="true"></i>
              <span className="google-text">google signin</span>
            </div> }
        </GoogleLogin>
      </div>
    </div>);
  }
}

LoginForm.propTypes = {
};
