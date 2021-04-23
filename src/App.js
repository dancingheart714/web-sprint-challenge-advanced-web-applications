import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import './styles.scss';

import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(Boolean(token));
  const logout = () => {
    localStorage.removeItem('token');
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/bubblepage" component={BubblePage} />
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>

        <h1>Color Picker Sprint Challenge</h1>
        <a onClick={logout} data-testid="logoutButton" href="#">
          logout
        </a>
        <PrivateRoute path="/bubbles" component={BubblePage} />
      </div>
    </Router>
  );
}
export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.
