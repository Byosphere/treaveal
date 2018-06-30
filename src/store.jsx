import { createStore, compose } from 'redux'
import rootReducer from './reducers/index';
import persistState from 'redux-localstorage';

export default function configureStore(initialState) {

  const enhancer = compose(
    /* [middlewares] */
    persistState(undefined, {key: 'treavealstore'}),
  );

  return createStore(
      rootReducer,
      initialState,
      enhancer
  )
}