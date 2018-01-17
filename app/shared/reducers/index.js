// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import vocabApp from './vocab';

export default function getRootReducer(scope: string = 'main') {
  let reducers = {
    vocabApp
  };

  if (scope === 'renderer') {
    reducers = {
      ...reducers,
      routing
    };
  }

  return combineReducers({ ...reducers });
}
