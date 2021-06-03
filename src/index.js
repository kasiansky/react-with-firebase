import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCtu3DU2OIBS2yp-_Y0iKflcKlS7N_-QIk',
  authDomain: 'todo-app-f86cf.firebaseapp.com',
  projectId: 'todo-app-f86cf',
  storageBucket: 'todo-app-f86cf.appspot.com',
  messagingSenderId: '264644876451',
  appId: '1:264644876451:web:f4052eb25b2deb96c30716',
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebase,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
    ,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
