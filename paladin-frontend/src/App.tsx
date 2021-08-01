import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/loginPage';
import HomePage from './components/homePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={HomePage} exact/>
        <Route path='/login' component={LoginPage}/>
      </Switch>
    </div>
  );
}

export default App;
