import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from'react-router-dom'
import './index.css';
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from './reducers/usersReducer.js'

const rootReducer = combineReducers({ usersReducer: usersReducer })
const store = createStore(rootReducer)

console.log('%c INITAL REDUX STORE', 'color: purple', store.getState())

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
