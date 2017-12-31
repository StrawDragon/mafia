import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducer/root';
import rootEpic from './epic/root';

export default createStore(
  rootReducer,
  applyMiddleware(createEpicMiddleware(rootEpic))
);
