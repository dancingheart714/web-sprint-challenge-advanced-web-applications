import React, { useState } from 'react';
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = (props) => {
  const initialLoginData = {
    username: '',
    password: '',
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialError = '';

  const [loginData, setLoginData] = useState(initialLoginData);
  const [loginError, setLoginError] = useState(initialError);

  const { push } = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosWithAuth()
      .post('http://localhost:5000/api/login', loginData)
      .then((res) => {
        console.log(res);
        const token = res.data.payload;
        localStorage.setItem('token', token);
        setLoginData(initialLoginData);
        props.setLoggedIn(true);
        push('/bubbles');
      })
      .catch((error) =>
        setLoginError('Please enter a valid username and password')
      );
  };

  const handleInput = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username
          <input
            type="text"
            name="username"
            data-testid="username"
            value={loginData.username}
            onChange={handleInput}
            placeholder="Username"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            data-testid="password"
            value={loginData.password}
            onChange={handleInput}
            placeholder="Password"
          />
        </label>
        <button>Log in</button>
      </form>
      <p data-testid="errorMessage" className="error">
        {loginError}
      </p>
    </>
  );
};
export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
