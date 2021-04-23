import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialState = {
  username: '',
  password: '',
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        history.push('/bubblepage');
      })
      .catch((err) => {
        setError(`Error ${err.response.status}: ${err.response.data.error}`);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <button type="submit">Log in</button>
      </form>
      <p data-testid="errorMessage" className="error">
        {error}
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
