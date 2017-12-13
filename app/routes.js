/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
// import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';
import GetData from './containers/GetData';
import ConfigureData from './containers/ConfigureData';
import Home from './containers/Home';

export default () => (
  <App>
    <Switch>
      <Route exact path="/get-data" component={GetData} />
      <Route exact path="/configure-data" component={ConfigureData} />
      <Route exact path="/download" />
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
