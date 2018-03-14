/**
 * @file
 * React Router routes
 */

import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import GetData from './containers/GetData';
import Home from './containers/Home';

export default () => (
  <App>
    <Switch>
      <Route exact path="/get-data" component={GetData} />
      <Route default path="/" component={Home} />
    </Switch>
  </App>
);
