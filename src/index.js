import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { configureStore } from '@reduxjs/toolkit';
import userActivityReducer from './features/userActivities';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import $ from 'jquery';
import Popper from 'popper.js';
 
// const store =configureStore({
//   reducer:{
//     userActivity:userActivityReducer,
     
//   }
// });

axios.defaults.baseURL='http://localhost:5000/';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
