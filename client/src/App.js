import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import firebase from 'firebase';

/* eslint react/no-direct-mutation-state: "off"*/

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyB7iDiFbm3BiDdWgz9ph8Ij7TdJlrFEj60',
  authDomain: 'trail-finder-wa.firebaseapp.com',
  databaseURL: 'https://trail-finder-wa.firebaseio.com',
  projectId: 'trail-finder-wa',
  storageBucket: 'trail-finder-wa.appspot.com',
  messagingSenderId: '1070625304980',
  appId: '1:1070625304980:web:672ae6e921347bb32c9f81',
};

firebase.initializeApp(config);

export default () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <HomePage />
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};
