import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

/**
 * ACTION CREATORS
 */
const setCartItems = (items) => ({
  type: SET_CART_ITEMS,
  items,
});
const addItem = (item) => ({
  type: ADD_ITEM_TO_CART,
  item,
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

export const addItemToCart = (userId, productId) => {
  return async (dispatch) => {
    const { data } = await axios.post(
      `/api/line-items/user/${userId}/product/${productId}`
    );
    dispatch(addItem(data));
  };
};

export default function cartItems(state = [], action) {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items;
    case ADD_ITEM_TO_CART:
      return [...state, action.item];
    default:
      return state;
  }
}
