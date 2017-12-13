// @flow
/**
 * Home page informational page
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DimensionList from '../../components/DimensionList';
import ChartList from '../ChartList';
import './index.css';

export default ({ match }) => (
  <main className="app__main">
    <DimensionList match={match} className="app__sidebar" />
    <section className="app__content">
      <Switch>
        <Route exact path="/" component={() => (
          <div>
            <h1>Welcome to Vocab</h1>
            <h2>Your shiny-happy Visual Vocabulary scaffolder!</h2>
            <p>Please select the dimensions of your data you wish to depict from the sidebar on the left.</p>
            <p>You'll then be given a few different chart types to compare and ultimately use to create your project.</p>
          </div>
        )}/>
        <Route path={`/choose-your-chart/:dimension`} component={ChartList} />
      </Switch>
    </section>
  </main>
);
