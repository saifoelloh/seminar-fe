import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const { NODE_ENV } = process.env;

const composeEnhancers =
  (NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || // eslint-disable-line no-underscore-dangle
  compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
