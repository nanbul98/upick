import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import {compose} from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

const SignInPage = () => (
  <div class="App-home">
    <h1>Sign In </h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase.doSignInWithEmailAndPassword(email, password).then(() => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
      <form onSubmit={this.onSubmit}>

      <div>
      <input
      name="email"
      value={email}
      onChange={this.onChange}
      type="text"
      placeholder="Email Address"
      />
      </div>
      <div>
      <input
      name="password"
      value={password}
      onChange={this.onChange}
      type="password"
      placeholder="Password"
      />
      </div>
      <div>
      <button disabled={isInvalid} type="submit">
      Sign In
      </button>
      </div>
      {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
