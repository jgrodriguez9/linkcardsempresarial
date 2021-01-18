import React, { createContext, useState, useEffect } from 'react';
import app from "../firebaseConfig";

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ loading: true, data: null });
    const [usuario, setUsuario] = useState(null);
    const [showChild, setShowChild] = useState(false);
  // we will use loading later
  
  
    const setAuthData = (data) => {
      setAuth({data: data});
    };
    
    useEffect(() => {
      setAuth({ loading: false, data: JSON.parse(window.localStorage.getItem('authLinkCardsEmpresa'))});
    }, []);

    useEffect(() => {
        app.auth().onAuthStateChanged(function(user) {
            window.localStorage.setItem('authLinkCardsEmpresa', JSON.stringify(user));
        });      
    }, [auth.data]);
  
    return (
      <authContext.Provider value={{ auth, setAuthData }}>
        {children}
      </authContext.Provider>
    );
  };
  
  export default AuthProvider;