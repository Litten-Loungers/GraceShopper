import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CART_ITEMS = 'SET_CART_ITEMS';

/**
 * ACTION CREATORS
 */
const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  items,
});

/**
 * THUNK CREATORS
 */
export const fetchCartItems = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/line-items/user/${id}/cart`);
    dispatch(setCartItems(data));
  };
};

export default function cartItems(state = [], action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items;
    default:
      return state;
  }
}
