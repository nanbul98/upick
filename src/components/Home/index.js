import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {SignUpLink} from '../SignUp';

export const title = "UPick";
const Home = () => (
  <div class="App-home">
    <h1 class="title">{title}</h1>
    <p> Welcome to UPick! </p>
    <SignUpLink/>
    <p> If you have an account, <Link to={ROUTES.SIGN_IN}> Sign In </Link> </p>
  </div>
);

export default Home;
