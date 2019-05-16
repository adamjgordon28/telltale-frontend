import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from './reducers/usersReducer.js'

const store = createStore(usersReducer)


ReactDOM.render(
  <Provider store ={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
