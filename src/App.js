import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Todos from './components/Todos';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from './index';
import CircularProgress from '@material-ui/core/CircularProgress';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState('');
  const { auth } = useContext(Context);
  const [useer, loading] = useAuthState(auth);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, [user]);

  if (loading) {
    return (
      <CircularProgress
        style={{
          position: 'absolute',
          left: '50%',
          top: '20%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );
  }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className='App'>
          <NavBar user={user} firebase={firebase}>
            <Switch>
              <Route path='/todos' component={Todos} />
            </Switch>
          </NavBar>
          <Todos />
          {user ? (
            <Redirect to='/todos' />
          ) : (
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
