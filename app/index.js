import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from '../components/App';
import MoviePage from '../components/MoviePage';
import store from './store';
import './index.css';
import { HashRouter, Route, Switch, BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/:moviePage' component={MoviePage} />
      </Switch>
    </HashRouter>
  </Provider>), document.getElementById('app'));
