// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import vocabApp from './vocab';

const rootReducer = combineReducers({
  vocabApp,
  router,
});

export default rootReducer;
