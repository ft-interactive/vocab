// @flow
/**
 * Home page informational page
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DimensionList from '../components/DimensionList';
import ChartList from '../components/ChartList';
import styles from './Home.css';

export default () => (
  <main className={styles.app__main}>
    <DimensionList className={styles.app__sidebar} />
    <section className={styles.app__content}>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <div>
              <h1>Welcome to Vocab</h1>
              <h2>Your shiny-happy Visual Vocabulary scaffolder!</h2>
              <p>
                Please select the dimensions of your data you wish to depict from the sidebar on the
                left.
              </p>
              <p>
                You&apos;ll then be given a few different chart types to compare and ultimately use
                to create your project.
              </p>
            </div>
          )}
        />
        <Route path={'/choose-your-chart/:dimension'} component={ChartList} />
      </Switch>
    </section>
  </main>
);
