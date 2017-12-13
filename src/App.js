// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import GetData from './routes/GetData';
import ConfigureData from './routes/ConfigureData';
import './App.css';

export default (props) => (
  <div className="app">
    <header className="app__header">
      <h1 className="app__title">
        <abbr title="Visual Vocabulary scaffolder">Vocab</abbr>
        &nbsp;<sub>v2</sub>
      </h1>
    </header>
    <Switch>
      <Route exact path="/get-data" component={GetData} />
      <Route exact path="/configure-data" component={ConfigureData}/>
      <Route exact path="/download" />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);
