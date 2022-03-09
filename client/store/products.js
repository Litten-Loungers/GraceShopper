import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
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

export const updateProduct = (id, updates) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(`/api/products/${id}`, updates, {
      headers: { authorization: token },
    });
    dispatch(update(data));
  };
};

export const purchaseProduct = (id, updates) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `/api/products/purchase-item/${id}`,
      updates,
      {
        headers: { authorization: 'ITEM_PURCHASED' },
      }
    );
    dispatch(update(data));
  };
};

export const destroyProduct = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/products/${product.id}`, {
      headers: { authorization: token },
    });
    dispatch(deleteProduct(product));
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
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
