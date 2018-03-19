// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import { routerMiddleware } from 'react-router-redux';
import getRootReducer from '../reducers';
import type { vocabStateType } from '../reducers/vocab';

function configureStore(initialState?: { vocabApp: vocabStateType }, scope: string = 'main') {
  // Redux Configuration
  let middleware = [];

  // Thunk Middleware
  middleware.push(thunk);

  let history;

  if (scope === 'renderer') {
    history = createBrowserHistory();
    middleware = [
      forwardToMain, // electron-redux
      routerMiddleware(history), // router
      ...middleware
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias, // electron-redux
      ...middleware,
      forwardToRenderer // electron-redux
    ];
  }

  const rootReducer = getRootReducer(scope);
  const enhancer = applyMiddleware(...middleware);
  const store = createStore(rootReducer, initialState, enhancer);

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return { store, history };
}

export default configureStore;
