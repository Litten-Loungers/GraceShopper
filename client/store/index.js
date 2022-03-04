import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import singleProduct from './singleProduct';
import cartItems from './cartItems';
import users from './users';

const reducer = combineReducers({
  auth,
  products,
  singleProduct,
  cartItems,
  users
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './products';
export * from './singleProduct';
export * from './cartItems';
