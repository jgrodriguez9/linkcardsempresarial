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
          <Route exact path="/empresas/minerva/tarjeta/:id" component={PresentationCard}/>
          <Route exact path="/empresas/minerva/sign-in" component={Login} />
          <PrivateRoute path="/empresas/minerva" component={Dashboard} />
        </Switch>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;