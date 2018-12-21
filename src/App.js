import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import { publicRoutes as publicRoutesConfig } from './routes';

const history = createBrowserHistory();

const publicRoutes = () =>
  publicRoutesConfig.map((route, i) => (
    <Route key={i} path={route.path} exact={route.exact} component={route.page} />
  ));

const App = () => (
  <div>
    <Router history={history}>
      <Switch>{publicRoutes()}</Switch>
    </Router>
  </div>
);

export default App;
