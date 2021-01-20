import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AuthProvider from './context/AuthContext';
import PresentationCard from './views/PresentationCard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/empresa/tarjeta/:id" component={PresentationCard}/>
          <Route exact path="/empresa/sign-in" component={Login} />
          <PrivateRoute path="/empresa" component={Dashboard} />
        </Switch>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;