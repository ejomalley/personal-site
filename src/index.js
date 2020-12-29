import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import Home from './home';
import Wiki from './wiki'
import DrawPage from './drawingtool'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/wikigame' component={Wiki} />
        <Route exact path='/drawtool' component={DrawPage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
