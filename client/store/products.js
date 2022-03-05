import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const update = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/products');
    dispatch(setProducts(data));
  };
};

export const updateProduct = (productId, product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(`api/products/${productId}`, product, {
      headers: { authorization: token },
    });
    dispatch(update(data));
  };
};

export const purchaseProduct = (id, updates) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(
      `/api/products/purchase-item/${id}`,
      updates,
      {
        headers: { authorization: token },
      }
    );
    dispatch(update(data));
  };
};

export default function products(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT:
      return state.map((product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else {
          return product;
        }
      });
    default:
      return state;
  }
}
