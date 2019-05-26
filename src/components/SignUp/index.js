import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { title } from '../Home';

const SignUpPage = () => (
  <header className="App-home">
    <h1 className="title">
      <strong>{title}</strong>
    </h1>
  <div class="App-home">
    <h1>Sign Up for UPick today </h1>
    <SignUpForm />
  </div>
  </header>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,

}

const SignUpLink = () => (
  <p>
  Do not have an account? <Link to={ROUTES.SIGN_UP}> Sign Up </Link>
  </p>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
    return (
      <div>
      <form onSubmit={this.onSubmit}>
      <div>
      <input
      name="username"
      value={username}
      onChange={this.onChange}
      type="text"
      placeholder="Full Name"
      />
      </div>
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
      name="passwordOne"
      value={passwordOne}
      onChange={this.onChange}
      type="password"
      placeholder="Password"
      />
      </div>
      <div>
      <input
      name="passwordTwo"
      value={passwordTwo}
      onChange={this.onChange}
      type="password"
      placeholder="Confirm Password"
      />
      </div>
      <div>
      <button disabled={isInvalid} type="submit"> Sign Up </button>
      </div>
      {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}



const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
