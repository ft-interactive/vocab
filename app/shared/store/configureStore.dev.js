import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer
} from 'electron-redux';
import getRootReducer from '../reducers';
import * as vocabActions from '../actions/vocab';
import type { vocabStateType } from '../reducers/vocab';

/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */
const configureStore = (initialState?: { vocabApp: vocabStateType }, scope = 'main') => {
  let history;

  // Redux Configuration
  let middleware = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: scope === 'main' ? undefined : 'info',
    collapsed: true
  });
  middleware.push(logger);

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

  const enhanced = [applyMiddleware(...middleware)];

  let enhancer;

  if (/*! process.env.NODE_ENV && */ scope === 'renderer') {
    // Redux DevTools Configuration
    const actionCreators = {
      ...vocabActions,
      ...routerActions
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
      : compose;
    /* eslint-enable no-underscore-dangle */
    enhancer = composeEnhancers(...enhanced);
  } else {
    enhancer = compose(...enhanced);
  }

  const rootReducer = getRootReducer(scope);
  const store = createStore(rootReducer, initialState, enhancer);

  if (!process.env.NODE_ENV && module.hot) {
    module.hot.accept(
      '../reducers',
      () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return { store, history };
};

export default configureStore;
