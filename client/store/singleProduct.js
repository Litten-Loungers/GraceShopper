import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProduct = (product) => ({
  type: SET_PRODUCT,
  product,
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

/**
 * THUNK CREATORS
 */
export const fetchProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  };
};

export const destroyProduct = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/products/${id}`, {
      headers: { authorization: token },
    });
    dispatch(deleteProduct(id));
  };
};

export default function singleProduct(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case DELETE_PRODUCT:
      return action.product;

    default:
      return state;
  }
}
