import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AuthProvider from './context/AuthContext';
import AndersonPage from './views/AndersonPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/anderson/tarjeta/:id" component={AndersonPage}/>
          <Route exact path="/anderson/sign-in" component={Login} />
          <PrivateRoute path="/anderson" component={Dashboard} />
        </Switch>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;