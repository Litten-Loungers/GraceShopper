import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_PRODUCT = 'SET_PRODUCT';

/**
 * ACTION CREATORS
 */
const setProduct = (product) => ({
  type: SET_PRODUCT,
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

export default function singleProduct(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
