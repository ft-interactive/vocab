import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import './index.css';
import rootReducer from './redux';
import { loadTemplateData } from './redux/actions';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Create the store
const store = createStore(combineReducers({
  vocabApp: rootReducer,
  router: routerReducer,
}), composeEnhancers(applyMiddleware(thunk, middleware)));

(async () => {
  await store.dispatch(loadTemplateData());
  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('root'));

  registerServiceWorker();
})();
