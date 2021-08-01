import React, {useState} from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './components/loginPage';
import HomePage from './components/homePage';

import { AppContext } from './context/appContext';

function App() {
  const [token, setToken] = useState('')
  return (
    <AppContext.Provider value={{token, setToken}}>
      <div className="App">
      <Switch>
        <Route path='/' component={HomePage} exact/>
        <Route path='/login' component={LoginPage}/>
      </Switch>
    </div>
    </AppContext.Provider>
  );
}

export default App;
