import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './components/About/About';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

//<React.StrictMode>

ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
  document.getElementById('root')
);