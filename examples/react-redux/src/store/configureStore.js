import { compose, createStore } from 'redux';
import rootReducers from './reducers';

const isDev = process.env.NODE_ENV !== 'production';

const reduxDevTools = () => {
  if (isDev && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      return window.__REDUX_DEVTOOLS_EXTENSION__();
    }
    return f => f;
  }
  return f => f;
};

const enhancers = [reduxDevTools()];

const configureStore = initialState => {
  return createStore(rootReducers, initialState, compose(...enhancers));
};

export default configureStore;
